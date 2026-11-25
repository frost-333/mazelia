import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomeHeroAndTrust } from '@/components/modules/home/HomeHeroAndTrust';
import { HomeThemesAndShowcase } from '@/components/modules/home/HomeThemesAndShowcase';
import { HomeOrderFeaturesPricing } from '@/components/modules/home/HomeOrderFeaturesPricing';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MAZÉLIA — Undangan Digital Premium | Events • Moments • Memories',
  description:
    'Platform dan agensi undangan digital elegan untuk pernikahan, pertunangan, dan acara keluarga di Indonesia. Pilih desain favoritmu, sesuaikan detail acara, dan bagikan dengan mudah.',
  openGraph: {
    title: 'MAZÉLIA — Undangan Digital Premium',
    description:
      'Setiap Momen Istimewa, Layak Diabadikan dengan Cara yang Istimewa. Events • Moments • Memories.',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#302D29] pb-16 lg:pb-0">
      <Navbar />

      <main className="flex-1">
        <HomeHeroAndTrust />
        <HomeThemesAndShowcase />
        <HomeOrderFeaturesPricing />
      </main>

      <Footer />

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-[#FAF8F4]/95 backdrop-blur-md border-t border-[#E8DFD0] px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <a
          href="#tema"
          className="flex-1 py-2.5 rounded-full border border-[#E8DFD0] bg-white text-center text-xs font-semibold text-[#302D29]"
        >
          Lihat Tema
        </a>
        <Link
          href="/kontak"
          className="flex-1 py-2.5 rounded-full bg-[#B69A72] text-white text-center text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pesan Undangan</span>
        </Link>
      </div>
    </div>
  );
}
