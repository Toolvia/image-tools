import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CropRect } from '../types';
import {
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Check,
  RefreshCw,
} from 'lucide-react';

interface CropCanvasProps {
  imageSrc: string;
  originalWidth: number;
  originalHeight: number;
  initialAspectRatio?: number;
  onApplyCrop: (crop: CropRect, rotate: number, flipH: boolean, flipV: boolean) => void;
  onCancel?: () => void;
}

export const CropCanvas: React.FC<CropCanvasProps> = ({
  imageSrc,
  originalWidth,
  originalHeight,
  initialAspectRatio,
  onApplyCrop,
  onCancel,
}) => {
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(initialAspectRatio);
  const [rotate, setRotate] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);

  // Normalized Crop Box in pixels relative to originalWidth & originalHeight
  const [crop, setCrop] = useState<CropRect>({
    x: 0,
    y: 0,
    width: originalWidth,
    height: originalHeight,
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; crop: CropRect } | null>(null);

  // Set aspect ratio preset
  const handleSetAspect = (ratio?: number) => {
    setAspectRatio(ratio);
    if (!ratio) {
      setCrop({ x: 0, y: 0, width: originalWidth, height: originalHeight });
      return;
    }

    let w = originalWidth;
    let h = w / ratio;
    if (h > originalHeight) {
      h = originalHeight;
      w = h * ratio;
    }
    const x = Math.max(0, (originalWidth - w) / 2);
    const y = Math.max(0, (originalHeight - h) / 2);

    setCrop({
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(w),
      height: Math.round(h),
    });
  };

  useEffect(() => {
    if (initialAspectRatio) {
      handleSetAspect(initialAspectRatio);
    }
  }, [initialAspectRatio]);

  // Handle Drag / Resize calculation
  const handlePointerDown = (handle: string, e: React.PointerEvent) => {
    e.preventDefault();
    setActiveHandle(handle);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      crop: { ...crop },
    });
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!activeHandle || !dragStart || !imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const scaleX = originalWidth / rect.width;
      const scaleY = originalHeight / rect.height;

      const deltaX = (e.clientX - dragStart.x) * scaleX;
      const deltaY = (e.clientY - dragStart.y) * scaleY;

      let { x, y, width, height } = dragStart.crop;

      if (activeHandle === 'move') {
        x = Math.max(0, Math.min(originalWidth - width, dragStart.crop.x + deltaX));
        y = Math.max(0, Math.min(originalHeight - height, dragStart.crop.y + deltaY));
      } else {
        if (activeHandle.includes('e')) {
          width = Math.min(originalWidth - x, Math.max(50, dragStart.crop.width + deltaX));
        }
        if (activeHandle.includes('s')) {
          height = Math.min(originalHeight - y, Math.max(50, dragStart.crop.height + deltaY));
        }
        if (activeHandle.includes('w')) {
          const newW = Math.min(dragStart.crop.x + dragStart.crop.width - 50, dragStart.crop.width - deltaX);
          x = Math.max(0, dragStart.crop.x + (dragStart.crop.width - newW));
          width = newW;
        }
        if (activeHandle.includes('n')) {
          const newH = Math.min(dragStart.crop.y + dragStart.crop.height - 50, dragStart.crop.height - deltaY);
          y = Math.max(0, dragStart.crop.y + (dragStart.crop.height - newH));
          height = newH;
        }

        // Lock Aspect Ratio if set
        if (aspectRatio) {
          height = width / aspectRatio;
          if (y + height > originalHeight) {
            height = originalHeight - y;
            width = height * aspectRatio;
          }
        }
      }

      setCrop({
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height),
      });
    },
    [activeHandle, dragStart, originalWidth, originalHeight, aspectRatio]
  );

  const handlePointerUp = useCallback(() => {
    setActiveHandle(null);
    setDragStart(null);
  }, []);

  useEffect(() => {
    if (activeHandle) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [activeHandle, handlePointerMove, handlePointerUp]);

  // Convert pixel crop bounds to CSS percentage for box overlay display
  const cropLeftPct = (crop.x / originalWidth) * 100;
  const cropTopPct = (crop.y / originalHeight) * 100;
  const cropWidthPct = (crop.width / originalWidth) * 100;
  const cropHeightPct = (crop.height / originalHeight) * 100;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Control Bar: Aspect Ratios & Transform Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        {/* Aspect Ratio Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1">Aspect Ratio:</span>
          {[
            { label: 'Freeform', value: undefined },
            { label: '1:1 Square', value: 1 },
            { label: '16:9 Landscape', value: 16 / 9 },
            { label: '9:16 Portrait', value: 9 / 16 },
            { label: '4:3 Standard', value: 4 / 3 },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSetAspect(item.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                aspectRatio === item.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Rotate & Flip Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setRotate((r) => (r - 90) % 360)}
            title="Rotate Left 90°"
            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setRotate((r) => (r + 90) % 360)}
            title="Rotate Right 90°"
            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setFlipH((f) => !f)}
            title="Flip Horizontal"
            className={`p-1.5 rounded-lg ${
              flipH ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <FlipHorizontal className="h-4 w-4" />
          </button>
          <button
            onClick={() => setFlipV((f) => !f)}
            title="Flip Vertical"
            className={`p-1.5 rounded-lg ${
              flipV ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <FlipVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Image Cropper Stage */}
      <div
        ref={containerRef}
        className="relative w-full max-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-4 shadow-inner select-none"
      >
        <div className="relative inline-block max-h-[460px]">
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Source Cropping"
            style={{
              transform: `rotate(${rotate}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
            }}
            className="max-h-[440px] w-auto max-w-full object-contain pointer-events-none transition-transform duration-200"
          />

          {/* Dimmed Background Overlay */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {/* Active Crop Box Window */}
          <div
            onPointerDown={(e) => handlePointerDown('move', e)}
            className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move transition-all"
            style={{
              left: `${cropLeftPct}%`,
              top: `${cropTopPct}%`,
              width: `${cropWidthPct}%`,
              height: `${cropHeightPct}%`,
            }}
          >
            {/* Grid 3x3 Overlay Lines */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
              <div className="border-r border-b border-white/30" />
              <div className="border-r border-b border-white/30" />
              <div className="border-b border-white/30" />
              <div className="border-r border-b border-white/30" />
              <div className="border-r border-b border-white/30" />
              <div className="border-b border-white/30" />
              <div className="border-r border-white/30" />
              <div className="border-r border-white/30" />
              <div />
            </div>

            {/* Corner Resize Handles */}
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown('nw', e);
              }}
              className="absolute -top-1.5 -left-1.5 h-4 w-4 bg-white border-2 border-indigo-600 rounded-sm cursor-nwse-resize shadow"
            />
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown('ne', e);
              }}
              className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-white border-2 border-indigo-600 rounded-sm cursor-nesw-resize shadow"
            />
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown('sw', e);
              }}
              className="absolute -bottom-1.5 -left-1.5 h-4 w-4 bg-white border-2 border-indigo-600 rounded-sm cursor-nesw-resize shadow"
            />
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown('se', e);
              }}
              className="absolute -bottom-1.5 -right-1.5 h-4 w-4 bg-white border-2 border-indigo-600 rounded-sm cursor-nwse-resize shadow"
            />

            {/* Edge Handles */}
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown('n', e);
              }}
              className="absolute -top-1 left-1/2 -translate-x-1/2 h-2.5 w-8 bg-white border border-indigo-600 rounded-full cursor-ns-resize shadow"
            />
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown('s', e);
              }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2.5 w-8 bg-white border border-indigo-600 rounded-full cursor-ns-resize shadow"
            />
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown('w', e);
              }}
              className="absolute -left-1 top-1/2 -translate-y-1/2 h-8 w-2.5 bg-white border border-indigo-600 rounded-full cursor-ew-resize shadow"
            />
            <div
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown('e', e);
              }}
              className="absolute -right-1 top-1/2 -translate-y-1/2 h-8 w-2.5 bg-white border border-indigo-600 rounded-full cursor-ew-resize shadow"
            />

            {/* Crop Size Badge */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow">
              {crop.width} x {crop.height} px
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="w-full flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => {
            setRotate(0);
            setFlipH(false);
            setFlipV(false);
            handleSetAspect(initialAspectRatio);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset Crop Frame
        </button>

        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => onApplyCrop(crop, rotate, flipH, flipV)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
          >
            <Check className="h-4 w-4" />
            Apply & Crop Image
          </button>
        </div>
      </div>
    </div>
  );
};

