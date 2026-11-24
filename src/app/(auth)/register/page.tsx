'use client';

import * as React from 'react';
import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction } from '@/actions/auth-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Sparkles, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-mazelia-ivory">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-mazelia-taupe hover:text-mazelia-charcoal transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
        </Link>
        <Link href="/" className="inline-block">
          <h2 className="font-serif text-3xl font-bold tracking-wider text-mazelia-charcoal">
            MAZÉLIA
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-mazelia-taupe font-medium -mt-1">
            Events • Moments • Memories
          </p>
        </Link>
        <h3 className="font-serif text-xl font-semibold text-mazelia-charcoal pt-2">
          Buat Akun Perencanaan Gratis
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="rounded-2xl border border-mazelia-border bg-white py-8 px-6 sm:px-10 shadow-luxury space-y-6">
          {state?.error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{state.error}</span>
            </div>
          )}

          {state?.success && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{state.success}</p>
                <Link href="/login" className="underline font-bold mt-1 inline-block">
                  Klik di sini untuk Masuk
                </Link>
              </div>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <Input
              name="full_name"
              label="Nama Lengkap"
              placeholder="Contoh: Anissa Rahmawati"
              required
            />
            <Input
              name="email"
              type="email"
              label="Alamat Email"
              placeholder="nama@email.com"
              required
              autoComplete="email"
            />
            <Input
              name="password"
              type="password"
              label="Kata Sandi"
              placeholder="Minimal 6 karakter"
              required
              autoComplete="new-password"
            />
            <Input
              name="confirmPassword"
              type="password"
              label="Ulangi Kata Sandi"
              placeholder="Ketik ulang kata sandi"
              required
              autoComplete="new-password"
            />

            <div className="text-[11px] text-mazelia-taupe leading-relaxed">
              Dengan mendaftar, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi MAZÉLIA sesuai UU PDP No. 27/2022.
            </div>

            <Button type="submit" size="md" className="w-full shadow-luxury-gold mt-2" isLoading={isPending}>
              Daftar Akun MAZÉLIA
            </Button>
          </form>

          {/* Login Link */}
          <div className="pt-4 border-t border-mazelia-border/60 text-center text-xs text-mazelia-taupe">
            Sudah memiliki akun?{' '}
            <Link href="/login" className="font-bold text-mazelia-bronze hover:text-mazelia-gold-dark">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
