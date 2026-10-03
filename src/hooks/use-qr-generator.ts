'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateQRDataUrl, generateQRSvg } from '@/lib/qr/generate';
import { QROptions } from '@/types/qr';

interface UseQRGeneratorReturn {
  dataUrl: string;
  svgContent: string;
  isGenerating: boolean;
  error: string | null;
  regenerate: () => void;
}

export function useQRGenerator(payload: string, options?: QROptions): UseQRGeneratorReturn {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgContent, setSvgContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    if (!payload.trim()) {
      setDataUrl('');
      setSvgContent('');
      setError(null);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const [pngUrl, svg] = await Promise.all([
        generateQRDataUrl(payload, options),
        generateQRSvg(payload, options),
      ]);

      setDataUrl(pngUrl);
      setSvgContent(svg);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code.');
      setDataUrl('');
      setSvgContent('');
    } finally {
      setIsGenerating(false);
    }
  }, [payload, options]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generate();
    }, 150); // 150ms debounce for high-performance live previews

    return () => clearTimeout(timer);
  }, [generate]);

  return {
    dataUrl,
    svgContent,
    isGenerating,
    error,
    regenerate: generate,
  };
}