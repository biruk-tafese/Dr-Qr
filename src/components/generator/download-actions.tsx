'use client';

import { Download, FileImage, FileCode } from 'lucide-react';
import { downloadDataUrl, downloadSvgString } from '@/lib/qr/download';

interface DownloadActionsProps {
  dataUrl: string;
  svgContent: string;
  filename?: string;
}

export function DownloadActions({
  dataUrl,
  svgContent,
  filename = 'drqr-code',
}: DownloadActionsProps) {
  const isReady = Boolean(dataUrl && svgContent);

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <button
        type="button"
        disabled={!isReady}
        onClick={() => downloadDataUrl(dataUrl, `${filename}.png`)}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        <FileImage className="h-4 w-4" />
        <span>Download PNG</span>
      </button>

      <button
        type="button"
        disabled={!isReady}
        onClick={() => downloadSvgString(svgContent, `${filename}.svg`)}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm font-bold text-white hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        <FileCode className="h-4 w-4" />
        <span>Download SVG</span>
      </button>
    </div>
  );
}