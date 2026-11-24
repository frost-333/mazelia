import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-mazelia-ivory">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-mazelia-bronze">
              Transparan & Tanpa Beban
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mazelia-charcoal">
              Paket & Akses Platform MAZÉLIA
            </h1>
            <p className="text-sm sm:text-base text-mazelia-taupe max-w-xl mx-auto">
              Selama masa peluncuran beta perdana, seluruh modul inti MAZÉLIA dapat dinikmati 100% tanpa dipungut biaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Free Beta Tier */}
            <div className="rounded-2xl border-2 border-mazelia-gold bg-white p-8 shadow-luxury relative flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-mazelia-gold text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Akses Beta Terbuka
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-mazelia-charcoal">
                    MAZÉLIA Planner (Beta)
                  </h3>
                  <p className="text-xs text-mazelia-taupe mt-1">
                    Akses penuh ke seluruh alat inti perencanaan acara.
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-mazelia-charcoal">Gratis</span>
                  <span className="text-xs text-mazelia-taupe font-medium">/ selama masa beta</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-mazelia-border/60 text-xs text-mazelia-charcoal-light">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Buat & kelola banyak acara sekaligus</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Checklist otomatis sesuai jenis acara</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Budget Planner dengan format Rupiah presisi</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Guest Management & kuota kehadiran pax</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Generator pesan undangan WhatsApp satu klik</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link href="/register">
                  <Button size="lg" className="w-full shadow-luxury-gold">
                    Daftar Sekarang — Gratis
                  </Button>
                </Link>
              </div>
            </div>

            {/* Upcoming Pro Event Pass Tier */}
            <div className="rounded-2xl border border-mazelia-border bg-mazelia-ivory/60 p-8 shadow-sm flex flex-col justify-between opacity-85">
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-mazelia-gold-100 text-mazelia-bronze text-[10px] font-bold uppercase tracking-wider mb-2">
                    Segera Hadir di Fase 2
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-mazelia-charcoal">
                    MAZÉLIA Event Pass
                  </h3>
                  <p className="text-xs text-mazelia-taupe mt-1">
                    Beli sekali untuk undangan digital premium & ekspor laporan PDF.
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-mazelia-charcoal">Rp99.000</span>
                  <span className="text-xs text-mazelia-taupe font-medium">/ sekali bayar per acara</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-mazelia-border/60 text-xs text-mazelia-taupe-dark">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-mazelia-gold shrink-0" />
                    <span>Semua fitur MAZÉLIA Planner</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-mazelia-gold shrink-0" />
                    <span>1 Website Undangan Digital Mewah (Tema Editorial)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-mazelia-gold shrink-0" />
                    <span>Buku ucapan online & slot amplop transfer kado</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-mazelia-gold shrink-0" />
                    <span>Ekspor rekapitulasi anggaran & rundown PDF</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-mazelia-gold shrink-0" />
                    <span>Dukungan prioritas tim MAZÉLIA</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button variant="outline" size="lg" disabled className="w-full">
                  Tersedia di Pembaruan Berikutnya
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
