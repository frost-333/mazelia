'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/formatters';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/fitur', label: 'Fitur' },
    { href: '/tentang', label: 'Tentang' },
    { href: '/pricing', label: 'Paket & Harga' },
    { href: '/kontak', label: 'Kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-mazelia-border/60 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-serif text-2xl font-bold tracking-wider text-mazelia-charcoal group-hover:text-mazelia-gold transition-colors">
            MAZÉLIA
          </span>
          <span className="text-[10px] uppercase tracking-widest text-mazelia-taupe -mt-1 font-medium">
            Events • Moments • Memories
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-mazelia-gold',
                pathname === link.href ? 'text-mazelia-gold font-semibold' : 'text-mazelia-charcoal-light'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth CTAs */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm" className="shadow-luxury-gold">
              <Sparkles className="w-3.5 h-3.5" />
              Mulai Rencanakan
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-mazelia-charcoal hover:text-mazelia-gold focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-mazelia-border bg-white px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'px-3 py-2 rounded-lg text-base font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-mazelia-gold-50 text-mazelia-gold font-semibold'
                    : 'text-mazelia-charcoal hover:bg-mazelia-ivory'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-mazelia-border/60 flex flex-col space-y-2">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Masuk ke Akun
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Daftar Gratis
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
