'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { QrCode, Scan, Image, Shield, Code, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileNavigation } from './mobile-navigation';

export const NAV_ITEMS = [
  { href: '/generate', label: 'Generate', icon: QrCode },
  { href: '/scan', label: 'Scan', icon: Scan },
  { href: '/read-image', label: 'Read Image', icon: Image },
  { href: '/privacy', label: 'Privacy', icon: Shield },
];

export const DEV_LINK = {
  href: 'https://biruktafese-dev.vercel.app/',
  label: 'Developer',
  supportLabel: 'Support Dev',
  icon: Code,
};

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-bold text-black">
            <QrCode className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Dr.QR</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                  isActive
                    ? 'bg-neutral-800 font-semibold text-white'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Developer Link / Support Dev CTA */}
          <a
            href={DEV_LINK.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:border-emerald-400 hover:bg-emerald-900/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Heart className="h-3.5 w-3.5 fill-emerald-400/20 text-emerald-400" />
            <span>{DEV_LINK.supportLabel}</span>
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden">
          <MobileNavigation items={NAV_ITEMS} devLink={DEV_LINK} />
        </div>
      </div>
    </header>
  );
}