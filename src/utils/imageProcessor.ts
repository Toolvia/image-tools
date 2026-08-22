import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import heic2any from 'heic2any';
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

/**
 * Normalizes input files, converting HEIC/HEIF files to standard JPEG Blobs if needed.
 */
export async function normalizeImageFile(file: File): Promise<File | Blob> {
  const ext = getFileExtension(file.name);
  if (ext === 'heic' || ext === 'heif' || file.type === 'image/heic' || file.type === 'image/heif') {
    try {
      const conversionResult = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.95,
      });
      const blob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
      return new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' });
    } catch {
      // Fallback: return original file
      return file;
    }
  }
  return file;
}

export async function getImageDimensions(file: File | Blob): Promise<{ width: number; height: number; url: string }> {
  const normalized = await normalizeImageFile(file as File);
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(normalized);
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
 * Creates a valid multi-resolution ICO binary (16x16, 32x32, 48x48) from a canvas
 */
async function canvasToIcoBlob(sourceCanvas: HTMLCanvasElement): Promise<Blob> {
  const sizes = [16, 32, 48];
  const pngBlobs: { size: number; buffer: ArrayBuffer }[] = [];

  for (const size of sizes) {
    const iconCanvas = document.createElement('canvas');
    iconCanvas.width = size;
    iconCanvas.height = size;
    const ctx = iconCanvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(sourceCanvas, 0, 0, size, size);
      const blob = await new Promise<Blob | null>((res) => iconCanvas.toBlob(res, 'image/png'));
      if (blob) {
        const buffer = await blob.arrayBuffer();
        pngBlobs.push({ size, buffer });
      }
    }
  }

  if (pngBlobs.length === 0) {
    return new Promise((res, rej) => sourceCanvas.toBlob((b) => (b ? res(b) : rej()), 'image/png'));
  }

  // Build ICO Header and Directory
  const count = pngBlobs.length;
  let offset = 6 + count * 16;
  const totalSize = offset + pngBlobs.reduce((acc, curr) => acc + curr.buffer.byteLength, 0);
  const icoBuffer = new ArrayBuffer(totalSize);
  const view = new DataView(icoBuffer);

  // ICONHEADER
  view.setUint16(0, 0, true); // Reserved
  view.setUint16(2, 1, true); // Type (1 for ICO)
  view.setUint16(4, count, true); // Number of images

  // ICONDIRENTRY
  let currentOffset = offset;
  pngBlobs.forEach((item, index) => {
    const entryOffset = 6 + index * 16;
    view.setUint8(entryOffset, item.size === 256 ? 0 : item.size); // Width
    view.setUint8(entryOffset + 1, item.size === 256 ? 0 : item.size); // Height
    view.setUint8(entryOffset + 2, 0); // Color count
    view.setUint8(entryOffset + 3, 0); // Reserved
    view.setUint16(entryOffset + 4, 1, true); // Color planes
    view.setUint16(entryOffset + 6, 32, true); // Bits per pixel
    view.setUint32(entryOffset + 8, item.buffer.byteLength, true); // Size of image data
    view.setUint32(entryOffset + 12, currentOffset, true); // Offset of image data

    new Uint8Array(icoBuffer, currentOffset, item.buffer.byteLength).set(new Uint8Array(item.buffer));
    currentOffset += item.buffer.byteLength;
  });

  return new Blob([icoBuffer], { type: 'image/x-icon' });
}

/**
 * Process single image with options: quality, target format, resize dimensions, crop bounds, rotation, flips, filters
 */
export async function processImage({
  file,
  targetFormat,
  quality = 0.85,
  width,
  height,
  crop,
  rotate = 0,
  flipH = false,
  flipV = false,
  filter = 'none',
  circleCrop = false,
  targetKB,
  stripMetadata = true,
}: {
  file: File;
  targetFormat?: string; // 'jpg' | 'png' | 'webp' | 'ico' | 'bmp' | 'pdf' | 'svg' | 'base64'
  quality?: number; // 0.1 - 1.0
  width?: number;
  height?: number;
  crop?: CropRect;
  rotate?: number; // degrees 0, 90, 180, 270
  flipH?: boolean;
  flipV?: boolean;
  filter?: 'none' | 'grayscale' | 'invert' | 'sepia';
  circleCrop?: boolean;
  targetKB?: number;
  stripMetadata?: boolean;
}): Promise<{ blob: Blob; url: string; width: number; height: number; filename: string; base64String?: string }> {
  const normalizedFile = await normalizeImageFile(file);
  const { width: origW, height: origH, url: origUrl } = await getImageDimensions(normalizedFile);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('Could not get canvas 2d context');

        // Determine working source area
        const srcX = crop ? crop.x : 0;
        const srcY = crop ? crop.y : 0;
        const srcW = crop ? crop.width : origW;
        const srcH = crop ? crop.height : origH;

        // Determine destination dimensions
        const destW = width || srcW;
        const destH = height || srcH;

        const normalizedRotate = ((rotate % 360) + 360) % 360;
        const isRotated90 = normalizedRotate === 90 || normalizedRotate === 270;

        if (isRotated90) {
          canvas.width = destH;
          canvas.height = destW;
        } else {
          canvas.width = destW;
          canvas.height = destH;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const rawFormat = (targetFormat || getFileExtension(file.name)).toLowerCase();

        // Background fill for JPG transparency
        const mimeType = getMimeType(rawFormat);
        if (mimeType === 'image/jpeg' && !circleCrop) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Apply visual CSS-like canvas filters
        if (filter === 'grayscale') {
          ctx.filter = 'grayscale(100%)';
        } else if (filter === 'invert') {
          ctx.filter = 'invert(100%)';
        } else if (filter === 'sepia') {
          ctx.filter = 'sepia(100%)';
        }

        // Apply Circle Mask for Circle Crop
        if (circleCrop) {
          ctx.save();
          ctx.beginPath();
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const radius = Math.min(centerX, centerY);
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
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
        if (circleCrop) {
          ctx.restore();
        }

        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        // 1. SPECIAL CASE: ICO (Favicon)
        if (rawFormat === 'ico') {
          const icoBlob = await canvasToIcoBlob(canvas);
          const processedUrl = URL.createObjectURL(icoBlob);
          URL.revokeObjectURL(origUrl);
          resolve({
            blob: icoBlob,
            url: processedUrl,
            width: canvas.width,
            height: canvas.height,
            filename: `${baseName}_favicon.ico`,
          });
          return;
        }

        // 2. SPECIAL CASE: PDF Export
        if (rawFormat === 'pdf') {
          const pdf = new jsPDF({
            orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height],
          });
          const imgData = canvas.toDataURL('image/jpeg', 0.92);
          pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
          const pdfBlob = pdf.output('blob');
          const processedUrl = URL.createObjectURL(pdfBlob);
          URL.revokeObjectURL(origUrl);
          resolve({
            blob: pdfBlob,
            url: processedUrl,
            width: canvas.width,
            height: canvas.height,
            filename: `${baseName}.pdf`,
          });
          return;
        }

        // 3. SPECIAL CASE: SVG Export (Vector container with high-res base64 bitmap)
        if (rawFormat === 'svg') {
          const dataUrl = canvas.toDataURL('image/png');
          const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image width="${canvas.width}" height="${canvas.height}" xlink:href="${dataUrl}"/>
</svg>`;
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
          const processedUrl = URL.createObjectURL(svgBlob);
          URL.revokeObjectURL(origUrl);
          resolve({
            blob: svgBlob,
            url: processedUrl,
            width: canvas.width,
            height: canvas.height,
            filename: `${baseName}.svg`,
          });
          return;
        }

        // 4. SPECIAL CASE: Base64 Export
        if (rawFormat === 'base64') {
          const dataUrl = canvas.toDataURL(mimeType === 'image/jpeg' ? 'image/jpeg' : 'image/png', quality);
          const base64Blob = new Blob([dataUrl], { type: 'text/plain;charset=utf-8' });
          const processedUrl = URL.createObjectURL(base64Blob);
          URL.revokeObjectURL(origUrl);
          resolve({
            blob: base64Blob,
            url: processedUrl,
            width: canvas.width,
            height: canvas.height,
            filename: `${baseName}_base64.txt`,
            base64String: dataUrl,
          });
          return;
        }

        // 5. TARGET KB COMPRESSION (Binary search optimization for exact KB constraints)
        if (targetKB && targetKB > 0 && (mimeType === 'image/jpeg' || mimeType === 'image/webp')) {
          let low = 0.05;
          let high = 0.98;
          let bestBlob: Blob | null = null;
          const targetBytes = targetKB * 1024;

          for (let iter = 0; iter < 7; iter++) {
            const mid = (low + high) / 2;
            const testBlob = await new Promise<Blob | null>((res) => canvas.toBlob(res, mimeType, mid));
            if (!testBlob) break;

            if (testBlob.size <= targetBytes) {
              bestBlob = testBlob;
              low = mid; // Try for better quality
            } else {
              high = mid; // Needs more compression
            }
          }

          if (!bestBlob) {
            bestBlob = await new Promise<Blob | null>((res) => canvas.toBlob(res, mimeType, 0.05));
          }

          if (bestBlob) {
            URL.revokeObjectURL(origUrl);
            const processedUrl = URL.createObjectURL(bestBlob);
            const ext = getExtensionFromMime(mimeType);
            resolve({
              blob: bestBlob,
              url: processedUrl,
              width: canvas.width,
              height: canvas.height,
              filename: `${baseName}_${targetKB}KB.${ext}`,
            });
            return;
          }
        }

        // 6. STANDARD BLOB CONVERSION (JPG, PNG, WEBP, BMP)
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(origUrl);
            if (!blob) {
              reject(new Error('Canvas blob generation failed'));
              return;
            }
            const processedUrl = URL.createObjectURL(blob);
            const ext = getExtensionFromMime(mimeType);
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
 * Converts multiple image files into a single combined multi-page PDF document
 */
export async function imagesToMultiPagePdf(
  files: File[]
): Promise<Blob> {
  if (files.length === 0) throw new Error('No files provided');
  const pdf = new jsPDF();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { width, height, url } = await getImageDimensions(file);
    const orientation = width > height ? 'l' : 'p';

    if (i > 0) {
      pdf.addPage([width, height], orientation);
    } else {
      pdf.deletePage(1);
      pdf.addPage([width, height], orientation);
    }

    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
      img.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
    }
    URL.revokeObjectURL(url);
  }

  return pdf.output('blob');
}

/**
 * Creates a downloadable ZIP containing multiple processed image files
 */
export async function createBatchZip(
  images: { filename: string; blob: Blob }[]
): Promise<Blob> {
  const zip = new JSZip();
  images.forEach((img, index) => {
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
