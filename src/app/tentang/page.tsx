import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Heart, Sparkles, Shield, Compass } from 'lucide-react';

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col bg-mazelia-ivory">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-mazelia-bronze">
              Tentang MAZÉLIA
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mazelia-charcoal">
              Events • Moments • Memories
            </h1>
            <p className="text-sm sm:text-base text-mazelia-taupe max-w-2xl mx-auto leading-relaxed">
              Mendampingi setiap keluarga dan individu di Indonesia merajut kenangan sakral dengan ketenangan dan keanggunan.
            </p>
          </div>

          {/* Story Content */}
          <div className="rounded-2xl border border-mazelia-border bg-white p-8 sm:p-12 shadow-luxury space-y-6 text-sm text-mazelia-charcoal-light leading-relaxed text-justify">
            <p>
              Merencanakan acara besar — baik itu pernikahan yang sakral, lamaran keluarga yang hangat, atau syukuran ulang tahun — adalah salah satu fase paling membahagiakan dalam hidup. Namun, di balik keindahan hari-H, persiapan di Indonesia kerap dipenuhi dengan kecemasan: spreadsheet anggaran yang berantakan, catatan tugas yang tercecer di berbagai grup chat, hingga sulitnya memantau kepastian kehadiran tamu keluarga.
            </p>
            <p>
              <strong>MAZÉLIA</strong> lahir dari sebuah keyakinan sederhana: <em>persiapan acara seharusnya tidak membebani mental Anda</em>. Kami menggabungkan estetika editorial pernikahan yang mewah dengan kehandalan perangkat lunak modern untuk menciptakan satu ruang kerja yang harmonis.
            </p>
            <div className="border-l-4 border-mazelia-gold pl-4 py-1 italic font-serif text-base text-mazelia-charcoal">
              &ldquo;Bagi kami, setiap acara bukan sekadar deretan tugas dan angka, melainkan cerita berharga tentang kasih sayang dan kebersamaan yang akan dikenang seumur hidup.&rdquo;
            </div>
          </div>

          {/* Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="rounded-xl border border-mazelia-border bg-white p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-full bg-mazelia-gold-100 mx-auto flex items-center justify-center text-mazelia-bronze">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-mazelia-charcoal">Kehangatan</h3>
              <p className="text-xs text-mazelia-taupe">Didesain dengan empati terhadap tradisi kekeluargaan dan budaya acara Indonesia.</p>
            </div>

            <div className="rounded-xl border border-mazelia-border bg-white p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-full bg-mazelia-gold-100 mx-auto flex items-center justify-center text-mazelia-bronze">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-mazelia-charcoal">Kejelasan</h3>
              <p className="text-xs text-mazelia-taupe">Struktur checklist dan anggaran yang transparan untuk menjaga ketenangan pikiran Anda.</p>
            </div>

            <div className="rounded-xl border border-mazelia-border bg-white p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-full bg-mazelia-gold-100 mx-auto flex items-center justify-center text-mazelia-bronze">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-mazelia-charcoal">Privasi Penuh</h3>
              <p className="text-xs text-mazelia-taupe">Menghargai kerahasiaan daftar tamu dan rincian keuangan Anda tanpa kompromi.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
