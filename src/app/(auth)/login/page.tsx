'use client';

import * as React from 'react';
import Link from 'next/link';
import { useActionState } from 'react';
import { loginAction } from '@/actions/auth-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

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
          Masuk ke Ruang Kerja Acara Anda
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

          <form action={formAction} className="space-y-4">
            <Input
              name="email"
              type="email"
              label="Alamat Email"
              placeholder="nama@email.com"
              required
              autoComplete="email"
            />
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                  Kata Sandi
                </label>
                <Link href="/forgot-password" className="text-xs text-mazelia-bronze hover:underline">
                  Lupa sandi?
                </Link>
              </div>
              <Input
                name="password"
                type="password"
                placeholder="Minimal 6 karakter"
                required
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" size="md" className="w-full shadow-luxury-gold mt-2" isLoading={isPending}>
              Masuk ke MAZÉLIA
            </Button>
          </form>

          {/* Registration link */}
          <div className="pt-4 border-t border-mazelia-border/60 text-center text-xs text-mazelia-taupe">
            Belum memiliki akun?{' '}
            <Link href="/register" className="font-bold text-mazelia-bronze hover:text-mazelia-gold-dark">
              Daftar Gratis Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
