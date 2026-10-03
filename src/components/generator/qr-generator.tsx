'use client';

import { useState } from 'react';
import { QRType } from '@/types/qr';
import { useQRGenerator } from '@/hooks/use-qr-generator';
import { QRTypeSelector } from './qr-type-selector';
import { GeneratorForm } from './generator-form';
import { QRPreview } from './qr-preview';
import { DownloadActions } from './download-actions';

export function QRGenerator() {
  const [type, setType] = useState<QRType>('url');
  const [payload, setPayload] = useState<string>('');

  const { dataUrl, svgContent, isGenerating, error } = useQRGenerator(payload);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
      {/* Inputs Column */}
      <div className="space-y-6 lg:col-span-7">
        <QRTypeSelector selectedType={type} onSelectType={setType} />
        <GeneratorForm type={type} onPayloadChange={setPayload} />
      </div>

      {/* Output & Download Column */}
      <div className="flex flex-col items-center space-y-6 lg:col-span-5">
        <QRPreview dataUrl={dataUrl} isGenerating={isGenerating} error={error} />
        <DownloadActions dataUrl={dataUrl} svgContent={svgContent} filename={`drqr-${type}`} />
      </div>
    </div>
  );
}