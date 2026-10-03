'use client';

import { Link as LinkIcon, FileText, Wifi, Mail, Phone } from 'lucide-react';
import { QRType } from '@/types/qr';
import { cn } from '@/lib/utils';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

const TYPES: { id: QRType; label: string; icon: typeof LinkIcon }[] = [
  { id: 'url', label: 'URL / Link', icon: LinkIcon },
  { id: 'text', label: 'Plain Text', icon: FileText },
  { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone Number', icon: Phone },
];

export function QRTypeSelector({ selectedType, onSelectType }: QRTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 rounded-xl bg-neutral-900 p-1.5 border border-neutral-800">
      {TYPES.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;

        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelectType(type.id)}
            className={cn(
              'flex flex-1 min-w-[120px] items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
              isSelected
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}