'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LucideIcon, Heart, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DevLinkItem {
  href: string;
  label: string;
  supportLabel: string;
  icon: LucideIcon;
}

interface MobileNavigationProps {
  items: NavItem[];
  devLink: DevLinkItem;
}

export function MobileNavigation({ items, devLink }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer automatically on route transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 z-50 flex h-[calc(100dvh-4rem)] flex-col justify-between overflow-y-auto border-t border-neutral-800 bg-black/95 px-6 py-6 backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex min-h-[48px] items-center gap-3.5 rounded-xl px-4 text-base font-medium transition-colors',
                    isActive
                      ? 'bg-neutral-800 font-semibold text-white'
                      : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Developer Callout Card */}
          <div className="mt-8 border-t border-neutral-800 pt-6">
            <a
              href={devLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 transition-colors hover:bg-emerald-950/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Heart className="h-5 w-5 fill-emerald-400/20" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{devLink.supportLabel}</p>
                  <p className="text-xs text-neutral-400">Visit Developer Portfolio</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-neutral-400" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}