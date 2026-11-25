'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/formatters';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: isHome ? '#beranda' : '/', label: 'Beranda' },
    { href: isHome ? '#tentang' : '/tentang', label: 'Tentang Kami' },
    { href: isHome ? '#tema' : '/themes', label: 'Pilihan Tema' },
    { href: isHome ? '#cara-pesan' : '/#cara-pesan', label: 'Cara Pemesanan' },
    { href: isHome ? '#faq' : '/#faq', label: 'FAQ' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled || !isHome
          ? 'border-b border-[#E8DFD0]/80 bg-[#FAF8F4]/95 backdrop-blur-md shadow-sm'
          : 'border-b border-transparent bg-[#FAF8F4]/70 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex h-16 sm:h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#302D29] group-hover:text-[#B69A72] transition-colors">
            MAZÉLIA
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#9B9185] -mt-0.5 font-medium">
            Events • Moments • Memories
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Navigasi Utama">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'text-xs xl:text-sm font-medium transition-colors hover:text-[#B69A72]',
                pathname === link.href ? 'text-[#B69A72] font-semibold' : 'text-[#554F47]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Order CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link href="/kontak">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#B69A72] hover:bg-[#846B48] text-white shadow-[0_8px_20px_-6px_rgba(182,154,114,0.5)] px-5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pesan Undangan</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/kontak"
            className="px-3 py-1.5 rounded-full bg-[#B69A72] text-white text-[11px] font-semibold shadow-sm"
          >
            Pesan
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#302D29] hover:text-[#B69A72] focus:outline-none rounded-lg"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-[#E8DFD0] bg-[#FAF8F4] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-[#B69A72]/15 text-[#846B48] font-semibold'
                    : 'text-[#302D29] hover:bg-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E8DFD0] flex flex-col space-y-2">
            <Link href="/kontak" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full justify-center bg-[#B69A72] hover:bg-[#846B48] text-white">
                Pesan Undangan Sekarang
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
