// Application Configuration (Admin Settings)
// Administrators can modify AdSense and Google Analytics credentials directly in this file.

export interface AdConfig {
  enableAds: boolean;
  showDemoAds: boolean;
  adSenseClientId: string; // e.g. "ca-pub-1234567890123456"
  headerSlot: string;
  inlineSlot: string;
  sidebarSlot: string;
  downloadSlot: string;
  skyscraperLeftSlot: string;
  skyscraperRightSlot: string;
}

export interface AnalyticsConfig {
  gaMeasurementId: string; // e.g. "G-XXXXXXXXXX"
  enabled: boolean;
}

export const AD_CONFIG: AdConfig = {
  enableAds: false,
  showDemoAds: true, // Set to false to hide placeholders and use real Google AdSense units
  adSenseClientId: 'ca-pub-0000000000000000', // Replace with Admin AdSense Client ID
  headerSlot: '1234567890',
  inlineSlot: '2345678901',
  sidebarSlot: '3456789012',
  downloadSlot: '4567890123',
  skyscraperLeftSlot: '5678901234',
  skyscraperRightSlot: '6789012345',
};

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  gaMeasurementId: 'G-DEMO123456', // Replace with Admin GA4 Measurement ID
  enabled: true,
};
