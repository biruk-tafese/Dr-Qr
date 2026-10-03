'use client';

import Image from 'next/image';
import { QrCode, Loader2 } from 'lucide-react';

interface QRPreviewProps {
  dataUrl: string;
  isGenerating: boolean;
  error: string | null;
}

export function QRPreview({ dataUrl, isGenerating, error }: QRPreviewProps) {
  if (error) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-rose-900/50 bg-rose-950/20 p-6 text-center">
        <p className="text-sm font-medium text-rose-400">{error}</p>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400 mb-2" />
        <p className="text-xs text-neutral-400">Generating code...</p>
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/20 p-6 text-center">
        <QrCode className="h-10 w-10 text-neutral-600 mb-3" />
        <p className="text-sm font-medium text-neutral-400">Your QR code will appear here</p>
        <p className="text-xs text-neutral-600 mt-1">Enter details on the left to start</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-white p-6 shadow-2xl">
      <div className="relative h-64 w-64">
        <Image
          src={dataUrl}
          alt="Generated QR code preview"
          fill
          unoptimized
          className="object-contain"
        />
      </div>
    </div>
  );
}