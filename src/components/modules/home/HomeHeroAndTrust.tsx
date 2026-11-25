'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Share2, Clock, HeartHandshake, Palette } from 'lucide-react';
import { WEDDING_THEMES, WeddingThemeId } from '@/lib/constants/themes';
import { InvitationMockupCard } from './InvitationMockupCard';

export function HomeHeroAndTrust() {
  const themeList = Object.values(WEDDING_THEMES);
  const [activeHeroTheme, setActiveHeroTheme] = React.useState<WeddingThemeId>('champagne_gold');
  const currentTheme = WEDDING_THEMES[activeHeroTheme];

  const benefits = [
    {
      icon: Palette,
      title: 'Desain Elegan',
      desc: 'Pilihan desain eksklusif yang dibuat untuk memperindah setiap momen istimewa.',
    },
    {
      icon: Share2,
      title: 'Mudah Dibagikan',
      desc: 'Cukup satu link, undangan bisa dibagikan melalui WhatsApp dan media sosial.',
    },
    {
      icon: Clock,
      title: 'Praktis dan Fleksibel',
      desc: 'Tidak perlu mencetak atau mengirim undangan satu per satu.',
    },
    {
      icon: HeartHandshake,
      title: 'Lebih Berkesan',
      desc: 'Hadirkan foto, cerita, lokasi acara, countdown, dan berbagai detail dalam satu undangan.',
    },
  ];

  return (
    <>
      {/* SECTION 02 — HERO SECTION */}
      <section
        id="beranda"
        className="relative overflow-hidden bg-[#FAF8F4] pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
      >
        {/* Soft Luxury Background Gradients */}
        <div
          className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full blur-3xl opacity-35 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #E8DFD0 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/6 w-[440px] h-[440px] rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(182,154,114,0.35) 0%, transparent 70%)' }}
        />

        {/* Subtle Decorative Dots */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#B69A72 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copywriting */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8DFD0] shadow-sm text-[11px] font-semibold uppercase tracking-[0.2em] text-[#846B48]">
                <Sparkles className="w-3.5 h-3.5 text-[#B69A72]" />
                <span>MAZÉLIA Digital Invitation Studio</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl xl:text-[54px] font-normal leading-[1.16] tracking-tight text-[#302D29]">
                Setiap Momen Istimewa, Layak Diabadikan dengan Cara yang Istimewa.
              </h1>

              <p className="text-sm sm:text-base text-[#554F47] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Rayakan momen berharga dengan undangan digital elegan dari MAZÉLIA. Pilih desain favoritmu, sesuaikan detail acara, dan bagikan undangan dengan mudah kepada orang-orang tersayang.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#tema"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#B69A72] hover:bg-[#846B48] text-white text-sm font-semibold shadow-[0_12px_28px_-8px_rgba(182,154,114,0.6)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Lihat Koleksi Undangan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#cara-pesan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#F5EFE6] border border-[#E8DFD0] text-[#302D29] text-sm font-semibold transition-all"
                >
                  <span>Bagaimana Cara Pesan?</span>
                </a>
              </div>

              {/* Supporting Text */}
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-[#846B48] pt-1">
                Praktis • Elegan • Mudah Dibagikan
              </p>

              {/* Quick Theme Preview Switcher */}
              <div className="pt-4 border-t border-[#E8DFD0]/80 space-y-2.5">
                <span className="text-[11px] text-[#9B9185] font-medium block">
                  Coba klik tema di bawah untuk melihat tampilan mockup:
                </span>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {themeList.map((thm) => {
                    const active = thm.id === activeHeroTheme;
                    return (
                      <button
                        key={thm.id}
                        type="button"
                        onClick={() => setActiveHeroTheme(thm.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          active
                            ? 'bg-[#302D29] text-white border-[#302D29] shadow-sm'
                            : 'bg-white text-[#554F47] border-[#E8DFD0] hover:border-[#B69A72]'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/15"
                          style={{ backgroundColor: thm.swatch[0] }}
                        />
                        <span>{thm.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Visual Composition: Floating Smartphone & Secondary Theme Cards */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[430px] sm:min-h-[490px]">
              {/* Left Floating Secondary Card */}
              <div className="hidden sm:block absolute left-0 xl:-left-4 top-10 w-48 opacity-90 -rotate-6 animate-float-gentle shadow-xl rounded-[28px]" style={{ animationDuration: '7s' }}>
                <InvitationMockupCard theme={WEDDING_THEMES.romantic_rose} compact />
              </div>

              {/* Right Floating Secondary Card */}
              <div className="hidden sm:block absolute right-0 xl:-right-4 bottom-8 w-48 opacity-90 rotate-6 animate-float-gentle shadow-xl rounded-[28px]" style={{ animationDuration: '8s', animationDelay: '1.5s' }}>
                <InvitationMockupCard theme={WEDDING_THEMES.midnight_celestial} compact />
              </div>

              {/* Main Center Smartphone Mockup */}
              <div className="relative z-10 w-[290px] sm:w-[320px] rounded-[40px] bg-[#1F1C18] p-2.5 shadow-[0_30px_65px_-15px_rgba(48,45,41,0.35)] border border-[#B69A72]/30">
                {/* Notch */}
                <div className="mx-auto w-24 h-4 bg-[#1F1C18] rounded-b-xl mb-1 flex items-center justify-center">
                  <div className="w-10 h-1 rounded-full bg-white/15" />
                </div>

                {/* Screen */}
                <InvitationMockupCard theme={currentTheme} />

                {/* Interactive Preview Caption Bar */}
                <div className="mt-2 px-3 py-1.5 flex items-center justify-between text-[11px] text-[#FAF8F4]">
                  <span className="font-serif truncate">{currentTheme.name}</span>
                  <Link
                    href={`/fadhil-mazaya?preview=true&previewTheme=${currentTheme.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A46D] hover:underline font-semibold shrink-0"
                  >
                    Buka Live →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — TRUST & VALUE PROPOSITION */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#E8DFD0]/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
              Keunggulan Undangan Digital
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#302D29]">
              Undangan Digital, Cara Baru Merayakan Momen Berharga.
            </h2>
            <p className="text-sm text-[#6E675F] leading-relaxed">
              Dirancang agar siapa saja bisa menghadirkan undangan yang rapi, berkelas, dan mudah diakses tamu dari berbagai perangkat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-7 rounded-2xl border border-[#E8DFD0] bg-[#FAF8F4]/70 hover:bg-white hover:border-[#B69A72]/60 hover:shadow-luxury transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E8DFD0] group-hover:border-[#B69A72]/50 flex items-center justify-center text-[#B69A72] shadow-sm transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl font-semibold text-[#302D29]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E675F] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
