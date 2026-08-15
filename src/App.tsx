import React, { useState, useEffect } from 'react';
import {
  ProcessedImage,
  ToolType,
  PresetTool,
  CropRect,
} from './types';
import { TOOL_PRESETS } from './data/presets';
import { AD_CONFIG, ANALYTICS_CONFIG } from './config';
import { processImage, createBatchZip, downloadFile, getImageDimensions } from './utils/imageProcessor';
import { initGA, trackEvent } from './utils/analytics';

// Components
import { Header } from './components/Header';
import { ToolNavigation } from './components/ToolNavigation';
import { ImageUploader } from './components/ImageUploader';
import { BatchProcessingList } from './components/BatchProcessingList';
import { CropCanvas } from './components/CropCanvas';
import { ResizeOptions } from './components/ResizeOptions';
import { BannerAd } from './components/BannerAd';
import { DownloadModal } from './components/DownloadModal';

import {
  Zap,
  ShieldCheck,
  Smartphone,
  Minimize2,
  Crop as CropIcon,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  // Application State
  const [activeTool, setActiveTool] = useState<ToolType>('compress');
  const [selectedPreset, setSelectedPreset] = useState<PresetTool>(TOOL_PRESETS[0]);
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [quality, setQuality] = useState<number>(0.8);
  const [targetFormat, setTargetFormat] = useState<string>('jpg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Resize Custom State
  const [customWidth, setCustomWidth] = useState<number | undefined>();
  const [customHeight, setCustomHeight] = useState<number | undefined>();

  // Modals
  const [cropModalImg, setCropModalImg] = useState<ProcessedImage | null>(null);
  const [downloadModalImg, setDownloadModalImg] = useState<ProcessedImage | null>(null);

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
    return false;
  });

  // Apply Theme Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Init GA4 from hardcoded config
  useEffect(() => {
    if (ANALYTICS_CONFIG.enabled && ANALYTICS_CONFIG.gaMeasurementId) {
      initGA(ANALYTICS_CONFIG.gaMeasurementId);
    }
  }, []);

  // Handle Preset Tool Pick
  const handleSelectPreset = (preset: PresetTool) => {
    setSelectedPreset(preset);
    setActiveTool(preset.tool);
    if (preset.toFormat) {
      setTargetFormat(preset.toFormat);
    }
    trackEvent('select_preset_tool', { preset_id: preset.id, tool: preset.tool });
  };

  // Process a single image
  const executeProcessSingle = async (
    item: ProcessedImage,
    overrideOptions: {
      quality?: number;
      targetFormat?: string;
      crop?: CropRect;
      rotate?: number;
      flipH?: boolean;
      flipV?: boolean;
      width?: number;
      height?: number;
    } = {}
  ): Promise<ProcessedImage> => {
    try {
      const q = overrideOptions.quality ?? quality;
      const fmt = overrideOptions.targetFormat ?? targetFormat;
      const w = overrideOptions.width ?? customWidth;
      const h = overrideOptions.height ?? customHeight;

      const result = await processImage({
        file: item.file,
        targetFormat: fmt,
        quality: q,
        width: w,
        height: h,
        crop: overrideOptions.crop,
        rotate: overrideOptions.rotate,
        flipH: overrideOptions.flipH,
        flipV: overrideOptions.flipV,
      });

      return {
        ...item,
        processedUrl: result.url,
        processedSize: result.blob.size,
        processedWidth: result.width,
        processedHeight: result.height,
        format: fmt,
        status: 'done',
      };
    } catch (err) {
      console.error('Error processing image:', err);
      return {
        ...item,
        status: 'error',
        errorMessage: err instanceof Error ? err.message : 'Processing error',
      };
    }
  };

  // Handle New Files Upload
  const handleFilesSelected = async (files: File[]) => {
    trackEvent('upload_files', { count: files.length });

    const newItems: ProcessedImage[] = [];

    for (const file of files) {
      try {
        const { width, height, url } = await getImageDimensions(file);
        const item: ProcessedImage = {
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          file,
          name: file.name,
          originalUrl: url,
          originalSize: file.size,
          originalWidth: width,
          originalHeight: height,
          format: targetFormat,
          status: 'idle',
        };
        newItems.push(item);
      } catch (e) {
        console.error('Failed to parse dimensions for file:', file.name);
      }
    }

    if (newItems.length === 0) return;

    setImages((prev) => [...prev, ...newItems]);

    // Automatically trigger initial batch processing
    setIsProcessing(true);
    const processedList: ProcessedImage[] = [];
    for (const item of newItems) {
      const doneItem = await executeProcessSingle(item);
      processedList.push(doneItem);
    }

    setImages((prev) =>
      prev.map((img) => processedList.find((p) => p.id === img.id) || img)
    );
    setIsProcessing(false);

    // Track analytics event
    trackEvent('images_processed', {
      count: newItems.length,
      tool: activeTool,
      format: targetFormat,
    });
  };

  // Process all current images with current controls
  const handleProcessAll = async () => {
    setIsProcessing(true);
    const updated: ProcessedImage[] = [];

    for (const img of images) {
      const processed = await executeProcessSingle(img);
      updated.push(processed);
    }

    setImages(updated);
    setIsProcessing(false);
    trackEvent('reprocess_all', { count: images.length, quality, targetFormat });
  };

  // Crop Action Apply
  const handleApplyCrop = async (
    crop: CropRect,
    rotate: number,
    flipH: boolean,
    flipV: boolean
  ) => {
    if (!cropModalImg) return;

    setIsProcessing(true);
    const updated = await executeProcessSingle(cropModalImg, { crop, rotate, flipH, flipV });

    setImages((prev) => prev.map((img) => (img.id === updated.id ? updated : img)));
    setCropModalImg(null);
    setIsProcessing(false);

    // Open Download Modal for this cropped image
    setDownloadModalImg(updated);
    trackEvent('crop_image_applied', { filename: updated.name });
  };

  // Single Download Action
  const handleDownloadSingle = (img: ProcessedImage) => {
    if (img.processedUrl) {
      const ext = img.format || 'jpg';
      const baseName = img.name.substring(0, img.name.lastIndexOf('.')) || img.name;
      downloadFile(img.processedUrl, `${baseName}_picswift.${ext}`);
      trackEvent('download_single_image', { filename: img.name, format: ext });
    }
  };

  // Batch Download as ZIP Action
  const handleDownloadBatchZip = async () => {
    const readyImages = images.filter((i) => i.status === 'done' && i.processedUrl);
    if (readyImages.length === 0) return;

    try {
      const zipItems: { filename: string; blob: Blob }[] = [];
      for (const img of readyImages) {
        const res = await fetch(img.processedUrl!);
        const blob = await res.blob();
        const ext = img.format || 'jpg';
        const baseName = img.name.substring(0, img.name.lastIndexOf('.')) || img.name;
        zipItems.push({
          filename: `${baseName}_picswift.${ext}`,
          blob,
        });
      }

      const zipBlob = await createBatchZip(zipItems);
      const url = URL.createObjectURL(zipBlob);
      downloadFile(url, 'PicSwift_Processed_Images.zip');
      URL.revokeObjectURL(url);

      trackEvent('download_batch_zip', { count: readyImages.length });
    } catch (e) {
      console.error('Error generating batch zip:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      {/* Header Bar */}
      <Header
        activeTool={activeTool}
        onSelectTool={(tool) => {
          setActiveTool(tool);
          const firstMatching = TOOL_PRESETS.find((p) => p.tool === tool);
          if (firstMatching) handleSelectPreset(firstMatching);
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Page Body with Left & Right Skyscraper Ads on Desktop */}
      <div className="flex-1 w-full max-w-[1680px] mx-auto px-2 sm:px-4 lg:px-6 flex justify-center items-start gap-4">
        {/* Left Sticky Skyscraper Ad */}
        <aside className="hidden xl:block w-[160px] sticky top-20 pt-6 shrink-0">
          <BannerAd type="skyscraper-left" settings={AD_CONFIG} />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full min-w-0 py-6 space-y-6">
          {/* Top Optimized Header Banner Ad */}
          <BannerAd
            type="header"
            settings={AD_CONFIG}
          />

          {/* Hero Introduction & Tool Title */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800 shadow-sm">
              <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              100% Client-Side - Zero Server File Upload
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 dark:from-white dark:via-indigo-200 dark:to-blue-200 bg-clip-text text-transparent">
              {selectedPreset?.label || 'Fast Online Image Compressor & Format Converter'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {selectedPreset?.description ||
                'Compress JPG, PNG, and WebP images, resize dimensions, crop frames, and convert formats with ultra-fast browser speed.'}
            </p>
          </div>

          {/* Quick Tool Selector Chips */}
          <ToolNavigation
            activeTool={activeTool}
            selectedPresetId={selectedPreset?.id}
            onSelectPreset={handleSelectPreset}
          />

          {/* Main Interface Layout: Uploader or Processing Workspace */}
          {images.length === 0 ? (
            <ImageUploader onFilesSelected={handleFilesSelected} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Left 3 Columns: Batch Processing & Controls */}
              <div className="lg:col-span-3 space-y-6">
                {/* Optional Custom Resize Sub-Panel */}
                {activeTool === 'resize' && images[0] && (
                  <ResizeOptions
                    originalWidth={images[0].originalWidth}
                    originalHeight={images[0].originalHeight}
                    onApplyResize={(w, h) => {
                      setCustomWidth(w);
                      setCustomHeight(h);
                    }}
                  />
                )}

                {/* Main Image Batch List & Quality Controls */}
                <BatchProcessingList
                  images={images}
                  activeTool={activeTool}
                  quality={quality}
                  targetFormat={targetFormat}
                  onQualityChange={(q) => setQuality(q)}
                  onTargetFormatChange={(fmt) => setTargetFormat(fmt)}
                  onProcessAll={handleProcessAll}
                  onRemoveImage={(id) => setImages((prev) => prev.filter((i) => i.id !== id))}
                  onClearAll={() => setImages([])}
                  onOpenCropModal={(img) => setCropModalImg(img)}
                  onDownloadSingle={(img) => setDownloadModalImg(img)}
                  onDownloadBatchZip={handleDownloadBatchZip}
                  isProcessing={isProcessing}
                />
              </div>

              {/* Right 1 Column: Sidebar Ads & Fast Actions */}
              <div className="lg:col-span-1 space-y-6">
                {/* Sidebar Ad Placement */}
                <BannerAd
                  type="sidebar"
                  settings={AD_CONFIG}
                />

                {/* Add More Images Box */}
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Add More Images
                  </h4>
                  <ImageUploader onFilesSelected={handleFilesSelected} multiple={true} />
                </div>

                {/* Feature Highlights Card */}
                <div className="p-4 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/60 text-xs space-y-2">
                  <span className="font-bold text-indigo-900 dark:text-indigo-300 block flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    100% Privacy Guaranteed
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your images are processed locally inside browser memory (HTML5 Canvas). Zero files are uploaded to external servers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Feature Grid SEO Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Minimize2 className="h-6 w-6 text-emerald-500 mb-2" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">WebP & JPG Compression</h4>
              <p className="text-xs text-slate-500 mt-1">
                Reduce file size up to 80-90% to boost Google PageSpeed & Core Web Vitals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <RefreshCw className="h-6 w-6 text-indigo-500 mb-2" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Format Converter</h4>
              <p className="text-xs text-slate-500 mt-1">
                Convert seamlessly between JPG, PNG, WEBP, BMP, and ICO formats without losing clarity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <CropIcon className="h-6 w-6 text-amber-500 mb-2" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Precision Crop & Rotate</h4>
              <p className="text-xs text-slate-500 mt-1">
                Crop with aspect ratios (1:1 Instagram, 16:9 YouTube, 9:16 TikTok) with instant rotation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Smartphone className="h-6 w-6 text-blue-500 mb-2" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Mobile Optimized</h4>
              <p className="text-xs text-slate-500 mt-1">
                Smooth touch gestures on iPhone, Android, and tablets across all device screen sizes.
              </p>
            </div>
          </div>
        </main>

        {/* Right Sticky Skyscraper Ad */}
        <aside className="hidden xl:block w-[160px] sticky top-20 pt-6 shrink-0">
          <BannerAd type="skyscraper-right" settings={AD_CONFIG} />
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">PicSwift Image Tools</span>
            <span>•</span>
            <span>100% In-Browser Privacy Focused</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Fast Client-Side Image Processor</span>
          </div>
        </div>
      </footer>

      {/* Crop Modal */}
      {cropModalImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">
              Crop & Rotate Image: {cropModalImg.name}
            </h3>
            <CropCanvas
              imageSrc={cropModalImg.originalUrl}
              originalWidth={cropModalImg.originalWidth}
              originalHeight={cropModalImg.originalHeight}
              initialAspectRatio={selectedPreset?.aspectRatio}
              onApplyCrop={handleApplyCrop}
              onCancel={() => setCropModalImg(null)}
            />
          </div>
        </div>
      )}

      {/* Download Single Modal */}
      {downloadModalImg && (
        <DownloadModal
          image={downloadModalImg}
          onClose={() => setDownloadModalImg(null)}
          onDownloadSingle={handleDownloadSingle}
        />
      )}
    </div>
  );
}
