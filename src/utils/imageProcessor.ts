import JSZip from 'jszip';
import { ImageFormat, CropRect } from '../types';

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getFileExtension(filename: string): string {
  const ext = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  return ext.toLowerCase() || 'jpg';
}

export function getMimeType(format: string): ImageFormat {
  const f = format.toLowerCase().replace('.', '');
  switch (f) {
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'bmp':
      return 'image/bmp';
    case 'ico':
      return 'image/x-icon';
    case 'jpg':
    case 'jpeg':
    default:
      return 'image/jpeg';
  }
}

export function getExtensionFromMime(mime: string): string {
  switch (mime) {
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/bmp':
      return 'bmp';
    case 'image/x-icon':
      return 'ico';
    case 'image/jpeg':
    default:
      return 'jpg';
  }
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number; url: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight, url });
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

/**
 * Process single image with options: quality, target format, resize dimensions, crop bounds, rotation, flips
 */
export async function processImage({
  file,
  targetFormat,
  quality = 0.8,
  width,
  height,
  crop,
  rotate = 0,
  flipH = false,
  flipV = false,
}: {
  file: File;
  targetFormat?: string; // 'jpg' | 'png' | 'webp' | 'ico' | 'bmp'
  quality?: number; // 0.1 - 1.0
  width?: number;
  height?: number;
  crop?: CropRect;
  rotate?: number; // degrees 0, 90, 180, 270
  flipH?: boolean;
  flipV?: boolean;
}): Promise<{ blob: Blob; url: string; width: number; height: number; filename: string }> {
  const { width: origW, height: origH, url: origUrl } = await getImageDimensions(file);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('Could not get canvas 2d context');

        // Determine working source area (crop vs full image)
        const srcX = crop ? crop.x : 0;
        const srcY = crop ? crop.y : 0;
        const srcW = crop ? crop.width : origW;
        const srcH = crop ? crop.height : origH;

        // Determine destination dimensions
        let destW = width || srcW;
        let destH = height || srcH;

        // If rotate is 90 or 270 degrees, canvas dimensions swap
        const normalizedRotate = ((rotate % 360) + 360) % 360;
        const isRotated90 = normalizedRotate === 90 || normalizedRotate === 270;

        if (isRotated90) {
          canvas.width = destH;
          canvas.height = destW;
        } else {
          canvas.width = destW;
          canvas.height = destH;
        }

        // Apply high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Background fill for transparency conversion to JPG
        const mimeType = getMimeType(targetFormat || getFileExtension(file.name));
        if (mimeType === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Apply transforms (rotate, flip, scale)
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (rotate !== 0) {
          ctx.rotate((rotate * Math.PI) / 180);
        }

        if (flipH || flipV) {
          ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        }

        const drawW = isRotated90 ? canvas.height : canvas.width;
        const drawH = isRotated90 ? canvas.width : canvas.height;

        ctx.drawImage(
          img,
          srcX,
          srcY,
          srcW,
          srcH,
          -drawW / 2,
          -drawH / 2,
          drawW,
          drawH
        );

        ctx.restore();

        // Convert canvas to Blob
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(origUrl);
            if (!blob) {
              reject(new Error('Canvas blob generation failed'));
              return;
            }
            const processedUrl = URL.createObjectURL(blob);
            const ext = getExtensionFromMime(mimeType);
            const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
            const newFilename = `${baseName}_processed.${ext}`;

            resolve({
              blob,
              url: processedUrl,
              width: canvas.width,
              height: canvas.height,
              filename: newFilename,
            });
          },
          mimeType,
          quality
        );
      } catch (err) {
        URL.revokeObjectURL(origUrl);
        reject(err);
      }
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(origUrl);
      reject(err);
    };

    img.src = origUrl;
  });
}

/**
 * Creates a downloadable ZIP containing multiple processed image files
 */
export async function createBatchZip(
  images: { filename: string; blob: Blob }[]
): Promise<Blob> {
  const zip = new JSZip();
  images.forEach((img, index) => {
    // Avoid duplicate names in zip
    const uniqueName = img.filename || `image_${index + 1}.jpg`;
    zip.file(uniqueName, img.blob);
  });
  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Helper to download a single file directly in the browser
 */
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
