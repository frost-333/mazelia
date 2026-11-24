'use client';

import * as React from 'react';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { registerAction } from '@/actions/auth-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Sparkles, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  CalendarHeart,
  Users2,
  ShieldCheck,
  BadgeCheck
} from 'lucide-react';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="relative z-10 max-w-lg space-y-8 my-auto py-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mazelia-gold/15 text-mazelia-gold-light border border-mazelia-gold/25 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-mazelia-gold" />
              Ruang Eksklusif Momen Bahagia
            </span>
            <h1 className="font-serif text-3xl xl:text-4xl font-normal leading-snug text-mazelia-ivory">
              Rencanakan setiap detail acara Anda dengan tenang & sempurna.
            </h1>
            <p className="text-sm text-mazelia-taupe-light leading-relaxed font-light">
              Mulai dari wedding impian, pertunangan, perayaan ulang tahun, hingga gathering keluarga. Dapatkan akses ke toolkit perencanaan terlengkap di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 pt-4 border-t border-white/10 text-xs text-mazelia-ivory/85">
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-4 h-4 text-mazelia-gold-light shrink-0" />
              <span>Akses 100% Gratis selama masa Beta</span>
            </div>
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-4 h-4 text-mazelia-gold-light shrink-0" />
              <span>Template checklist khusus pernikahan adat & modern</span>
            </div>
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-4 h-4 text-mazelia-gold-light shrink-0" />
              <span>Kalkulator budget real-time dengan proteksi overspending</span>
            </div>
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-4 h-4 text-mazelia-gold-light shrink-0" />
              <span>Privasi data keluarga terjamin sesuai standar UU PDP</span>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-10 text-xs text-mazelia-taupe border-t border-white/10 pt-6 flex items-center justify-between">
          <span>Keanggunan Perencanaan Digital</span>
          <span className="text-mazelia-gold-light/80">© 2026 MAZÉLIA</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Elegant Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 overflow-y-auto">
        {/* Top Back Nav */}
        <div className="flex justify-between items-center mb-6">
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
        <div className="w-full max-w-md mx-auto my-auto space-y-6">
          {/* Header */}
          <div className="space-y-2 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-mazelia-charcoal">
              Buat Akun Perencana
            </h2>
            <p className="text-sm text-mazelia-charcoal-muted leading-relaxed">
              Mulai gratis dalam hitungan detik untuk mengorganisir acara Anda.
            </p>
          </div>

          {/* Feedback Alerts */}
          {state?.error && (
            <div className="p-4 rounded-xl bg-red-50/90 border border-red-200 text-xs text-red-800 flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-red-900">Pendaftaran Belum Berhasil</p>
                <p>{state.error}</p>
              </div>
            </div>
          )}

          {state?.success && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-emerald-900">Pendaftaran Berhasil</p>
                <p>{state.success}</p>
                <Link href="/login" className="underline font-bold mt-1 inline-block text-emerald-950">
                  Klik di sini untuk langsung Masuk
                </Link>
              </div>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                Nama Lengkap
              </label>
              <Input
                name="full_name"
                placeholder="Contoh: Anissa Rahmawati"
                required
                autoComplete="name"
                className="bg-white text-sm"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                Alamat Email
              </label>
              <Input
                name="email"
                type="email"
                placeholder="nama@email.com"
                required
                autoComplete="email"
                className="bg-white text-sm"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  required
                  autoComplete="new-password"
                  className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 pr-10 text-sm text-mazelia-charcoal placeholder:text-mazelia-taupe/70 transition-all focus:border-mazelia-gold focus:outline-none focus:ring-2 focus:ring-mazelia-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mazelia-taupe hover:text-mazelia-charcoal p-1 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ketik ulang kata sandi"
                  required
                  autoComplete="new-password"
                  className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 pr-10 text-sm text-mazelia-charcoal placeholder:text-mazelia-taupe/70 transition-all focus:border-mazelia-gold focus:outline-none focus:ring-2 focus:ring-mazelia-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mazelia-taupe hover:text-mazelia-charcoal p-1 transition-colors"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-[11px] text-mazelia-taupe leading-relaxed pt-1">
              Dengan mendaftar, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi MAZÉLIA sesuai UU PDP No. 27/2022.
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full shadow-luxury-gold text-sm font-medium tracking-wide mt-2 bg-mazelia-gold hover:bg-mazelia-gold-dark text-white border-0 transition-all duration-200" 
              isLoading={isPending}
            >
              Daftar Akun MAZÉLIA
            </Button>
          </form>

          {/* Login Link */}
          <div className="pt-5 border-t border-mazelia-border/80 text-center text-xs text-mazelia-charcoal-muted space-y-1">
            <p>
              Sudah memiliki akun?{' '}
              <Link href="/login" className="font-bold text-mazelia-bronze hover:text-mazelia-gold-dark transition-colors">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-mazelia-taupe mt-6">
          MAZÉLIA — Platform Perencanaan Acara Indonesia
        </div>
      </div>
    </div>
  );
}
