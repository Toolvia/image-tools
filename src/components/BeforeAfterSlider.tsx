import React, { useState, useRef, useCallback } from 'react';
import { Eye, CheckCircle2 } from 'lucide-react';

interface BeforeAfterSliderProps {
  originalUrl: string;
  processedUrl: string;
  originalLabel?: string;
  processedLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalUrl,
  processedUrl,
  originalLabel = 'Ảnh Gốc',
  processedLabel = 'Ảnh Đã Nén',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-2 flex items-center justify-between w-full text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5 text-indigo-500" />
          Kéo thanh trượt giữa hình để so sánh chất lượng ảnh:
        </span>
        <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
          Trái: Gốc ({Math.round(sliderPosition)}%) | Phải: Mới ({Math.round(100 - sliderPosition)}%)
        </span>
      </div>

      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[320px] sm:h-[420px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 select-none cursor-ew-resize shadow-md"
      >
        {/* Processed (After) Image - Background */}
        <img
          src={processedUrl}
          alt={processedLabel}
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
        />

        {/* Original (Before) Image - Clipped Top Layer */}
        <div
          className="absolute inset-0 h-full overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={originalUrl}
            alt={originalLabel}
            className="absolute inset-0 h-full w-full object-contain max-w-none pointer-events-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
        </div>

        {/* Labels Overlay */}
        <div className="absolute top-3 left-3 bg-slate-900/80 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold border border-white/10 shadow">
          {originalLabel}
        </div>
        <div className="absolute top-3 right-3 bg-emerald-600/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold border border-white/10 shadow flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          {processedLabel}
        </div>

        {/* Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg border border-slate-200 font-bold text-xs">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
};
