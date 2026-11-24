'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { updateInvitationAction } from '@/actions/invitation-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle2, AlertCircle, Save, ArrowLeft, Heart, Calendar, Gift } from 'lucide-react';
import Link from 'next/link';

interface EditInvitationFormProps {
  invitation: any;
}

export function EditInvitationForm({ invitation }: EditInvitationFormProps) {
  const [state, formAction, isPending] = useActionState(updateInvitationAction, null);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EAE5DC]">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-[#846B48] hover:text-[#302D29] font-medium mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard Admin
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
            Pengaturan Data Undangan & Acara
          </h1>
          <p className="text-xs text-[#6E675F] mt-1">
            Ubah nama mempelai, tanggal acara, waktu sesi, lokasi, dan detail amplop digital.
          </p>
        </div>
      </div>

      {/* Alerts */}
      {state?.error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      {state?.success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{state.success}</span>
        </div>
      )}

      {/* Main Form */}
      <form action={formAction} className="space-y-8">
        <input type="hidden" name="id" value={invitation.id} />

        {/* SECTION 1: Judul & Informasi Mempelai */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Heart className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Identitas & Mempelai
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Judul Undangan
              </label>
              <Input
                name="title"
                defaultValue={invitation.title}
                placeholder="The Wedding of Sarah & Brian"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Nama Lengkap Pria
                </label>
                <Input
                  name="groom_name"
                  defaultValue={invitation.groom_name}
                  placeholder="Brian Pratama, S.T."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Nama Panggilan Pria
                </label>
                <Input
                  name="groom_nickname"
                  defaultValue={invitation.groom_nickname}
                  placeholder="Brian"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Orang Tua Pria
              </label>
              <Input
                name="groom_parents"
                defaultValue={invitation.groom_parents}
                placeholder="Putra pertama dari Bpk. Bambang & Ibu Ratna"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Nama Lengkap Wanita
                </label>
                <Input
                  name="bride_name"
                  defaultValue={invitation.bride_name}
                  placeholder="Sarah Almira, S.Ds."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Nama Panggilan Wanita
                </label>
                <Input
                  name="bride_nickname"
                  defaultValue={invitation.bride_nickname}
                  placeholder="Sarah"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Orang Tua Wanita
              </label>
              <Input
                name="bride_parents"
                defaultValue={invitation.bride_parents}
                placeholder="Putri kedua dari Bpk. Hendra & Ibu Sri"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Akad / Sesi 1 */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Calendar className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Sesi 1: Akad Nikah / Pemberkatan
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Sesi
              </label>
              <Input
                name="ceremony_title"
                defaultValue={invitation.ceremony_title}
                placeholder="Akad Nikah & Upacara Adat"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Tanggal
                </label>
                <Input
                  type="date"
                  name="ceremony_date"
                  defaultValue={invitation.ceremony_date}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Jam Mulai
                </label>
                <Input
                  type="time"
                  name="ceremony_start_time"
                  defaultValue={invitation.ceremony_start_time}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Jam Selesai
                </label>
                <Input
                  type="time"
                  name="ceremony_end_time"
                  defaultValue={invitation.ceremony_end_time}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Tempat / Venue
              </label>
              <Input
                name="ceremony_location"
                defaultValue={invitation.ceremony_location}
                placeholder="The Dharmawangsa Poolside"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Alamat Lengkap
              </label>
              <Input
                name="ceremony_address"
                defaultValue={invitation.ceremony_address}
                placeholder="Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Link Google Maps
              </label>
              <Input
                name="ceremony_maps_url"
                defaultValue={invitation.ceremony_maps_url}
                placeholder="https://maps.google.com/?q=..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Resepsi / Sesi 2 */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Calendar className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Sesi 2: Resepsi Pernikahan
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Sesi
              </label>
              <Input
                name="reception_title"
                defaultValue={invitation.reception_title}
                placeholder="Resepsi Pernikahan"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Tanggal
                </label>
                <Input
                  type="date"
                  name="reception_date"
                  defaultValue={invitation.reception_date}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Jam Mulai
                </label>
                <Input
                  type="time"
                  name="reception_start_time"
                  defaultValue={invitation.reception_start_time}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Jam Selesai
                </label>
                <Input
                  type="time"
                  name="reception_end_time"
                  defaultValue={invitation.reception_end_time}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Tempat / Venue
              </label>
              <Input
                name="reception_location"
                defaultValue={invitation.reception_location}
                placeholder="Grand Ballroom The Dharmawangsa"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Alamat Lengkap
              </label>
              <Input
                name="reception_address"
                defaultValue={invitation.reception_address}
                placeholder="Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Link Google Maps
              </label>
              <Input
                name="reception_maps_url"
                defaultValue={invitation.reception_maps_url}
                placeholder="https://maps.google.com/?q=..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Amplop Digital */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Gift className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Amplop Digital & Rekening
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Bank
              </label>
              <Input
                name="bank_name_1"
                defaultValue={invitation.bank_name_1}
                placeholder="BCA / Mandiri / BNI"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nomor Rekening
              </label>
              <Input
                name="bank_account_1"
                defaultValue={invitation.bank_account_1}
                placeholder="5271928391"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Atas Nama
              </label>
              <Input
                name="bank_holder_1"
                defaultValue={invitation.bank_holder_1}
                placeholder="Brian Pratama"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 sticky bottom-4 z-20 bg-white/90 backdrop-blur p-4 rounded-2xl border border-[#EAE5DC] shadow-luxury">
          <Link href="/admin">
            <Button variant="outline" size="md">
              Batal
            </Button>
          </Link>
          <Button
            type="submit"
            size="md"
            className="shadow-luxury-gold gap-2 bg-[#B69A72] hover:bg-[#A0845E] text-white"
            isLoading={isPending}
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
