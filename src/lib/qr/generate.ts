import QRCode from 'qrcode';
import { QROptions } from '@/types/qr';

const DEFAULT_OPTIONS: QROptions = {
  width: 300,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#ffffff',
  },
  errorCorrectionLevel: 'M',
};

/**
  * Generates a PNG Data URL string for image elements.
  */
export async function generateQRDataUrl(text: string, options?: QROptions): Promise<string> {
  if (!text) return '';
  
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  return QRCode.toDataURL(text, {
    width: mergedOptions.width,
    margin: mergedOptions.margin,
    color: mergedOptions.color,
    errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
  });
}

/**
  * Generates a raw SVG string for crisp vector previews and downloads.
  */
export async function generateQRSvg(text: string, options?: QROptions): Promise<string> {
  if (!text) return '';

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  return QRCode.toString(text, {
    type: 'svg',
    width: mergedOptions.width,
    margin: mergedOptions.margin,
    color: mergedOptions.color,
    errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
  });
}