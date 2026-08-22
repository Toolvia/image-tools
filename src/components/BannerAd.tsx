import React from 'react';
import { getStoredAdConfig, AdConfig } from '../config';
import { ExternalLink, Sparkles, Shield, Server, Zap } from 'lucide-react';

interface BannerAdProps {
  type: 'header' | 'inline' | 'sidebar' | 'download' | 'skyscraper-left' | 'skyscraper-right';
  settings?: AdConfig;
  className?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({
  type,
  settings,
  className = '',
}) => {
  const currentSettings = settings || getStoredAdConfig();
  if (!currentSettings.enableAds) return null;

  const getSlot = () => {
    switch (type) {
      case 'header':
        return currentSettings.headerSlot;
      case 'sidebar':
        return currentSettings.sidebarSlot;
      case 'download':
        return currentSettings.downloadSlot;
      case 'skyscraper-left':
        return currentSettings.skyscraperLeftSlot;
      case 'skyscraper-right':
        return currentSettings.skyscraperRightSlot;
      case 'inline':
      default:
        return currentSettings.inlineSlot;
    }
  };

  const slotId = getSlot();
  const isRealConfigured = currentSettings.adSenseClientId && slotId;

  // Render real AdSense script block if configured
  if (isRealConfigured && !currentSettings.showDemoAds) {
    const isSkyscraper = type === 'skyscraper-left' || type === 'skyscraper-right';
    return (
      <div className={`flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-2 ${className}`}>
        <div className="mb-1 text-[9px] uppercase tracking-wider text-slate-400">Advertisement</div>
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            minWidth: isSkyscraper ? '160px' : 'auto',
            minHeight: isSkyscraper ? '600px' : 'auto',
          }}
          data-ad-client={currentSettings.adSenseClientId}
          data-ad-slot={slotId}
          data-ad-format={isSkyscraper ? 'vertical' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>
    );
  }


  // Skyscraper Left Banner (160x600 style)
  if (type === 'skyscraper-left') {
    return (
      <div className={`w-[160px] min-h-[600px] flex flex-col justify-between overflow-hidden rounded-2xl border border-indigo-200/80 dark:border-indigo-900/50 bg-gradient-to-b from-indigo-50/90 via-white to-blue-50/90 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 p-3.5 text-center shadow-md ${className}`}>
        <div className="flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-2">
            ADS (160×600)
          </span>

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
            <Shield className="h-6 w-6" />
          </div>

          <span className="inline-block rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 text-[10px] font-extrabold mb-2">
            SPONSORED
          </span>

          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
            Fast & Secure Cloud Storage
          </h4>

          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            Unlimited bandwidth, end-to-end encrypted backup & rapid sync.
          </p>

          <div className="my-3 w-full border-t border-dashed border-indigo-200 dark:border-indigo-900/60" />

          <div className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 text-left w-full">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-500 shrink-0" />
              <span>100GB Free Tier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-500 shrink-0" />
              <span>Instant Share Links</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-500 shrink-0" />
              <span>Zero Log Policy</span>
            </div>
          </div>
        </div>

        <div className="pt-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-xs font-bold shadow-md shadow-indigo-500/20 transition-transform active:scale-95"
          >
            <span>Claim Offer</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    );
  }

  // Skyscraper Right Banner (160x600 style)
  if (type === 'skyscraper-right') {
    return (
      <div className={`w-[160px] min-h-[600px] flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 bg-gradient-to-b from-emerald-50/90 via-white to-teal-50/90 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 p-3.5 text-center shadow-md ${className}`}>
        <div className="flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-2">
            ADS (160×600)
          </span>

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/30">
            <Server className="h-6 w-6" />
          </div>

          <span className="inline-block rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-extrabold mb-2">
            FEATURED
          </span>

          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
            NVMe Cloud VPS Hosting
          </h4>

          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            Deploy fullstack web apps & Docker containers in under 60 seconds.
          </p>

          <div className="my-3 w-full border-t border-dashed border-emerald-200 dark:border-emerald-900/60" />

          <div className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 text-left w-full">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-emerald-500 shrink-0" />
              <span>99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-emerald-500 shrink-0" />
              <span>Free DDoS Shield</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-emerald-500 shrink-0" />
              <span>24/7 Tech Support</span>
            </div>
          </div>
        </div>

        <div className="pt-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-xs font-bold shadow-md shadow-emerald-500/20 transition-transform active:scale-95"
          >
            <span>Start Free</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    );
  }

  // Demo / Placeholder Ad rendering with sleek, realistic ad design
  if (type === 'header') {
    return (
      <div className={`my-3 w-full overflow-hidden rounded-2xl border border-indigo-100 dark:border-indigo-950/60 bg-gradient-to-r from-indigo-50/90 via-sky-50/80 to-blue-50/90 dark:from-indigo-950/40 dark:via-slate-900/80 dark:to-blue-950/40 p-3 sm:p-4 text-slate-800 dark:text-slate-200 shadow-sm transition-all ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                  SPONSORED
                </span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  High-Speed Web Hosting & Domains
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Boost website load times with NVMe SSD & Free SSL. Optimized for GitHub Pages & React SPAs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
            >
              <span>Explore Now</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm ${className}`}>
        <div className="mb-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Ad Placement (300x250)
          </span>
        </div>
        <div className="my-2 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/60 p-4 text-slate-800 dark:text-slate-200">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Image & Banner Creator</h4>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Generate Facebook & Google display ad banners automatically with AI in seconds.
          </p>
          <button className="mt-3 w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white py-2 text-xs font-semibold shadow-sm transition-colors">
            Try Free Demo
          </button>
        </div>
      </div>
    );
  }

  if (type === 'download') {
    return (
      <div className={`my-4 w-full overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/60 dark:bg-emerald-950/30 p-4 text-slate-800 dark:text-slate-200 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="rounded bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
            SPONSORED RECOMMENDATION
          </span>
        </div>
        <p className="text-xs font-medium text-slate-900 dark:text-white">
          🚀 Compression complete! Need fast cloud storage or file sharing?
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Experience high-speed secure cloud file storage completely free.
        </p>
      </div>
    );
  }

  // Default Inline Banner
  return (
    <div className={`my-4 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 sm:p-4 text-slate-800 dark:text-slate-200 ${className}`}>
      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
        <span>INLINE ADVERTISEMENT BANNER</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-600 dark:text-slate-300 text-center sm:text-left">
          ⚡ <strong>Need batch image conversion for 100+ files?</strong> High speed performance optimized for all mobile devices.
        </p>
        <span className="shrink-0 rounded-lg bg-indigo-600 text-white text-xs px-3 py-1.5 font-medium">
          Learn More
        </span>
      </div>
    </div>
  );
};

