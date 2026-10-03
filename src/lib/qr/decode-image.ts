import jsQR from 'jsqr';
import { QRScanResult } from '@/types/qr';

/**
 * Reads an image File from disk/memory and decodes any embedded QR payload using 2D Canvas.
 */
export async function decodeQRFromImageFile(file: File): Promise<QRScanResult> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file must be a valid image format (PNG, JPEG, WebP, SVG).'));
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file from local storage.'));
    reader.onload = () => {
      const img = new Image();

      img.onerror = () => reject(new Error('Unable to parse image data. File may be corrupted.'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Could not initialize 2D Rendering Context for decoding.'));
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (!code) {
          return reject(
            new Error('No readable QR code found. Ensure the image is clear and well-lit.')
          );
        }

        resolve({
          rawText: code.data,
          format: 'QR_CODE',
          scannedAt: new Date().toISOString(),
        });
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}