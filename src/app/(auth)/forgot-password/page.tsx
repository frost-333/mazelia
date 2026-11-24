'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
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
      setError(err?.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-mazelia-ivory">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-mazelia-taupe hover:text-mazelia-charcoal transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Halaman Masuk
        </Link>
        <h2 className="font-serif text-3xl font-bold tracking-wider text-mazelia-charcoal">
          MAZÉLIA
        </h2>
        <h3 className="font-serif text-xl font-semibold text-mazelia-charcoal pt-2">
          Pemulihan Kata Sandi
        </h3>
        <p className="text-xs text-mazelia-taupe max-w-xs mx-auto">
          Masukkan alamat email akun Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="rounded-2xl border border-mazelia-border bg-white py-8 px-6 sm:px-10 shadow-luxury space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-mazelia-charcoal">Tautan Terkirim</h4>
              <p className="text-xs text-mazelia-taupe leading-relaxed">
                Silakan periksa kotak masuk atau folder spam email <span className="font-semibold text-mazelia-charcoal">{email}</span> untuk instruksi pemulihan.
              </p>
              <Link href="/login" className="inline-block pt-2">
                <Button variant="outline" size="sm">
                  Kembali ke Halaman Masuk
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Alamat Email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="md" className="w-full shadow-luxury-gold" isLoading={isLoading}>
                Kirim Tautan Pemulihan
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
