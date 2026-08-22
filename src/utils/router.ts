import { TOOL_PRESETS } from '../data/presets';
import { PresetTool, ToolType } from '../types';

export const BASE_PATH = '/image-tools';
export const SITE_DOMAIN = 'https://toolvia.github.io';
export const SITE_URL = `${SITE_DOMAIN}${BASE_PATH}`;

/**
 * Checks if the current URL points to the secret admin portal (/admin, /#admin, ?admin, etc.)
 */
export function isAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  return (
    pathname.endsWith('/admin') ||
    pathname.endsWith('/admin/') ||
    pathname.includes('/admin') ||
    hash.includes('admin') ||
    search.includes('admin') ||
    search.includes('admin=true') ||
    search.includes('page=admin')
  );
}

/**
 * Parses the current browser URL to find matching PresetTool and ToolType.
 * Supports:
 * - Direct path matching: /image-tools/compress-jpg, /image-tools/jpg-to-png
 * - Hash routing fallback: /image-tools/#/compress-jpg, #compress-jpg
 * - Query parameter fallback: /image-tools/?tool=compress-jpg
 */
export function getCurrentRouteInfo(): {
  preset: PresetTool;
  tool: ToolType;
} {
  if (typeof window === 'undefined') {
    return { preset: TOOL_PRESETS[0], tool: 'compress' };
  }

  // 1. Check path (e.g., /image-tools/compress-jpg)
  let pathname = window.location.pathname;
  if (pathname.startsWith(BASE_PATH)) {
    pathname = pathname.substring(BASE_PATH.length);
  }
  // Trim trailing slash
  if (pathname.endsWith('/') && pathname.length > 1) {
    pathname = pathname.slice(0, -1);
  }

  // 2. Check hash (e.g., #/compress-jpg or #compress-jpg)
  const hash = window.location.hash.replace(/^#\/?/, '/');

  // 3. Check query param (e.g., ?tool=compress-jpg)
  const params = new URLSearchParams(window.location.search);
  const queryTool = params.get('tool');

  // Search by path match first
  let match = TOOL_PRESETS.find(
    (p) => p.path === pathname || (p.path && p.path.toLowerCase() === pathname.toLowerCase())
  );

  // If not found, try hash match
  if (!match && hash && hash !== '/') {
    match = TOOL_PRESETS.find(
      (p) => p.path === hash || p.id === hash.replace('/', '')
    );
  }

  // If not found, try query param match
  if (!match && queryTool) {
    match = TOOL_PRESETS.find(
      (p) => p.id === queryTool || p.path === `/${queryTool}`
    );
  }

  // If still not found, check top-level tool routes like /compress, /resize, /crop, /convert
  if (!match) {
    const cleanPath = (pathname.replace('/', '') || hash.replace('/', '')).toLowerCase();
    if (cleanPath === 'compress' || cleanPath === 'resize' || cleanPath === 'crop' || cleanPath === 'convert') {
      const firstInTool = TOOL_PRESETS.find((p) => p.tool === cleanPath);
      if (firstInTool) match = firstInTool;
    }
  }

  const selectedPreset = match || TOOL_PRESETS[0];
  return {
    preset: selectedPreset,
    tool: selectedPreset.tool,
  };
}

/**
 * Navigate to a specific preset URL and update browser history & SEO metadata dynamically
 */
export function navigateToPreset(preset: PresetTool) {
  if (typeof window === 'undefined') return;

  const targetUrl = `${BASE_PATH}${preset.path}`;
  
  if (window.location.pathname !== targetUrl) {
    window.history.pushState({ presetId: preset.id }, '', targetUrl);
  }

  updateDocumentMeta(preset);
}

/**
 * Updates document title, description, canonical link, OpenGraph, keywords, and JSON-LD Structured Data dynamically
 */
export function updateDocumentMeta(preset: PresetTool) {
  if (typeof document === 'undefined') return;

  const title = preset.metaTitle || `${preset.label} - Fast Online Image Tools | PicSwift`;
  const description = preset.metaDescription || preset.description;
  const canonicalUrl = `${SITE_DOMAIN}${BASE_PATH}${preset.path}`;

  // Update <title>
  document.title = title;

  // Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Update Meta Keywords
  if (preset.keywords && preset.keywords.length > 0) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', preset.keywords.join(', '));
  }

  // Update Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  // Update OpenGraph tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  // Inject or update JSON-LD Schema (SoftwareApplication + FAQPage)
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: preset.label,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        url: canonicalUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: description,
      },
    ],
  };

  if (preset.faqs && preset.faqs.length > 0) {
    structuredData['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: preset.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  let schemaScript = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'json-ld-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify(structuredData);
}
