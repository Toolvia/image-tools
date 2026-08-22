import React, { useState } from 'react';
import { PresetTool } from '../types';
import {
  ShieldCheck,
  Zap,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface SeoArticleSectionProps {
  preset: PresetTool;
}

export const SeoArticleSection: React.FC<SeoArticleSectionProps> = ({ preset }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <article className="mt-14 space-y-12 border-t border-slate-200/90 dark:border-slate-800/90 pt-10">
      {/* 1. Deep Context & Overview */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Complete Guide & Specifications</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {preset.deepArticle?.heading || `About ${preset.label}`}
        </h2>

        {preset.deepArticle?.paragraphs.map((p, idx) => (
          <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {p}
          </p>
        ))}
      </section>

      {/* 2. Step-by-Step How To Guide */}
      {preset.howToSteps && preset.howToSteps.length > 0 && (
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              How to use {preset.label} (Step-by-Step)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {preset.howToSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-7 w-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Step {idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-normal">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Unique Feature Highlights */}
      {preset.features && preset.features.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Key Capabilities & Technical Advantages
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {preset.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{feat.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Frequently Asked Questions (FAQ) with Schema-Friendly UI */}
      {preset.faqs && preset.faqs.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {preset.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-indigo-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. Privacy & Security Trust Badge */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-emerald-900 dark:text-emerald-200 block text-sm">
              Strict In-Browser Sandboxing Policy
            </span>
            <span className="text-slate-600 dark:text-slate-400 text-xs">
              PicSwift uses pure client-side HTML5 Canvas and WebAssembly. Your photos and private EXIF information never leave your computer.
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
