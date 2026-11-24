'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Calendar,
  CheckSquare,
  Wallet,
  Users,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { formatRupiah } from '@/lib/utils/formatters';

export default function HomePage() {
  // Interactive Simulator state
  const [selectedCategory, setSelectedCategory] = React.useState('Wedding');
  const [guestCount, setGuestCount] = React.useState(250);

  // Dynamic estimate calculation for simulator
  const costPerGuest = selectedCategory === 'Wedding' ? 250000 : selectedCategory === 'Engagement' ? 120000 : 75000;
  const estimatedTotal = guestCount * costPerGuest;

  const faqs = [
    {
      q: 'Apakah MAZÉLIA dapat digunakan secara gratis?',
      a: 'Ya, seluruh modul inti MAZÉLIA (Event Planner, Checklist, Budget Planner, dan Guest Management) dapat digunakan 100% gratis selama masa beta peluncuran ini.',
    },
    {
      q: 'Apakah saya bisa mengelola lebih dari satu acara sekaligus?',
      a: 'Tentu. Anda dapat membuat beberapa acara berbeda (misalnya lamaran di bulan Juli dan resepsi pernikahan di bulan Desember) dan data masing-masing acara terisolasi dengan rapi.',
    },
    {
      q: 'Bagaimana cara membagikan pesan undangan ke WhatsApp?',
      a: 'Pada modul Manajemen Tamu, tersedia tombol satu klik untuk membuka WhatsApp dengan draf pesan sopan yang telah otomatis disesuaikan dengan nama tamu bersangkutan.',
    },
    {
      q: 'Apakah data acara dan daftar kontak tamu saya aman?',
      a: 'Sangat aman. MAZÉLIA mengadopsi Row Level Security (RLS) di tingkat database engine dan mematuhi prinsip UU Perlindungan Data Pribadi (UU PDP No. 27/2022). Pengguna lain tidak memiliki akses apa pun ke data Anda.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-mazelia-ivory selection:bg-mazelia-gold/20 selection:text-mazelia-bronze">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-mazelia-border/60">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,#F4EEE3,transparent)] opacity-70" />
        
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mazelia-gold/40 bg-white/80 shadow-sm text-xs font-semibold text-mazelia-bronze tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-mazelia-gold" />
            Platform Perencanaan Acara Elegan di Indonesia
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-mazelia-charcoal leading-[1.15]">
            Momen Berharga Anda, <br />
            <span className="italic font-normal text-mazelia-gold-dark">Terencana Sempurna.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-lg text-mazelia-taupe-dark leading-relaxed font-normal">
            MAZÉLIA menyatukan persiapan checklist, kalkulasi anggaran presisi, dan manajemen tamu keluarga dalam satu kanvas digital yang tenang, mewah, dan tanpa stres.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-luxury-gold gap-2.5">
                <Sparkles className="w-4 h-4" />
                Mulai Rencanakan Acara Gratis
              </Button>
            </Link>
            <Link href="/fitur" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Pelajari Fitur Platform
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-mazelia-taupe">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-mazelia-gold" /> Data Terisolasi & Aman (RLS)
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-mazelia-gold" /> Format Rupiah Presisi
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-mazelia-gold" /> Integrasi Teks WhatsApp
            </span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ESTIMATOR SIMULATOR SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-mazelia-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-mazelia-charcoal">
              Simulasi Cepat Kebutuhan Acara Anda
            </h2>
            <p className="text-xs sm:text-sm text-mazelia-taupe mt-2">
              Pilih kategori dan geser perkiraan jumlah tamu untuk melihat simulasi alokasi anggaran kasar secara instan.
            </p>
          </div>

          <div className="rounded-2xl border border-mazelia-border bg-mazelia-ivory/60 p-6 sm:p-10 shadow-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-mazelia-bronze mb-2">
                    Kategori Acara
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Wedding', 'Engagement', 'Birthday'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                          selectedCategory === cat
                            ? 'bg-mazelia-gold text-white border-mazelia-gold shadow-sm'
                            : 'bg-white text-mazelia-charcoal border-mazelia-border hover:border-mazelia-gold'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-mazelia-bronze">
                      Estimasi Jumlah Tamu
                    </label>
                    <span className="font-serif text-lg font-bold text-mazelia-charcoal">
                      {guestCount} Tamu (Pax)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full h-2 bg-mazelia-border rounded-lg appearance-none cursor-pointer accent-mazelia-gold"
                  />
                  <div className="flex justify-between text-[10px] text-mazelia-taupe mt-1">
                    <span>50 Tamu</span>
                    <span>500 Tamu</span>
                    <span>1.000 Tamu</span>
                  </div>
                </div>
              </div>

              {/* Result Preview Box */}
              <div className="bg-white rounded-xl border border-mazelia-border p-6 shadow-sm space-y-4 text-center">
                <span className="text-xs font-medium text-mazelia-taupe uppercase tracking-widest">
                  Perkiraan Total Anggaran Bersih
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-mazelia-charcoal">
                  {formatRupiah(estimatedTotal)}
                </div>
                <div className="pt-2 border-t border-mazelia-border/60 grid grid-cols-2 gap-3 text-left text-xs">
                  <div>
                    <span className="text-mazelia-taupe block text-[10px]">Alokasi Katering:</span>
                    <span className="font-semibold">{formatRupiah(estimatedTotal * 0.45)}</span>
                  </div>
                  <div>
                    <span className="text-mazelia-taupe block text-[10px]">Venue & Dekorasi:</span>
                    <span className="font-semibold">{formatRupiah(estimatedTotal * 0.3)}</span>
                  </div>
                  <div>
                    <span className="text-mazelia-taupe block text-[10px]">Busana & MUA:</span>
                    <span className="font-semibold">{formatRupiah(estimatedTotal * 0.15)}</span>
                  </div>
                  <div>
                    <span className="text-mazelia-taupe block text-[10px]">Dokumentasi & Lainnya:</span>
                    <span className="font-semibold">{formatRupiah(estimatedTotal * 0.1)}</span>
                  </div>
                </div>
                <div className="pt-3">
                  <Link href={`/register`}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Buka Rencana Rinci di Dashboard &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-16 sm:py-24 bg-mazelia-ivory border-b border-mazelia-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-mazelia-bronze">
              Empat Pilar Perencanaan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mazelia-charcoal">
              Segala Kebutuhan Acara dalam Satu Tempat
            </h2>
            <p className="text-xs sm:text-sm text-mazelia-taupe">
              Didesain khusus untuk ritme persiapan acara di Indonesia yang mengutamakan kekeluargaan dan presisi finansial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="rounded-xl border border-mazelia-border bg-white p-6 shadow-luxury hover:border-mazelia-gold/60 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-mazelia-gold-100 border border-mazelia-gold/30 flex items-center justify-center text-mazelia-bronze">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-mazelia-charcoal">Event Management Hub</h3>
              <p className="text-xs text-mazelia-taupe leading-relaxed">
                Kelola beberapa acara sekaligus. Countdown hari-H dan pengaturan multi-sesi (Akad Nikah, Pemberkatan, Resepsi).
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-mazelia-border bg-white p-6 shadow-luxury hover:border-mazelia-gold/60 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-mazelia-gold-100 border border-mazelia-gold/30 flex items-center justify-center text-mazelia-bronze">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-mazelia-charcoal">Checklist & Timeline</h3>
              <p className="text-xs text-mazelia-taupe leading-relaxed">
                Tugas otomatis standar lokal per kategori. Tenggat waktu, filter status, dan pelacakan progres visual tanpa ribet.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-mazelia-border bg-white p-6 shadow-luxury hover:border-mazelia-gold/60 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-mazelia-gold-100 border border-mazelia-gold/30 flex items-center justify-center text-mazelia-bronze">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-mazelia-charcoal">Budget Planner (IDR)</h3>
              <p className="text-xs text-mazelia-taupe leading-relaxed">
                Kalkulasi Rupiah bulat presisi tinggi. Bandingkan estimasi vs biaya riil, catat uang muka (DP), dan cegah defisit.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl border border-mazelia-border bg-white p-6 shadow-luxury hover:border-mazelia-gold/60 transition-all space-y-3">
              <div className="w-10 h-10 rounded-lg bg-mazelia-gold-100 border border-mazelia-gold/30 flex items-center justify-center text-mazelia-bronze">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-mazelia-charcoal">Guest Management & WA</h3>
              <p className="text-xs text-mazelia-taupe leading-relaxed">
                Kelompokkan keluarga dan VIP, alokasikan kuota pax, pantau RSVP, dan generate pesan WhatsApp personal 1 klik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-mazelia-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-mazelia-charcoal">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xs sm:text-sm text-mazelia-taupe mt-1">
              Segala hal yang perlu Anda ketahui tentang MAZÉLIA.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-mazelia-border p-5 bg-mazelia-ivory/30">
                <h4 className="font-serif text-base font-semibold text-mazelia-charcoal mb-1">
                  {faq.q}
                </h4>
                <p className="text-xs text-mazelia-taupe-dark leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 sm:py-24 bg-mazelia-charcoal text-white text-center relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-mazelia-gold">
            Mulai Hari Ini Tanpa Biaya
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Wujudkan Momen Terbaik Hidup Anda <br />
            <span className="italic font-normal text-mazelia-gold">Bersama MAZÉLIA.</span>
          </h2>
          <p className="text-xs sm:text-sm text-mazelia-taupe-light max-w-xl mx-auto">
            Daftar sekarang dan nikmati kemudahan merencanakan acara dengan standar elegan dan profesional.
          </p>
          <div className="pt-2">
            <Link href="/register">
              <Button size="lg" className="bg-mazelia-gold hover:bg-mazelia-gold-dark text-white px-8 shadow-luxury-gold">
                Daftar Akun MAZÉLIA Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
