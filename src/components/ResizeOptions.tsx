import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Percent, Move } from 'lucide-react';

interface ResizeOptionsProps {
  originalWidth: number;
  originalHeight: number;
  onApplyResize: (width: number, height: number) => void;
}

export const ResizeOptions: React.FC<ResizeOptionsProps> = ({
  originalWidth,
  originalHeight,
  onApplyResize,
}) => {
  const [mode, setMode] = useState<'percent' | 'dimensions'>('percent');
  const [percent, setPercent] = useState<number>(75);
  const [width, setWidth] = useState<number>(Math.round(originalWidth * 0.75));
  const [height, setHeight] = useState<number>(Math.round(originalHeight * 0.75));
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);

  const aspectRatio = originalWidth / originalHeight;

  // Handle percent slider change
  const handlePercentChange = (p: number) => {
    setPercent(p);
    const newW = Math.round(originalWidth * (p / 100));
    const newH = Math.round(originalHeight * (p / 100));
    setWidth(newW);
    setHeight(newH);
    onApplyResize(newW, newH);
  };

  // Handle width change
  const handleWidthChange = (w: number) => {
    setWidth(w);
    let newH = height;
    if (lockAspectRatio && aspectRatio) {
      newH = Math.round(w / aspectRatio);
      setHeight(newH);
    }
    onApplyResize(w, newH);
  };

  // Handle height change
  const handleHeightChange = (h: number) => {
    setHeight(h);
    let newW = width;
    if (lockAspectRatio && aspectRatio) {
      newW = Math.round(h * aspectRatio);
      setWidth(newW);
    }
    onApplyResize(newW, h);
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700">
        <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Move className="h-4 w-4 text-indigo-500" />
          Resize Dimensions
        </span>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setMode('percent')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              mode === 'percent'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            By Percentage (%)
          </button>
          <button
            onClick={() => setMode('dimensions')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              mode === 'dimensions'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            By Pixels (W × H)
          </button>
        </div>
      </div>

      {mode === 'percent' ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Scale Percentage: <span className="text-indigo-600 font-mono text-sm font-black">{percent}%</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {width} × {height} px
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[25, 50, 75, 90].map((p) => (
              <button
                key={p}
                onClick={() => handlePercentChange(p)}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
                  percent === p
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                {p}%
              </button>
            ))}
          </div>

          <input
            type="range"
            min="10"
            max="200"
            value={percent}
            onChange={(e) => handlePercentChange(parseInt(e.target.value))}
            className="w-full mt-3 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 10)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 10)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={() => setLockAspectRatio(!lockAspectRatio)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-colors ${
              lockAspectRatio
                ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600'
            }`}
          >
            {lockAspectRatio ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {lockAspectRatio ? 'Lock Aspect Ratio' : 'Unlocked Aspect Ratio'}
          </button>
        </div>
      )}
    </div>
  );
};
