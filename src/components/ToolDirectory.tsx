import React, { useState } from 'react';
import { TOOL_PRESETS } from '../data/presets';
import { PresetTool } from '../types';
import { Minimize2, RefreshCw, Crop as CropIcon, Image, ArrowRight, Search, Shield, Sparkles, Target } from 'lucide-react';

interface ToolDirectoryProps {
  currentPresetId: string;
  onSelectPreset: (preset: PresetTool) => void;
}

export const ToolDirectory: React.FC<ToolDirectoryProps> = ({
  currentPresetId,
  onSelectPreset,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tools', count: TOOL_PRESETS.length },
    { id: 'compress', label: 'Compress & Target KB', count: TOOL_PRESETS.filter((p) => p.category === 'compress' || p.category === 'target-kb').length },
    { id: 'convert', label: 'Format Conversion', count: TOOL_PRESETS.filter((p) => p.category === 'convert').length },
    { id: 'resize', label: 'Resize & Print Sizes', count: TOOL_PRESETS.filter((p) => p.category === 'resize').length },
    { id: 'crop', label: 'Crop & Privacy Utilities', count: TOOL_PRESETS.filter((p) => p.category === 'crop' || p.category === 'utility').length },
  ];

  const filteredTools = TOOL_PRESETS.filter((preset) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'compress' && (preset.category === 'compress' || preset.category === 'target-kb')) ||
      (selectedCategory === 'convert' && preset.category === 'convert') ||
      (selectedCategory === 'resize' && preset.category === 'resize') ||
      (selectedCategory === 'crop' && (preset.category === 'crop' || preset.category === 'utility'));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      preset.label.toLowerCase().includes(q) ||
      preset.description.toLowerCase().includes(q) ||
      (preset.keywords && preset.keywords.some((k) => k.toLowerCase().includes(q))) ||
      preset.path.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const getToolIcon = (tool: PresetTool) => {
    if (tool.category === 'target-kb') return <Target className="h-4 w-4 text-rose-500" />;
    if (tool.category === 'utility') return <Shield className="h-4 w-4 text-emerald-500" />;
    if (tool.tool === 'compress') return <Minimize2 className="h-4 w-4 text-emerald-500" />;
    if (tool.tool === 'convert') return <RefreshCw className="h-4 w-4 text-indigo-500" />;
    if (tool.tool === 'resize') return <Image className="h-4 w-4 text-blue-500" />;
    return <CropIcon className="h-4 w-4 text-amber-500" />;
  };

  return (
    <section className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800" id="all-tools">
      <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Full Tool Directory & Specialized Presets</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore All Image Optimization Tools
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Fast, private, in-browser image tools with zero server uploads and instant downloads.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools (e.g. heic, 20kb, pdf, passport, ico)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredTools.map((preset) => {
          const isCurrent = preset.id === currentPresetId;
          return (
            <a
              key={preset.id}
              href={`/image-tools${preset.path}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectPreset(preset);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`group p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 relative overflow-hidden ${
                isCurrent
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 shrink-0">
                    {getToolIcon(preset)}
                  </div>
                  {preset.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      {preset.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {preset.label}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <span>Launch Tool</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="p-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
          <p className="text-sm font-semibold">No tools found matching &quot;{searchQuery}&quot;</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Clear filters and show all tools
          </button>
        </div>
      )}
    </section>
  );
};
