'use client';

import * as React from 'react';
import Link from 'next/link';
import { Eye, Check, ArrowRight, Calendar, MapPin, Image as ImageIcon, MessageSquareHeart, MailOpen } from 'lucide-react';
import { WEDDING_THEMES, WeddingThemeId } from '@/lib/constants/themes';
import { InvitationMockupCard } from './InvitationMockupCard';

export function HomeThemesAndShowcase() {
  const themes = Object.values(WEDDING_THEMES);
  const [showcaseTab, setShowcaseTab] = React.useState<'cover' | 'acara' | 'galeri' | 'rsvp'>('cover');
  const [showcaseTheme, setShowcaseTheme] = React.useState<WeddingThemeId>('champagne_gold');
  const activeShowcase = WEDDING_THEMES[showcaseTheme];

  return (
    <>
      {/* SECTION 04 — FEATURED INVITATION THEMES */}
      <section id="tema" className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
              Koleksi Tema Eksklusif
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#302D29]">
              Temukan Desain yang Mewakili Ceritamu.
            </h2>
            <p className="text-sm text-[#6E675F] leading-relaxed">
              Setiap momen memiliki cerita. Temukan desain undangan yang paling menggambarkan kepribadian dan suasana acaramu.
            </p>
          </div>

          {/* Editorial Theme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {themes.map((thm) => (
              <div
                key={thm.id}
                className="group rounded-3xl border border-[#E8DFD0] bg-white overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Large Visual Preview */}
                <div
                  className="p-6 pb-4 relative overflow-hidden border-b border-[#E8DFD0]/70"
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

                  <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                    <InvitationMockupCard theme={thm} compact className="shadow-md" />
                  </div>
                </div>

                {/* Theme Info & Actions */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl font-bold text-[#302D29]">
                      {thm.name}
                    </h3>
                    <p className="text-xs text-[#6E675F] leading-relaxed">
                      {thm.subtitle}
                    </p>
                    <p className="text-[11px] text-[#846B48] font-medium pt-1">
                      Animasi Pembuka: {thm.openingLabel}
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

          <div className="text-center pt-2">
            <Link
              href="/themes"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#B69A72] bg-white hover:bg-[#B69A72] text-[#846B48] hover:text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <span>Lihat Semua Tema</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 07 — LIVE INVITATION SHOWCASE */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#E8DFD0]/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy & Interactive Controls */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
                Pratinjau Produk Nyata
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#302D29]">
                Lihat Langsung Keindahan Undangan MAZÉLIA.
              </h2>
              <p className="text-sm text-[#6E675F] leading-relaxed">
                Rasakan pengalaman membuka undangan digital sebelum Anda memesan. Coba ganti tampilan bagian dan tema di bawah ini, atau buka contoh undangan lengkapnya secara langsung tanpa perlu login.
              </p>

              {/* Section Tabs */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9185] block">
                  Simulasi Tampilan Bagian:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cover', label: 'Opening Cover', icon: MailOpen },
                    { id: 'acara', label: 'Detail Acara', icon: Calendar },
                    { id: 'galeri', label: 'Galeri Foto', icon: ImageIcon },
                    { id: 'rsvp', label: 'RSVP & Doa', icon: MessageSquareHeart },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = showcaseTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setShowcaseTab(tab.id as any)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          active
                            ? 'bg-[#B69A72] text-white border-[#B69A72] shadow-sm'
                            : 'bg-[#FAF8F4] text-[#554F47] border-[#E8DFD0] hover:border-[#B69A72]/50'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme Switcher */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9185] block">
                  Ganti Nuansa Tema:
                </span>
                <div className="flex flex-wrap gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setShowcaseTheme(t.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        showcaseTheme === t.id
                          ? 'bg-[#302D29] text-white border-[#302D29]'
                          : 'bg-white text-[#554F47] border-[#E8DFD0] hover:border-[#B69A72]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/15"
                        style={{ backgroundColor: t.swatch[0] }}
                      />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/fadhil-mazaya?preview=true&previewTheme=${showcaseTheme}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#302D29] hover:bg-[#1F1C18] text-white text-sm font-semibold shadow-luxury transition-all"
                >
                  <Eye className="w-4 h-4 text-[#C5A46D]" />
                  <span>Lihat Contoh Undangan</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive Smartphone Showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[330px] rounded-[42px] bg-[#1F1C18] p-3 shadow-[0_30px_65px_-15px_rgba(48,45,41,0.35)] border border-[#B69A72]/30">
                <div className="mx-auto w-24 h-4 bg-[#1F1C18] rounded-b-xl mb-1.5 flex items-center justify-center">
                  <div className="w-10 h-1 rounded-full bg-white/15" />
                </div>

                <div
                  className="rounded-[30px] overflow-hidden min-h-[430px] flex flex-col justify-between transition-colors duration-300 border"
                  style={{
                    backgroundColor: activeShowcase.colors.bgSection,
                    borderColor: `${activeShowcase.colors.borderAccent}50`,
                  }}
                >
                  {showcaseTab === 'cover' && <InvitationMockupCard theme={activeShowcase} />}

                  {showcaseTab === 'acara' && (
                    <div className="p-6 space-y-5 text-center my-auto">
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] font-semibold block"
                        style={{ color: activeShowcase.colors.accentDark }}
                      >
                        Rangkaian Acara
                      </span>
                      <div
                        className="p-5 rounded-2xl border space-y-2.5"
                        style={{
                          backgroundColor: activeShowcase.colors.bgCard,
                          borderColor: activeShowcase.colors.border,
                        }}
                      >
                        <Calendar className="w-5 h-5 mx-auto" style={{ color: activeShowcase.colors.accent }} />
                        <h4 className="font-serif text-lg font-bold" style={{ color: activeShowcase.colors.textTitle }}>
                          Akad Nikah &amp; Resepsi
                        </h4>
                        <p className="text-xs font-medium" style={{ color: activeShowcase.colors.textBody }}>
                          Sabtu, 8 Januari 2027 • 09.00 WIB
                        </p>
                        <p className="text-[11px]" style={{ color: activeShowcase.colors.textMuted }}>
                          Plataran Dharmawangsa, Jakarta Selatan
                        </p>
                        <div
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-semibold border mt-1"
                          style={{
                            borderColor: activeShowcase.colors.borderAccent,
                            color: activeShowcase.colors.accentDark,
                          }}
                        >
                          <MapPin className="w-3 h-3" />
                          <span>Buka Google Maps</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {showcaseTab === 'galeri' && (
                    <div className="p-6 space-y-4 text-center my-auto">
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] font-semibold block"
                        style={{ color: activeShowcase.colors.accentDark }}
                      >
                        Galeri Momen
                      </span>
                      <h4 className="font-serif text-lg font-bold" style={{ color: activeShowcase.colors.textTitle }}>
                        Potret Kebahagiaan
                      </h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=75',
                          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=75',
                          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=75',
                          'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=400&q=75',
                        ].map((src, i) => (
                          <div
                            key={i}
                            className="aspect-square rounded-xl overflow-hidden border"
                            style={{ borderColor: activeShowcase.colors.border }}
                          >
                            <img src={src} alt="Contoh galeri prewedding" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showcaseTab === 'rsvp' && (
                    <div className="p-6 space-y-4 my-auto">
                      <div className="text-center space-y-1">
                        <span
                          className="text-[10px] uppercase tracking-[0.25em] font-semibold block"
                          style={{ color: activeShowcase.colors.accentDark }}
                        >
                          RSVP &amp; Buku Doa
                        </span>
                        <h4 className="font-serif text-lg font-bold" style={{ color: activeShowcase.colors.textTitle }}>
                          Konfirmasi Kehadiran
                        </h4>
                      </div>
                      <div
                        className="p-4 rounded-2xl border space-y-2.5 text-left"
                        style={{
                          backgroundColor: activeShowcase.colors.bgCard,
                          borderColor: activeShowcase.colors.border,
                        }}
                      >
                        <div className="h-7 rounded-lg bg-white border border-black/10 px-2.5 flex items-center text-[10px] text-gray-500">
                          Nama Tamu Undangan
                        </div>
                        <div className="h-7 rounded-lg bg-white border border-black/10 px-2.5 flex items-center text-[10px] text-gray-500">
                          Status: Hadir (2 Pax)
                        </div>
                        <div className="h-14 rounded-lg bg-white border border-black/10 p-2 text-[10px] text-gray-500">
                          Selamat menempuh hidup baru...
                        </div>
                        <div
                          className="py-2 rounded-lg text-center text-[10px] font-semibold"
                          style={{
                            backgroundColor: activeShowcase.colors.buttonBg,
                            color: activeShowcase.colors.buttonText,
                          }}
                        >
                          Kirim Ucapan &amp; Konfirmasi
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
