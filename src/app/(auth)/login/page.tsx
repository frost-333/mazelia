'use client';

import * as React from 'react';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { loginAction } from '@/actions/auth-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Sparkles, 
  ArrowLeft, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Lock, 
  CalendarHeart,
  ShieldCheck,
  Users2
} from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex selection:bg-mazelia-gold/20 selection:text-mazelia-bronze bg-mazelia-ivory">
      {/* LEFT COLUMN: Editorial Visual Banner (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-mazelia-charcoal-900 text-mazelia-ivory flex-col justify-between p-12 xl:p-16 overflow-hidden">
        {/* Subtle Decorative Background Layer */}
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

        {/* Top Header */}
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

        {/* Center Editorial Quote & Feature Highlights */}
        <div className="relative z-10 max-w-lg space-y-8 my-auto py-12">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mazelia-gold/15 text-mazelia-gold-light border border-mazelia-gold/25 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-mazelia-gold" />
              Event Planning Sanctuary
            </span>
            <h1 className="font-serif text-3xl xl:text-4xl font-normal leading-snug text-mazelia-ivory">
              Wujudkan perayaan penuh keanggunan, tanpa kerumitan.
            </h1>
            <p className="text-sm text-mazelia-taupe-light leading-relaxed font-light">
              Dari rancangan checklist, alokasi anggaran Rupiah yang presisi, hingga manajemen konfirmasi RSVP tamu, semua terkoordinasi dalam satu ruang kerja eksklusif.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2 border-t border-white/10 text-xs text-mazelia-ivory/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <CalendarHeart className="w-4 h-4 text-mazelia-gold-light" />
              </div>
              <span>Rundown acara & timeline checklist tersusun otomatis</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Users2 className="w-4 h-4 text-mazelia-gold-light" />
              </div>
              <span>Broadcast undangan WhatsApp & RSVP switcher instan</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-mazelia-gold-light" />
              </div>
              <span>Keamanan data acara terisolasi dengan Row Level Security</span>
            </div>
          </div>
        </div>

        {/* Bottom Status / Testimonial pill */}
        <div className="relative z-10 text-xs text-mazelia-taupe border-t border-white/10 pt-6 flex items-center justify-between">
          <span>Platform Perencanaan Acara Indonesia</span>
          <span className="text-mazelia-gold-light/80">© 2026 MAZÉLIA</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Elegant Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 overflow-y-auto">
        {/* Top Back Nav */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-mazelia-taupe hover:text-mazelia-charcoal transition-colors px-3 py-1.5 rounded-lg hover:bg-mazelia-ivory-warm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
          </Link>

          <div className="lg:hidden">
            <span className="font-serif font-bold text-xl tracking-wider text-mazelia-charcoal">
              MAZÉLIA
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto space-y-8">
          {/* Header */}
          <div className="space-y-2 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-mazelia-charcoal">
              Selamat Datang Kembali
            </h2>
            <p className="text-sm text-mazelia-charcoal-muted leading-relaxed">
              Masuk ke akun Anda untuk melanjutkan perencanaan momen istimewa.
            </p>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs space-y-2 text-amber-900">
            <div className="flex items-center gap-2 font-semibold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Akun Demo Resmi MAZÉLIA</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Gunakan akun demo berikut untuk langsung menjelajahi dashboard dan sampel acara pernikahan:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div className="bg-white/80 p-2 rounded border border-amber-200/50">
                <span className="text-amber-700 block text-[9px] uppercase font-sans font-medium">Email</span>
                <span className="select-all font-semibold text-mazelia-charcoal">demo@mazelia.com</span>
              </div>
              <div className="bg-white/80 p-2 rounded border border-amber-200/50">
                <span className="text-amber-700 block text-[9px] uppercase font-sans font-medium">Password</span>
                <span className="select-all font-semibold text-mazelia-charcoal">Mazelia2026!</span>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {state?.error && (
            <div className="p-4 rounded-xl bg-red-50/90 border border-red-200 text-xs text-red-800 flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-red-900">Gagal Masuk</p>
                <p>{state.error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-5">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                Alamat Email
              </label>
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  defaultValue="demo@mazelia.com"
                  placeholder="nama@email.com"
                  required
                  autoComplete="email"
                  className="bg-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                  Kata Sandi
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-mazelia-bronze hover:text-mazelia-gold-dark hover:underline transition-colors font-medium"
                >
                  Lupa sandi?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  defaultValue="Mazelia2026!"
                  placeholder="Masukkan kata sandi Anda"
                  required
                  autoComplete="current-password"
                  className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 pr-10 text-sm text-mazelia-charcoal placeholder:text-mazelia-taupe/70 transition-all focus:border-mazelia-gold focus:outline-none focus:ring-2 focus:ring-mazelia-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mazelia-taupe hover:text-mazelia-charcoal p-1 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full shadow-luxury-gold text-sm font-medium tracking-wide mt-2 bg-mazelia-gold hover:bg-mazelia-gold-dark text-white border-0 transition-all duration-200" 
              isLoading={isPending}
            >
              Masuk ke Ruang Kerja
            </Button>
          </form>

          {/* Registration Link */}
          <div className="pt-6 border-t border-mazelia-border/80 text-center text-xs text-mazelia-charcoal-muted space-y-1">
            <p>
              Belum memiliki akun?{' '}
              <Link href="/register" className="font-bold text-mazelia-bronze hover:text-mazelia-gold-dark transition-colors">
                Daftar Gratis Sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-mazelia-taupe mt-8">
          Dilindungi dengan enkripsi standar industri & Row Level Security.
        </div>
      </div>
    </div>
  );
}
