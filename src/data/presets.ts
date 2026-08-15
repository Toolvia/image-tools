import { PresetTool } from '../types';

export const TOOL_PRESETS: PresetTool[] = [
  // Compress Presets
  {
    id: 'compress-jpg',
    label: 'Compress JPG / JPEG',
    tool: 'compress',
    fromFormat: 'jpg',
    toFormat: 'jpg',
    description: 'Reduce JPG file size up to 80% while retaining high visual quality.',
  },
  {
    id: 'compress-png',
    label: 'Compress PNG',
    tool: 'compress',
    fromFormat: 'png',
    toFormat: 'png',
    description: 'Optimize transparent PNG images with significantly reduced file size.',
  },
  {
    id: 'compress-webp',
    label: 'Compress WebP',
    tool: 'compress',
    fromFormat: 'webp',
    toFormat: 'webp',
    description: 'Next-gen WebP compression to boost Google PageSpeed & Lighthouse scores.',
  },

  // Resize Presets
  {
    id: 'resize-custom',
    label: 'Custom Resize',
    tool: 'resize',
    description: 'Resize by custom Pixel dimensions (Width x Height) or percentage scale.',
  },

  // Conversion Presets
  {
    id: 'jpg-to-png',
    label: 'JPG to PNG',
    tool: 'convert',
    fromFormat: 'jpg',
    toFormat: 'png',
    description: 'Convert JPG images to PNG format effortlessly.',
  },
  {
    id: 'png-to-jpg',
    label: 'PNG to JPG',
    tool: 'convert',
    fromFormat: 'png',
    toFormat: 'jpg',
    description: 'Convert transparent or regular PNG images to JPG format.',
  },
  {
    id: 'jpg-to-webp',
    label: 'JPG to WebP',
    tool: 'convert',
    fromFormat: 'jpg',
    toFormat: 'webp',
    description: 'Convert JPG to lightweight WebP format for web optimization.',
  },
  {
    id: 'webp-to-jpg',
    label: 'WebP to JPG',
    tool: 'convert',
    fromFormat: 'webp',
    toFormat: 'jpg',
    description: 'Convert WebP images back to universally compatible JPG files.',
  },
  {
    id: 'png-to-webp',
    label: 'PNG to WebP',
    tool: 'convert',
    fromFormat: 'png',
    toFormat: 'webp',
    description: 'Convert PNG to WebP while preserving transparency and reducing size.',
  },
  {
    id: 'webp-to-png',
    label: 'WebP to PNG',
    tool: 'convert',
    fromFormat: 'webp',
    toFormat: 'png',
    description: 'Convert WebP format to lossless PNG format.',
  },

  // Cropper Presets
  {
    id: 'crop-free',
    label: 'Freeform Crop',
    tool: 'crop',
    description: 'Crop freely with visual handles, 90° rotation, and horizontal/vertical flip.',
  },
  {
    id: 'crop-1-1',
    label: 'Square Crop 1:1',
    tool: 'crop',
    aspectRatio: 1,
    aspectLabel: '1:1 (Avatar/Instagram)',
    description: 'Standard 1:1 square aspect ratio for Facebook, Instagram, and avatars.',
  },
  {
    id: 'crop-16-9',
    label: 'Widescreen 16:9',
    tool: 'crop',
    aspectRatio: 16 / 9,
    aspectLabel: '16:9 (YouTube/Banner)',
    description: 'Standard 16:9 aspect ratio for YouTube thumbnails, banners, and slides.',
  },
  {
    id: 'crop-9-16',
    label: 'Vertical 9:16',
    tool: 'crop',
    aspectRatio: 9 / 16,
    aspectLabel: '9:16 (TikTok/Reels/Story)',
    description: 'Standard 9:16 portrait ratio for TikTok, Instagram Reels, and Stories.',
  },
];

