export type ToolType = 'compress' | 'resize' | 'crop' | 'convert';

export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/bmp' | 'image/x-icon' | 'application/pdf' | 'image/svg+xml';

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
  format: string; // e.g. 'jpg', 'png', 'webp', 'ico', 'pdf', 'svg', 'base64'
  status: 'idle' | 'processing' | 'done' | 'error';
  errorMessage?: string;
  base64String?: string;
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

export interface PresetFaq {
  question: string;
  answer: string;
}

export interface PresetFeature {
  title: string;
  description: string;
}

export interface PresetTool {
  id: string;
  path: string; // e.g. '/compress-jpg' or '/jpg-to-png'
  label: string;
  tool: ToolType;
  category?: 'compress' | 'convert' | 'resize' | 'crop' | 'target-kb' | 'utility';
  badge?: string;
  fromFormat?: string;
  toFormat?: string;
  targetKB?: number;
  aspectRatio?: number;
  aspectLabel?: string;
  filter?: 'none' | 'grayscale' | 'invert' | 'sepia';
  circleCrop?: boolean;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  h1Title?: string;
  h2Subtitle?: string;
  howToSteps?: string[];
  features?: PresetFeature[];
  faqs?: PresetFaq[];
  deepArticle?: {
    heading: string;
    paragraphs: string[];
  };
}
