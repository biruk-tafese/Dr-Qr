import { BrowserQRCodeReader } from '@zxing/browser';
import type { DecodeResult } from '@/types/qr';

export interface DecodeImageOptions {
  maxFileSizeBytes?: number;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB limit

/**
 * Decodes QR code content from an uploaded image file using ZXing browser reader.
 */
export async function decodeQRFromImageFile(
  file: File,
  options: DecodeImageOptions = {}
): Promise<DecodeResult> {
  const maxSize = options.maxFileSizeBytes ?? DEFAULT_MAX_SIZE;

  if (file.size > maxSize) {
    throw new Error(`File size exceeds limit of ${Math.round(maxSize / (1024 * 1024))}MB.`);
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Selected file is not a valid image format.');
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const codeReader = new BrowserQRCodeReader();
    const result = await codeReader.decodeFromImageUrl(objectUrl);

    return {
      text: result.getText(),
      format: result.getBarcodeFormat()?.toString() ?? 'QR_CODE',
      timestamp: Date.now(),
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFoundException') {
      throw new Error('No readable QR code found in this image.');
    }
    throw new Error('Could not read or process image file.');
  } finally {
    // Explicitly release blob memory allocations
    URL.revokeObjectURL(objectUrl);
  }
}