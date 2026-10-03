import Link from 'next/link';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-black py-8 text-sm text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
        
        {/* Privacy Assertion Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs text-neutral-300 sm:text-sm">
          <div className="flex items-center gap-1.5 font-medium text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Client-Side Processing</span>
          </div>
          <span className="hidden text-neutral-700 sm:inline">|</span>
          <span className="text-neutral-400">Zero data or images sent to servers</span>
        </div>

        {/* Footer Navigation & Developer Support Link */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/generate" className="transition-colors hover:text-white">
            Generator
          </Link>
          <Link href="/scan" className="transition-colors hover:text-white">
            Scanner
          </Link>
          <Link href="/read-image" className="transition-colors hover:text-white">
            Read Image
          </Link>
          
          <a
            href="https://biruktafese-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 transition-colors hover:text-emerald-300 font-medium"
          >
            <Heart className="h-3.5 w-3.5 fill-emerald-400/20" />
            <span>Developer</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}