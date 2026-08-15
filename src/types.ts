export type ToolType = 'compress' | 'resize' | 'crop' | 'convert';

export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/bmp' | 'image/x-icon';

export interface ProcessedImage {
  id: string;
  file: File;
  name: string;
  originalUrl: string;
  processedUrl?: string;
  originalSize: number;
  processedSize?: number;
  originalWidth: number;
  originalHeight: number;
  processedWidth?: number;
  processedHeight?: number;
  format: string; // e.g. 'jpg', 'png', 'webp'
  status: 'idle' | 'processing' | 'done' | 'error';
  errorMessage?: string;
}

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AdSettings {
  enableAds: boolean;
  showDemoAds: boolean;
  adSenseClientId: string; // e.g. ca-pub-xxxxxxxxxx
  headerSlot: string;
  inlineSlot: string;
  sidebarSlot: string;
  downloadSlot: string;
}

export interface AnalyticsSettings {
  gaMeasurementId: string; // e.g. G-XXXXXXXXXX
  enabled: boolean;
}

export interface PresetTool {
  id: string;
  label: string;
  tool: ToolType;
  fromFormat?: string;
  toFormat?: string;
  aspectRatio?: number;
  aspectLabel?: string;
  description: string;
}
