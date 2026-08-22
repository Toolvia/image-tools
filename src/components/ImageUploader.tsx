import React, { useRef, useState, useEffect } from 'react';
import { Upload, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  acceptFormats?: string;
  multiple?: boolean;
  compact?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFilesSelected,
  acceptFormats = 'image/jpeg,image/png,image/webp,image/bmp,image/gif',
  multiple = true,
  compact = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clipboard paste handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) files.push(file);
        }
      }

      if (files.length > 0) {
        onFilesSelected(files);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilesSelected]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = Array.from(e.dataTransfer.files).filter((file: File) =>
        file.type.startsWith('image/')
      );
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  if (compact) {
    return (
      <div className="w-full">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center group ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept={acceptFormats}
            multiple={multiple}
            className="hidden"
          />
          <div className="mb-2 h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow group-hover:scale-105 transition-transform">
            <Upload className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Upload More Images
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            Click or drag & drop files
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center group ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 shadow-sm'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept={acceptFormats}
          multiple={multiple}
          className="hidden"
        />

        <div className="mb-4 h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
          <Upload className="h-8 w-8" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Drag & Drop Images Here or <span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-400/40">Browse Files</span>
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
          Supports all major formats: <strong>JPG, PNG, WEBP, BMP, ICO, GIF</strong>. You can also paste directly (<kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-[10px]">Ctrl+V</kbd>).
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="h-3.5 w-3.5" />
            100% Private - In-Browser Processing
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/60 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Batch Processing Supported
          </span>
        </div>
      </div>
    </div>
  );
};

