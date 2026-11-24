import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Calendar, CheckSquare, Wallet, Users, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function FiturPage() {
  const features = [
    {
      id: 'event-hub',
      title: 'Event Management Hub',
      icon: Calendar,
      desc: 'Ruang kerja terpusat untuk setiap acara Anda. Mendukung multi-acara sekaligus tanpa risiko data tertukar.',
      points: [
        'Countdown otomatis menuju hari-H acara',
        'Pengaturan multi-sesi: Jadwal Akad Nikah, Pemberkatan, hingga Resepsi Malam',
        'Penyimpanan detail venue, kota, alamat lengkap, dan Google Maps link',
        'Status persiapan acara dari tahap perencanaan hingga selesai',
      ],
    },
    {
      id: 'checklist',
      title: 'Checklist & Timeline Persiapan',
      icon: CheckSquare,
      desc: 'Panduan lini masa langkah demi langkah agar tidak ada persiapan penting yang terlewat.',
      points: [
        'Pre-populated checklist otomatis sesuai jenis acara (Wedding, Engagement, Birthday)',
        'Pengelompokan fase waktu: H-6 Bulan, H-3 Bulan, H-1 Bulan, hingga Hari-H',
        'Tandai selesai secara instan dengan indikator progres visual',
        'Tambah tugas kustom mandiri dengan tenggat waktu dan catatan khusus',
      ],
    },
    {
      id: 'budget',
      title: 'Budget Planner Presisi Rupiah (IDR)',
      icon: Wallet,
      desc: 'Kalkulator keuangan acara yang presisi dan transparan dalam format Rupiah.',
      points: [
        'Pemisah ribuan otomatis saat mengetik untuk kenyamanan membaca angka',
        'Bandingkan estimasi anggaran awal vs nilai kontrak riil vendor',
        'Pencatatan uang muka (DP) dan sisa tagihan pelunasan',
        'Indikator status keuangan real-time: Terkendali atau Melebihi Anggaran',
      ],
    },
    {
      id: 'guests',
      title: 'Guest Management & RSVP',
      icon: Users,
      desc: 'Kelola ratusan tamu keluarga dan sahabat dengan segmentasi yang rapi.',
      points: [
        'Pengelompokan segmen: Keluarga Inti, VIP, Sahabat, Rekan Kerja',
        'Alokasi jumlah pax/kursi katering per undangan',
        'Pelacakan status konfirmasi: Menunggu (Pending), Hadir, atau Berhalangan',
        'Pencarian instan berdasarkan nama tamu atau kelompok relasi',
      ],
    },
    {
      id: 'whatsapp',
      title: 'Generator Pesan Undangan WhatsApp',
      icon: MessageCircle,
      desc: 'Distribusi kabar gembira langsung ke aplikasi WhatsApp tamu dengan draf teks sopan.',
      points: [
        'Satu klik membuka WhatsApp Web atau aplikasi mobile',
        'Draf kalimat sopan khas Indonesia yang otomatis menyebut nama tamu',
        'Bebas biaya gateway perpesanan berbayar yang membebani pengguna',
        'Mempercepat konfirmasi kehadiran tamu secara personal dan ramah',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-mazelia-ivory">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-mazelia-bronze">
              Eksplorasi Kemampuan
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mazelia-charcoal">
              Fitur Lengkap Platform MAZÉLIA
            </h1>
            <p className="text-sm sm:text-base text-mazelia-taupe max-w-2xl mx-auto">
              Seluruh alat yang Anda butuhkan untuk merencanakan acara berkesan, dirancang dengan kesederhanaan dan ketelitian teknis tinggi.
            </p>
          </div>

          <div className="space-y-8">
            {features.map((f, i) => (
              <div
                key={f.id}
                id={f.id}
                className="rounded-2xl border border-mazelia-border bg-white p-6 sm:p-10 shadow-luxury hover:border-mazelia-gold/60 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-mazelia-gold-100 border border-mazelia-gold/40 flex items-center justify-center text-mazelia-bronze shrink-0">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-mazelia-charcoal">
                        {f.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-mazelia-taupe mt-1">{f.desc}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-mazelia-border/60">
                      {f.points.map((pt, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-mazelia-charcoal-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-mazelia-gold shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="rounded-2xl border border-mazelia-gold/40 bg-mazelia-gold-50 p-8 sm:p-10 text-center space-y-4 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-mazelia-charcoal">
              Siap Merasakan Kemudahan Perencanaan MAZÉLIA?
            </h3>
            <p className="text-xs sm:text-sm text-mazelia-taupe-dark max-w-xl mx-auto">
              Daftar sekarang secara gratis dan mulai susun rencana acara impian Anda dalam hitungan menit.
            </p>
            <div className="pt-2">
              <Link href="/register">
                <Button size="lg" className="shadow-luxury-gold gap-2">
                  <Sparkles className="w-4 h-4" />
                  Mulai Rencanakan Acara
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
