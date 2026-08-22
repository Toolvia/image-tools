import React, { useState } from 'react';
import { ProcessedImage, ToolType } from '../types';
import { AD_CONFIG } from '../config';
import { formatBytes } from '../utils/imageProcessor';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { BannerAd } from './BannerAd';
import {
  Download,
  Trash2,
  Crop,
  Sliders,
  CheckCircle2,
  RefreshCw,
  FolderArchive,
} from 'lucide-react';

interface BatchProcessingListProps {
  images: ProcessedImage[];
  activeTool: ToolType;
  quality: number;
  targetFormat: string;
  onQualityChange: (q: number) => void;
  onTargetFormatChange: (fmt: string) => void;
  onProcessAll: () => void;
  onRemoveImage: (id: string) => void;
  onClearAll: () => void;
  onOpenCropModal: (img: ProcessedImage) => void;
  onDownloadSingle: (img: ProcessedImage) => void;
  onDownloadBatchZip: () => void;
  isProcessing: boolean;
}

export const BatchProcessingList: React.FC<BatchProcessingListProps> = ({
  images,
  activeTool,
  quality,
  targetFormat,
  onQualityChange,
  onTargetFormatChange,
  onProcessAll,
  onRemoveImage,
  onClearAll,
  onOpenCropModal,
  onDownloadSingle,
  onDownloadBatchZip,
  isProcessing,
}) => {
  const [selectedPreviewImageId, setSelectedPreviewImageId] = useState<string | null>(
    images[0]?.id || null
  );

  const activePreviewImage = images.find((i) => i.id === selectedPreviewImageId) || images[0];

  const totalOriginalBytes = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalProcessedBytes = images.reduce((sum, img) => sum + (img.processedSize || 0), 0);
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalProcessedBytes);
  const totalSavedPct =
    totalOriginalBytes > 0 ? Math.round((totalSavedBytes / totalOriginalBytes) * 100) : 0;

  return (
    <div className="w-full space-y-6">
      {/* Control Panel: Global Quality & Target Format */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="h-5 w-5 text-indigo-600" />
              Processing Controls ({images.length} {images.length === 1 ? 'file' : 'files'})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust compression quality and target output format for all images
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear All
            </button>

            <button
              onClick={onProcessAll}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isProcessing ? 'animate-spin' : ''}`} />
              {isProcessing ? 'Processing...' : 'Process All Images'}
            </button>
          </div>
        </div>

        {/* Quality & Format Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Quality Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Quality Rating: <span className="text-indigo-600 font-mono">{Math.round(quality * 100)}%</span>
              </label>
              <span className="text-[10px] text-slate-400">
                {quality >= 0.8 ? 'High Quality' : quality >= 0.5 ? 'Balanced' : 'Max Compression'}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={quality}
              onChange={(e) => onQualityChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Light (10%)</span>
              <span>Balanced (60%)</span>
              <span>Sharp (100%)</span>
            </div>
          </div>

          {/* Target Format Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Output Format:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {[
                { id: 'jpg', label: 'JPG' },
                { id: 'png', label: 'PNG' },
                { id: 'webp', label: 'WEBP' },
                { id: 'bmp', label: 'BMP' },
                { id: 'ico', label: 'ICO' },
                { id: 'pdf', label: 'PDF' },
                { id: 'svg', label: 'SVG' },
                { id: 'base64', label: 'Base64' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => onTargetFormatChange(fmt.id)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                    targetFormat.toLowerCase() === fmt.id.toLowerCase()
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Before / After Interactive Split Preview for Selected Image */}
      {activePreviewImage && activePreviewImage.processedUrl && (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Live Quality Preview
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-md">
                {activePreviewImage.name}
              </h4>
            </div>

            {totalProcessedBytes > 0 && (
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 text-xs font-bold border border-emerald-300/40">
                🎉 Total Saved: {totalSavedPct}% ({formatBytes(totalSavedBytes)})
              </span>
            )}
          </div>

          <BeforeAfterSlider
            originalUrl={activePreviewImage.originalUrl}
            processedUrl={activePreviewImage.processedUrl}
            originalLabel={`Original (${formatBytes(activePreviewImage.originalSize)})`}
            processedLabel={`New (${formatBytes(activePreviewImage.processedSize || 0)})`}
          />
        </div>
      )}

      {/* Inline Ad Placement */}
      <BannerAd
        type="inline"
        settings={AD_CONFIG}
      />

      {/* File List Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Image Queue ({images.length})
          </h4>
          {images.some((i) => i.status === 'done') && (
            <button
              onClick={onDownloadBatchZip}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <FolderArchive className="h-3.5 w-3.5" />
              Download All (.ZIP)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {images.map((img) => {
            const isSelected = activePreviewImage?.id === img.id;
            const savings =
              img.processedSize && img.originalSize > 0
                ? Math.round(((img.originalSize - img.processedSize) / img.originalSize) * 100)
                : 0;

            return (
              <div
                key={img.id}
                onClick={() => setSelectedPreviewImageId(img.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* File Thumbnail & Name */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    src={img.processedUrl || img.originalUrl}
                    alt={img.name}
                    className="h-14 w-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                      {img.name}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{img.originalWidth}×{img.originalHeight}px</span>
                      <span>•</span>
                      <span className="font-mono">{formatBytes(img.originalSize)}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Savings Badge */}
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                  {img.status === 'processing' && (
                    <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Processing...
                    </span>
                  )}

                  {img.status === 'done' && (
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {formatBytes(img.processedSize || 0)}
                        {savings > 0 && <span className="text-[10px] text-emerald-500">(-{savings}%)</span>}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {img.processedWidth}×{img.processedHeight}px • {targetFormat.toUpperCase()}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons for this Image */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCropModal(img);
                      }}
                      title="Crop Image"
                      className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Crop className="h-4 w-4" />
                    </button>

                    {img.status === 'done' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDownloadSingle(img);
                        }}
                        title="Download Image"
                        className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveImage(img.id);
                      }}
                      title="Remove File"
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

