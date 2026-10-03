import { Metadata } from 'next';
import { QRGenerator } from '@/components/generator/qr-generator';

export const metadata: Metadata = {
  title: 'QR Code Generator — Dr.QR',
  description: 'Create custom QR codes for URLs, Wi-Fi passwords, emails, and plain text instantly.',
};

export default function GeneratePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Generate QR Code</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Choose a content type, enter your details, and download your QR code in vector SVG or PNG format.
        </p>
      </div>

      <QRGenerator />
    </div>
  );
}