'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';

export default function KontakPage() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-mazelia-ivory">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-mazelia-bronze">
              Hubungi Kami
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-mazelia-charcoal">
              Kami Selalu Siap Mendengar
            </h1>
            <p className="text-xs sm:text-sm text-mazelia-taupe max-w-md mx-auto">
              Ada pertanyaan, masukan, atau kendala dalam merencanakan acara Anda? Tim MAZÉLIA siap mendampingi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Info Cards */}
            <div className="space-y-4">
              <div className="rounded-xl border border-mazelia-border bg-white p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-mazelia-gold-100 flex items-center justify-center text-mazelia-bronze">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-mazelia-charcoal">Email Dukungan</h4>
                <p className="text-xs text-mazelia-taupe">bantuan@mazelia.com</p>
              </div>

              <div className="rounded-xl border border-mazelia-border bg-white p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-mazelia-gold-100 flex items-center justify-center text-mazelia-bronze">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-mazelia-charcoal">WhatsApp Official</h4>
                <p className="text-xs text-mazelia-taupe">+62 812-3456-7890 (Senin - Sabtu)</p>
              </div>

              <div className="rounded-xl border border-mazelia-border bg-white p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-mazelia-gold-100 flex items-center justify-center text-mazelia-bronze">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-mazelia-charcoal">Lokasi</h4>
                <p className="text-xs text-mazelia-taupe">Jakarta, Indonesia</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2 rounded-2xl border border-mazelia-border bg-white p-6 sm:p-8 shadow-luxury">
              {submitted ? (
                <div className="text-center py-12 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-mazelia-charcoal">Pesan Berhasil Terkirim!</h3>
                  <p className="text-xs text-mazelia-taupe max-w-sm mx-auto">
                    Terima kasih telah menghubungi MAZÉLIA. Tim kami akan membalas pesan Anda dalam waktu 1x24 jam kerja.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Kirim Pesan Lainnya
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Nama Lengkap" placeholder="Nama Anda" required />
                    <Input label="Alamat Email" type="email" placeholder="email@contoh.com" required />
                  </div>
                  <Input label="Subjek Pertanyaan" placeholder="Contoh: Konsultasi Fitur Budget Planner" required />
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                      Pesan Anda
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tuliskan pertanyaan atau kendala yang Anda alami..."
                      className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal placeholder:text-mazelia-taupe/70 transition-all focus:border-mazelia-gold focus:outline-none focus:ring-2 focus:ring-mazelia-gold/20"
                    />
                  </div>
                  <Button type="submit" size="md" className="w-full shadow-luxury-gold">
                    Kirim Pesan Dukungan
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
