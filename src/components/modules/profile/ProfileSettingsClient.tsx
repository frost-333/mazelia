'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { Profile } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { updateProfileAction } from '@/actions/auth-actions';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ProfileSettingsClientProps {
  profile?: Profile | null;
  email: string;
}

export function ProfileSettingsClient({ profile, email }: ProfileSettingsClientProps) {
  const [state, formAction, isUpdating] = useActionState(updateProfileAction, null);

  return (
    <div className="rounded-2xl border border-mazelia-border bg-white p-6 sm:p-8 shadow-luxury space-y-6">
      {state?.error && (
        <div className="p-3.5 rounded-xl bg-red-50 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {state?.success && (
        <div className="p-3.5 rounded-xl bg-emerald-50 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{state.success}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light mb-1.5">
            Alamat Email (Akun)
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="flex w-full rounded-lg border border-mazelia-border bg-mazelia-ivory-warm/60 px-3.5 py-2.5 text-sm text-mazelia-charcoal cursor-not-allowed opacity-80"
          />
          <p className="text-[11px] text-mazelia-taupe mt-1">Email akun tertaut dengan identitas login Anda.</p>
        </div>

        <Input
          name="full_name"
          label="Nama Lengkap"
          defaultValue={profile?.full_name || ''}
          placeholder="Nama Anda"
          required
        />

        <Input
          name="phone"
          label="Nomor WhatsApp"
          defaultValue={profile?.phone || ''}
          placeholder="Contoh: 081234567890"
        />

        <div className="pt-2 flex justify-end">
          <Button type="submit" size="md" className="shadow-luxury-gold" isLoading={isUpdating}>
            Simpan Perubahan Profil
          </Button>
        </div>
      </form>
    </div>
  );
}
