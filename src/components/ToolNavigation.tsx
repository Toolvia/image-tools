import React from 'react';
import { TOOL_PRESETS } from '../data/presets';
import { PresetTool, ToolType } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface ToolNavigationProps {
  activeTool: ToolType;
  selectedPresetId?: string;
  onSelectPreset: (preset: PresetTool) => void;
}

export const ToolNavigation: React.FC<ToolNavigationProps> = ({
  activeTool,
  selectedPresetId,
  onSelectPreset,
}) => {
  const filteredPresets = TOOL_PRESETS.filter((p) => p.tool === activeTool);

  return (
    <div className="w-full my-4">
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          <span>Quick Presets:</span>
        </div>

        {filteredPresets.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              {isSelected ? (
                <Check className="h-3.5 w-3.5 text-white" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
              )}
              <span>{preset.label}</span>
              {preset.toFormat && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  .{preset.toFormat}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

