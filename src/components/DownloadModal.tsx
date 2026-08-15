import React from 'react';
import { ProcessedImage } from '../types';
import { AD_CONFIG } from '../config';
import { formatBytes } from '../utils/imageProcessor';
import { BannerAd } from './BannerAd';
import { Download, CheckCircle2, X, Sparkles, FolderArchive, ArrowDown } from 'lucide-react';

interface DownloadModalProps {
  image?: ProcessedImage;
  batchImages?: ProcessedImage[];
  zipBlob?: Blob;
  onClose: () => void;
  onDownloadSingle?: (img: ProcessedImage) => void;
  onDownloadBatchZip?: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  image,
  batchImages = [],
  zipBlob,
  onClose,
  onDownloadSingle,
  onDownloadBatchZip,
}) => {
  const isBatch = batchImages.length > 0;

  // Calculate totals
  const totalOriginalSize = isBatch
    ? batchImages.reduce((acc, img) => acc + img.originalSize, 0)
    : image?.originalSize || 0;

  const totalProcessedSize = isBatch
    ? batchImages.reduce((acc, img) => acc + (img.processedSize || 0), 0)
    : image?.processedSize || 0;

  const sizeDiff = totalOriginalSize - totalProcessedSize;
  const savingsPct =
    totalOriginalSize > 0 ? Math.max(0, Math.round((sizeDiff / totalOriginalSize) * 100)) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Processing Successful!
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {isBatch
              ? `Compressed & optimized ${batchImages.length} files ready for download`
              : `File ${image?.name || 'image'} is ready`}
          </p>
        </div>

        {/* Savings Stats Banner */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 text-center">
          <div className="flex items-center justify-around gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Original Size</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 line-through">
                {formatBytes(totalOriginalSize)}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-xs font-black shadow-sm flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Saved {savingsPct}%
              </span>
              <ArrowDown className="h-4 w-4 text-emerald-500 my-0.5" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">New Size</span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatBytes(totalProcessedSize)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Download Buttons */}
        <div className="space-y-3">
          {isBatch && onDownloadBatchZip && (
            <button
              onClick={onDownloadBatchZip}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.01]"
            >
              <FolderArchive className="h-5 w-5" />
              Download All Files (.ZIP)
            </button>
          )}

          {!isBatch && image && onDownloadSingle && (
            <button
              onClick={() => onDownloadSingle(image)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.01]"
            >
              <Download className="h-5 w-5" />
              Download Image Now ({formatBytes(image.processedSize || 0)})
            </button>
          )}
        </div>

        {/* Optimized Ad Placement in Download Modal */}
        <BannerAd
          type="download"
          settings={AD_CONFIG}
          className="mt-4"
        />

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
          >
            Process More Images
          </button>
        </div>
      </div>
    </div>
  );
};

