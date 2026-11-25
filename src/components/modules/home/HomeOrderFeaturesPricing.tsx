'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Palette,
  FileEdit,
  CheckCircle2,
  Share2,
  ArrowRight,
  ChevronDown,
  MailOpen,
  Users,
  Calendar,
  Timer,
  MapPin,
  BookOpen,
  Image as ImageIcon,
  MessageSquareHeart,
  UserCheck,
  Gift,
  Music,
  Check,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export function HomeOrderFeaturesPricing() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const steps = [
    {
      num: 'STEP 01',
      title: 'Pilih Desain Favorit',
      desc: 'Lihat koleksi desain MAZÉLIA dan pilih tema yang paling kamu sukai.',
      icon: Palette,
      hint: '5 tema eksklusif siap dipilih',
    },
    {
      num: 'STEP 02',
      title: 'Isi Detail Acara',
      desc: 'Masukkan nama pasangan, tanggal, waktu, lokasi, foto, dan informasi acara.',
      icon: FileEdit,
      hint: 'Data dapat disesuaikan dengan acaramu',
    },
    {
      num: 'STEP 03',
      title: 'Periksa & Selesaikan Pesanan',
      desc: 'Periksa kembali informasi undangan dan ikuti proses pemesanan serta pembayaran sesuai paket yang dipilih.',
      icon: CheckCircle2,
      hint: 'Dibantu tim hingga siap tayang',
    },
    {
      num: 'STEP 04',
      title: 'Bagikan Undanganmu',
      desc: 'Setelah undangan selesai diproses dan diterbitkan, kamu akan mendapatkan link undangan yang siap dibagikan kepada keluarga dan teman.',
      icon: Share2,
      hint: 'Siap dikirim via WhatsApp',
    },
  ];

  const features = [
    { icon: MailOpen, title: 'Opening Cover Personal', desc: 'Sampul pembuka elegan dengan nama pasangan dan transisi animasi tematik.' },
    { icon: Users, title: 'Profil Kedua Mempelai', desc: 'Tampilkan nama lengkap, nama orang tua, serta tautan Instagram mempelai.' },
    { icon: Calendar, title: 'Jadwal & Sesi Acara', desc: 'Informasi lengkap Akad/Pemberkatan & Resepsi beserta tombol Simpan ke Kalender.' },
    { icon: Timer, title: 'Countdown Pernikahan', desc: 'Hitung mundur otomatis menuju hari bahagia dalam hari, jam, menit, dan detik.' },
    { icon: MapPin, title: 'Integrasi Google Maps', desc: 'Tamu dapat langsung membuka petunjuk arah lokasi acara hanya dengan satu ketukan.' },
    { icon: BookOpen, title: 'Love Story Timeline', desc: 'Ceritakan perjalanan kisah cinta dari pertemuan awal hingga hari pernikahan.' },
    { icon: ImageIcon, title: 'Galeri Foto & Lightbox', desc: 'Tampilkan potret prewedding dalam grid rapi yang bisa diperbesar.' },
    { icon: MessageSquareHeart, title: 'RSVP & Buku Doa', desc: 'Tamu dapat mengonfirmasi kehadiran (pax) sekaligus menuliskan doa restu.' },
    { icon: UserCheck, title: 'Personalisasi Nama Tamu', desc: 'Sapa setiap tamu secara personal di sampul undangan melalui tautan khusus (?to=).' },
    { icon: Gift, title: 'Amplop Digital & Kado', desc: 'Sediakan nomor rekening dengan tombol salin cepat serta alamat pengiriman kado fisik.' },
    { icon: Music, title: 'Musik Latar Romantis', desc: 'Iringan instrumen musik latar yang dapat diputar atau dijeda oleh tamu.' },
  ];

  const faqs = [
    {
      q: 'Apa itu undangan digital MAZÉLIA?',
      a: 'MAZÉLIA adalah platform undangan digital berbasis website yang membantu Anda menghadirkan undangan pernikahan atau acara keluarga secara elegan, praktis, dan mudah dibagikan melalui tautan.',
    },
    {
      q: 'Bagaimana cara memesan undangan?',
      a: 'Anda cukup memilih tema yang disukai, mengisi atau mengirimkan detail acara (nama pasangan, tanggal, lokasi, foto), meninjau hasil pratinjau, lalu menyelesaikan pemesanan melalui kanal resmi kami.',
    },
    {
      q: 'Apakah saya bisa memilih desain sendiri?',
      a: 'Ya, Anda bebas memilih dari koleksi tema resmi MAZÉLIA (Champagne Royale, Emerald Botanical, Romantic Rose & Blush, Royal Heritage Nusantara, dan Midnight Celestial Glam) serta melihat pratinjau langsung sebelum memesan.',
    },
    {
      q: 'Apakah undangan bisa dibuka melalui HP?',
      a: 'Tentu. Seluruh desain undangan MAZÉLIA dirancang dengan pendekatan mobile-first sehingga nyaman dan indah dibuka melalui smartphone, tablet, maupun desktop.',
    },
    {
      q: 'Bagaimana cara membagikan undangan?',
      a: 'Setelah undangan diterbitkan, Anda akan mendapatkan link unik (contoh: domain/nama-pasangan) yang bisa langsung dibagikan lewat WhatsApp, Instagram, atau media sosial lainnya.',
    },
    {
      q: 'Apakah saya bisa mengubah informasi setelah undangan dibuat?',
      a: 'Ya, detail acara seperti jam, lokasi, daftar galeri, cerita cinta, dan tema dapat diperbarui melalui dashboard pengelolaan undangan.',
    },
    {
      q: 'Apakah undangan memiliki masa aktif?',
      a: 'Kebijakan masa aktif mengikuti paket yang Anda pilih saat pemesanan. Tim kami akan menginformasikan detail masa aktif secara jelas sebelum undangan diterbitkan.',
    },
    {
      q: 'Bagaimana jika saya mengalami kesulitan saat memesan?',
      a: 'Anda dapat langsung menghubungi tim kami melalui halaman Kontak resmi MAZÉLIA untuk dibantu langkah demi langkah hingga undangan siap dibagikan.',
    },
    {
      q: 'Bagaimana cara melakukan pembayaran?',
      a: 'Instruksi dan metode pembayaran akan diinformasikan sesuai paket yang dipilih saat proses konfirmasi pemesanan bersama tim MAZÉLIA.',
    },
    {
      q: 'Apakah saya harus memiliki akun untuk memesan?',
      a: 'Tidak perlu. Anda dapat menjelajahi tema, melihat contoh undangan, dan langsung memesan melalui tim MAZÉLIA tanpa harus membuat akun.',
    },
  ];

  return (
    <>
      {/* SECTION 05 — HOW TO ORDER */}
      <section id="cara-pesan" className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
              Panduan Pemesanan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#302D29]">
              Pesan Undangan Digital Semudah Itu.
            </h2>
            <p className="text-sm text-[#6E675F] leading-relaxed">
              Tidak perlu bingung. Ikuti empat langkah sederhana untuk memiliki undangan digital impianmu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl border border-[#E8DFD0] bg-white shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-[#FAF8F4] border border-[#E8DFD0] text-[#846B48]">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#E8DFD0] flex items-center justify-center text-[#B69A72]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#302D29]">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E675F] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E8DFD0]/70 text-[11px] font-medium text-[#846B48]">
                    {step.hint}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B69A72] hover:bg-[#846B48] text-white text-sm font-semibold shadow-[0_12px_28px_-8px_rgba(182,154,114,0.55)] transition-all"
            >
              <span>Mulai Buat Undangan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 06 — INVITATION FEATURES */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#E8DFD0]/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
              Fitur Lengkap Undangan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#302D29]">
              Lebih dari Sekadar Undangan.
            </h2>
            <p className="text-sm text-[#6E675F] leading-relaxed">
              Setiap undangan MAZÉLIA dilengkapi berbagai fitur interaktif agar tamu mendapatkan seluruh informasi acara dengan nyaman.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-5 rounded-2xl border border-[#E8DFD0] bg-[#FAF8F4]/60 hover:bg-white hover:border-[#B69A72]/50 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E8DFD0] flex items-center justify-center text-[#B69A72] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-[#302D29]">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#6E675F] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 08 — PRICING / OUR PACKAGES */}
      <section id="paket" className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
              Paket &amp; Layanan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#302D29]">
              Pilihan Paket untuk Setiap Kebutuhan.
            </h2>
            <p className="text-sm text-[#6E675F] leading-relaxed">
              Pilih paket yang paling sesuai dengan kebutuhan acara Anda — mulai dari akses platform mandiri hingga layanan pembuatan penuh oleh tim MAZÉLIA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto items-stretch">
            {/* Tier 1: Recommended Agency / Undangan Digital Service */}
            <div className="rounded-3xl border-2 border-[#B69A72] bg-white p-7 sm:p-8 shadow-luxury relative flex flex-col justify-between space-y-6">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B69A72] text-white text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Rekomendasi Layanan
              </div>
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#B69A72]/15 text-[10px] font-bold uppercase tracking-wider text-[#846B48]">
                  Terima Beres
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#302D29]">
                    Layanan Undangan Digital
                  </h3>
                  <p className="text-xs text-[#6E675F] mt-1">
                    Dibuatkan &amp; didampingi langsung oleh tim MAZÉLIA Agency.
                  </p>
                </div>
                <div className="flex items-baseline gap-1 pt-1">
                  <span className="font-serif text-3xl font-bold text-[#846B48]">Hubungi Kami</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-[#E8DFD0]/70 text-xs text-[#554F47]">
                  {[
                    'Pilih salah satu dari 5 tema eksklusif',
                    'Link undangan khusus nama pasangan',
                    'Galeri foto, Love Story, Maps & Musik',
                    'RSVP online, Buku Doa & Portal Pengantin',
                    'Pendampingan pengisian hingga siap sebar',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#B69A72] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/kontak"
                className="w-full py-3 rounded-xl bg-[#B69A72] hover:bg-[#846B48] text-white text-center text-xs font-semibold shadow-sm transition-colors"
              >
                Pesan Undangan Sekarang
              </Link>
            </div>

            {/* Tier 2: Official Upcoming Event Pass from pricing/page.tsx */}
            <div className="rounded-3xl border border-[#E8DFD0] bg-white/80 p-7 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Segera Hadir (Fase 2)
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#302D29]">
                    MAZÉLIA Event Pass
                  </h3>
                  <p className="text-xs text-[#6E675F] mt-1">
                    Sekali bayar untuk undangan digital premium &amp; ekspor PDF.
                  </p>
                </div>
                <div className="flex items-baseline gap-1 pt-1">
                  <span className="font-serif text-3xl font-bold text-[#302D29]">Rp99.000</span>
                  <span className="text-xs text-[#9B9185]">/ sekali bayar per acara</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-[#E8DFD0]/70 text-xs text-[#554F47]">
                  {[
                    '1 Website Undangan Digital Mewah',
                    'Buku ucapan online & amplop digital',
                    'Ekspor rekapitulasi anggaran & rundown PDF',
                    'Dukungan prioritas tim MAZÉLIA',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#B69A72] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/kontak"
                className="w-full py-3 rounded-xl border border-[#E8DFD0] bg-white hover:bg-[#FAF8F4] text-center text-xs font-semibold text-[#846B48] transition-colors"
              >
                Tanya Ketersediaan Paket
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 09 — WHY MAZÉLIA */}
      <section id="tentang" className="py-16 sm:py-24 bg-white border-y border-[#E8DFD0]/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#E8DFD0] bg-[#FAF8F4] p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
                <ShieldCheck className="w-4 h-4 text-[#B69A72]" />
                <span>Komitmen Kualitas</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#302D29]">
                Mengapa Memilih MAZÉLIA?
              </h2>
              <p className="text-sm text-[#6E675F] leading-relaxed">
                Kami percaya undangan digital pertama yang dikirim kepada keluarga dan sahabat harus mencerminkan kehangatan dan kesungguhan acara Anda — tanpa kerumitan teknis.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Desain Memperhatikan Detail',
                  desc: 'Tipografi serif editorial, ornamen tematik, dan komposisi yang tenang serta mudah dibaca.',
                },
                {
                  title: 'Proses Pemesanan Mudah',
                  desc: 'Alur yang jelas dan ramah bagi siapa saja, termasuk bagi yang baru pertama kali memesan.',
                },
                {
                  title: 'Tampilan Responsif',
                  desc: 'Tetap proporsional dan nyaman dibuka di layar smartphone, tablet, maupun komputer.',
                },
                {
                  title: 'Praktis untuk Dibagikan',
                  desc: 'Satu tautan rapi yang dapat dipersonalisasi untuk setiap tamu dan dibagikan lewat WhatsApp.',
                },
                {
                  title: 'Pengalaman yang Elegan',
                  desc: 'Setiap tema dirancang dengan transisi pembuka dan latar belakang yang berkarakter.',
                },
                {
                  title: 'Bantuan yang Mudah Dipahami',
                  desc: 'Tim siap membantu memastikan seluruh detail acara Anda tampil sempurna sebelum disebar.',
                },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-2xl bg-white border border-[#E8DFD0] space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-[#302D29]">{item.title}</h3>
                  <p className="text-xs text-[#6E675F] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — FAQ */}
      <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F4]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#846B48]">
              Pertanyaan Umum
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#302D29]">
              Masih Ada yang Ingin Ditanyakan?
            </h2>
            <p className="text-sm text-[#6E675F]">
              Temukan jawaban seputar pemesanan, tema, dan cara kerja undangan digital MAZÉLIA.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E8DFD0] bg-white overflow-hidden transition-shadow hover:shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base font-semibold text-[#302D29]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#846B48] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#6E675F] leading-relaxed border-t border-[#E8DFD0]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11 — FINAL CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#FAF8F4] via-[#F4ECE0] to-[#FAF8F4] border-t border-[#E8DFD0]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8DFD0] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#846B48]">
            <Sparkles className="w-3.5 h-3.5 text-[#B69A72]" />
            <span>MAZÉLIA Agency</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#302D29] leading-tight">
            Awali Cerita Istimewamu Bersama MAZÉLIA.
          </h2>
          <p className="text-sm sm:text-base text-[#554F47] max-w-xl mx-auto">
            Karena setiap momen berharga pantas memiliki undangan yang istimewa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/kontak"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B69A72] hover:bg-[#846B48] text-white text-sm font-semibold shadow-[0_12px_28px_-8px_rgba(182,154,114,0.6)] transition-all"
            >
              <span>Pesan Undangan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#tema"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white hover:bg-[#FAF8F4] border border-[#E8DFD0] text-[#302D29] text-sm font-semibold transition-all"
            >
              Jelajahi Koleksi Tema
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
