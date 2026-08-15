// Google Analytics Utility for GA4 integration

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function initGA(measurementId: string): void {
  if (!measurementId || typeof window === 'undefined') return;

  // Clean existing script if any
  const existingScript = document.getElementById('ga-gtag-script');
  if (existingScript) {
    existingScript.remove();
  }

  // Add gtag.js script
  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer & gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
  });

  console.log(`[Google Analytics] Initialized with ID: ${measurementId}`);
}

export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  console.log(`[GA Event Tracked] ${eventName}`, params);
}
