'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, CheckCircle2, AlertCircle, KeyRound, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err?.message || 'Terjadi kesalahan sistem');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-mazelia-gold/20 selection:text-mazelia-bronze bg-mazelia-ivory">
      {/* LEFT COLUMN: Editorial Visual Banner (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-mazelia-charcoal-900 text-mazelia-ivory flex-col justify-between p-12 xl:p-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-mazelia-gold/40 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-mazelia-bronze/40 blur-3xl" />
          <div 
            className="w-full h-full opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #B69A72 1px, transparent 0)',
              backgroundSize: '36px 36px'
            }}
          />
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="font-serif text-3xl font-bold tracking-wider text-mazelia-gold-light group-hover:text-mazelia-gold transition-colors">
              MAZÉLIA
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-mazelia-gold" />
          </Link>
          <p className="text-[11px] uppercase tracking-widest text-mazelia-taupe-light font-medium mt-1">
            Events • Moments • Memories
          </p>
        </div>

        <div className="relative z-10 max-w-lg space-y-6 my-auto py-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mazelia-gold/15 text-mazelia-gold-light border border-mazelia-gold/25 text-xs font-medium tracking-wide">
            <KeyRound className="w-3.5 h-3.5 text-mazelia-gold" />
            Pemulihan Akses Aman
          </span>
          <h1 className="font-serif text-3xl xl:text-4xl font-normal leading-snug text-mazelia-ivory">
            Keamanan akun & integritas data acara Anda adalah prioritas kami.
          </h1>
          <p className="text-sm text-mazelia-taupe-light leading-relaxed font-light">
            Jika Anda lupa kata sandi akun MAZÉLIA, masukkan email terdaftar Anda dan kami akan mengirimkan instruksi pemulihan aman ke email Anda.
          </p>
        </div>

        <div className="relative z-10 text-xs text-mazelia-taupe border-t border-white/10 pt-6 flex items-center justify-between">
          <span>Keamanan Data Terenkripsi</span>
          <span className="text-mazelia-gold-light/80">© 2026 MAZÉLIA</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Reset Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-medium text-mazelia-taupe hover:text-mazelia-charcoal transition-colors px-3 py-1.5 rounded-lg hover:bg-mazelia-ivory-warm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Halaman Masuk
          </Link>

          <div className="lg:hidden">
            <span className="font-serif font-bold text-xl tracking-wider text-mazelia-charcoal">
              MAZÉLIA
            </span>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto my-auto space-y-6">
          <div className="space-y-2 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-mazelia-charcoal">
              Atur Ulang Sandi
            </h2>
            <p className="text-sm text-mazelia-charcoal-muted leading-relaxed">
              Masukkan alamat email Anda untuk menerima tautan pemulihan kata sandi.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50/90 border border-red-200 text-xs text-red-800 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-red-900">Gagal Mengirim Tautan</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="p-6 rounded-2xl bg-white border border-mazelia-border shadow-luxury text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-bold text-mazelia-charcoal">Tautan Terkirim</h3>
                <p className="text-xs text-mazelia-charcoal-muted leading-relaxed">
                  Kami telah mengirimkan instruksi ke email <span className="font-semibold text-mazelia-charcoal">{email}</span>. Silakan periksa inbox atau folder spam Anda.
                </p>
              </div>
              <Link href="/login" className="inline-block pt-2 w-full">
                <Button variant="outline" size="md" className="w-full">
                  Kembali ke Halaman Masuk
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                  Alamat Email Terdaftar
                </label>
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-white text-sm"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full shadow-luxury-gold text-sm font-medium tracking-wide bg-mazelia-gold hover:bg-mazelia-gold-dark text-white border-0 transition-all duration-200" 
                isLoading={isLoading}
              >
                Kirim Tautan Pemulihan
              </Button>
            </form>
          )}

          <div className="pt-6 border-t border-mazelia-border/80 text-center text-xs text-mazelia-charcoal-muted">
            Sudah mengingat kata sandi Anda?{' '}
            <Link href="/login" className="font-bold text-mazelia-bronze hover:text-mazelia-gold-dark transition-colors">
              Masuk Sekarang
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-mazelia-taupe mt-8">
          MAZÉLIA — Events • Moments • Memories
        </div>
      </div>
    </div>
  );
}
