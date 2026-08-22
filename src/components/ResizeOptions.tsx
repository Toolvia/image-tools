import React, { useState } from 'react';
import { Lock, Unlock, Move, Sparkles, Check, Search } from 'lucide-react';
import { STANDARD_IMAGE_SIZES, StandardSizePreset } from '../data/standardSizes';

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
  const [mode, setMode] = useState<'standard' | 'dimensions' | 'percent'>('standard');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const [percent, setPercent] = useState<number>(75);
  const [width, setWidth] = useState<number>(Math.round(originalWidth * 0.75));
  const [height, setHeight] = useState<number>(Math.round(originalHeight * 0.75));
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);

  const originalAspectRatio = originalWidth / originalHeight;

  // Handle Preset Selection
  const handleSelectPreset = (preset: StandardSizePreset) => {
    setSelectedPresetId(preset.id);
    setWidth(preset.width);
    setHeight(preset.height);
    onApplyResize(preset.width, preset.height);
  };

  // Handle percent slider change
  const handlePercentChange = (p: number) => {
    setPercent(p);
    setSelectedPresetId(null);
    const newW = Math.round(originalWidth * (p / 100));
    const newH = Math.round(originalHeight * (p / 100));
    setWidth(newW);
    setHeight(newH);
    onApplyResize(newW, newH);
  };

  // Handle width change
  const handleWidthChange = (w: number) => {
    setWidth(w);
    setSelectedPresetId(null);
    let newH = height;
    if (lockAspectRatio && originalAspectRatio) {
      newH = Math.round(w / originalAspectRatio);
      setHeight(newH);
    }
    onApplyResize(w, newH);
  };

  // Handle height change
  const handleHeightChange = (h: number) => {
    setHeight(h);
    setSelectedPresetId(null);
    let newW = width;
    if (lockAspectRatio && originalAspectRatio) {
      newW = Math.round(h * originalAspectRatio);
      setWidth(newW);
    }
    onApplyResize(newW, h);
  };

  // Filter presets
  const filteredPresets = STANDARD_IMAGE_SIZES.filter((preset) => {
    const matchesCategory = activeCategory === 'all' || preset.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      preset.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.sublabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-4 shadow-sm">
      {/* Header with Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Move className="h-4 w-4" />
          </div>
          <div>
            <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm block">
              Resize Image Dimensions
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Original: {originalWidth} × {originalHeight} px
            </span>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold shrink-0">
          <button
            onClick={() => setMode('standard')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'standard'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Passport & Social Presets</span>
          </button>

          <button
            onClick={() => setMode('dimensions')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === 'dimensions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Custom Pixels
          </button>

          <button
            onClick={() => setMode('percent')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === 'percent'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Percentage (%)
          </button>
        </div>
      </div>

      {/* 1. STANDARD PASSPORT & SOCIAL PRESET MODE */}
      {mode === 'standard' && (
        <div className="space-y-3.5">
          {/* Category Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Standards' },
                { id: 'passport', label: '🪪 Passport & ID' },
                { id: 'print', label: '🖨️ Print (300 DPI)' },
                { id: 'ecommerce', label: '🛍️ E-Commerce' },
                { id: 'facebook', label: '📘 Facebook' },
                { id: 'youtube', label: '▶️ YouTube' },
                { id: 'instagram', label: '📸 Instagram' },
                { id: 'social', label: '🌐 TikTok & X' },
                { id: 'gaming', label: '🎮 Discord & Gaming' },
                { id: 'wallpaper', label: '📱 Wallpapers' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[180px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search standard (e.g. 2x2, passport, cover)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredPresets.map((preset) => {
              const isSelected = selectedPresetId === preset.id || (width === preset.width && height === preset.height);
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between space-y-1.5 ${
                    isSelected
                      ? 'bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white text-xs leading-snug line-clamp-1">
                      {preset.label}
                    </span>
                    {isSelected ? (
                      <span className="h-4 w-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-500 shrink-0">
                        {preset.width}×{preset.height}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                    {preset.sublabel}
                  </span>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>

          {filteredPresets.length === 0 && (
            <div className="p-6 text-center text-slate-400 dark:text-slate-500">
              No standard size presets matching &quot;{searchQuery}&quot;.
            </div>
          )}

          {/* Current Target Output Status */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Active Output Target:
            </span>
            <span className="font-mono font-black text-indigo-700 dark:text-indigo-300 text-sm">
              {width} × {height} px
            </span>
          </div>
        </div>
      )}

      {/* 2. CUSTOM DIMENSIONS PIXEL MODE */}
      {mode === 'dimensions' && (
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Width (pixels)
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
                Height (pixels)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 10)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setLockAspectRatio(!lockAspectRatio)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                lockAspectRatio
                  ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {lockAspectRatio ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
              {lockAspectRatio ? 'Lock Aspect Ratio' : 'Unlock Aspect Ratio (Freeform)'}
            </button>

            <span className="font-mono text-slate-400 text-[11px]">
              Ratio: {(width / height).toFixed(2)}:1
            </span>
          </div>
        </div>
      )}

      {/* 3. PERCENTAGE SCALE MODE */}
      {mode === 'percent' && (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Scale Percentage: <span className="text-indigo-600 font-mono text-sm font-black">{percent}%</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {width} × {height} px
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[25, 50, 75, 90, 100].map((p) => (
              <button
                key={p}
                onClick={() => handlePercentChange(p)}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
                  percent === p
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
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
            className="w-full mt-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      )}
    </div>
  );
};
