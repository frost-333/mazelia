import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WEDDING_THEMES } from '@/lib/constants/themes';
import { InvitationMockupCard } from '@/components/modules/home/InvitationMockupCard';
import { Eye, Check, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Koleksi Tema Undangan Digital — MAZÉLIA Agency',
  description: 'Jelajahi lima tema undangan digital eksklusif MAZÉLIA: Champagne Royale, Emerald Botanical, Romantic Rose & Blush, Royal Heritage Nusantara, dan Midnight Celestial Glam.',
};

export default function ThemesCatalogPage() {
  const themes = Object.values(WEDDING_THEMES);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#846B48] hover:text-[#302D29] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>

            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
                Katalog Desain Resmi
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#302D29]">
                Koleksi Tema Undangan Digital MAZÉLIA
              </h1>
              <p className="text-sm text-[#6E675F] leading-relaxed">
                Setiap tema dirancang dengan palet warna, ornamen, latar belakang, serta transisi pembuka yang berbeda. Klik Preview untuk mencoba langsung pengalaman undangan interaktifnya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {themes.map((thm) => (
              <div
                key={thm.id}
                className="group rounded-3xl border border-[#E8DFD0] bg-white overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div
                  className="p-6 pb-4 border-b border-[#E8DFD0]/70"
                  style={{ backgroundColor: `${thm.colors.bgCard}80` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-white border border-[#E8DFD0] text-[10px] font-semibold uppercase tracking-wider text-[#846B48]">
                      {thm.badge}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white border border-[#E8DFD0]">
                      {thm.swatch.map((hex, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>
                  <InvitationMockupCard theme={thm} compact className="shadow-md" />
                </div>

                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h2 className="font-serif text-xl font-bold text-[#302D29]">{thm.name}</h2>
                    <p className="text-xs text-[#6E675F] leading-relaxed">{thm.subtitle}</p>
                    <p className="text-[11px] text-[#846B48] font-medium pt-1">
                      Transisi Pembuka: {thm.openingLabel}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <Link
                      href={`/fadhil-mazaya?preview=true&previewTheme=${thm.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF8F4] hover:bg-[#F2ECE2] text-xs font-semibold text-[#302D29] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#846B48]" />
                      <span>Preview</span>
                    </Link>

                    <Link
                      href={`/kontak?tema=${encodeURIComponent(thm.name)}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#B69A72] hover:bg-[#846B48] text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Pilih Tema</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
