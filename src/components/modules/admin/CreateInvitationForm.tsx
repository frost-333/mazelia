'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Calendar, 
  MapPin, 
  Globe, 
  Save, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { createInvitationAction } from '@/actions/invitation-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function CreateInvitationForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createInvitationAction, null);

  const [groomNickname, setGroomNickname] = React.useState('');
  const [brideNickname, setBrideNickname] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [autoSlug, setAutoSlug] = React.useState(true);

  // Auto-generate slug when nicknames change if autoSlug is true
  React.useEffect(() => {
    if (autoSlug && groomNickname && brideNickname) {
      const generated = `${groomNickname.toLowerCase().trim()}-${brideNickname.toLowerCase().trim()}`
        .replace(/[^a-z0-9-]/g, '-');
      setSlug(generated);
    }
  }, [groomNickname, brideNickname, autoSlug]);

  // If creation succeeds, redirect to client detail
  React.useEffect(() => {
    if (state?.success && state?.invitationId) {
      router.push(`/admin/invitations/${state.invitationId}`);
    }
  }, [state, router]);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EAE5DC]">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-[#846B48] hover:text-[#302D29] font-medium mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Katalog Klien
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
            Tambah Undangan Klien Baru
          </h1>
          <p className="text-xs text-[#6E675F] mt-1">
            Buat website undangan pernikahan baru untuk klien agensi Anda.
          </p>
        </div>
      </div>

      {/* Alert Error */}
      {state?.error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Main Form */}
      <form action={formAction} className="space-y-6">
        {/* Section 1: Mempelai */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Heart className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Identitas Kedua Mempelai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Lengkap Pria
              </label>
              <Input
                name="groom_name"
                placeholder="Contoh: Dimas Pratama, S.T."
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Panggilan Pria
              </label>
              <Input
                name="groom_nickname"
                value={groomNickname}
                onChange={(e) => setGroomNickname(e.target.value)}
                placeholder="Contoh: Dimas"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Lengkap Wanita
              </label>
              <Input
                name="bride_name"
                placeholder="Contoh: Anisa Rahma, S.Ked."
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Panggilan Wanita
              </label>
              <Input
                name="bride_nickname"
                value={brideNickname}
                onChange={(e) => setBrideNickname(e.target.value)}
                placeholder="Contoh: Anisa"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: URL & Judul Acara */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Globe className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Tautan URL & Judul Undangan
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Judul Undangan
              </label>
              <Input
                name="title"
                defaultValue={
                  groomNickname && brideNickname
                    ? `The Wedding of ${groomNickname} & ${brideNickname}`
                    : ''
                }
                placeholder="Contoh: The Wedding of Dimas & Anisa"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Custom Slug / Tautan Website
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-[11px] text-[#846B48] hover:underline"
                >
                  {autoSlug ? 'Edit Manual' : 'Auto dari Nama'}
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-[#EAE5DC] bg-[#FAF8F4] px-3.5 py-1.5 focus-within:border-[#B69A72] focus-within:ring-2 focus-within:ring-[#B69A72]/20">
                <span className="text-xs text-[#9B9185] font-mono">/</span>
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
                  }}
                  placeholder="dimas-anisa"
                  required
                  className="w-full bg-transparent text-xs text-[#302D29] font-mono px-1 py-1 outline-none"
                />
              </div>
              <p className="text-[10px] text-[#9B9185]">
                Tautan klien akan aktif di: <strong>localhost:3000/{slug || '[slug]'}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Waktu, Lokasi & Tema */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Calendar className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Waktu, Lokasi & Tema
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Tanggal Acara
              </label>
              <Input
                type="date"
                name="ceremony_date"
                defaultValue="2027-02-14"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Nama Tempat / Kota
              </label>
              <Input
                name="ceremony_location"
                placeholder="Contoh: Plataran Dharmawangsa, Jakarta"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
              Pilihan Preset Desain & Tema
            </label>
            <select
              name="theme"
              className="w-full rounded-xl border border-[#EAE5DC] px-4 py-2.5 text-xs bg-white focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
            >
              <option value="champagne_gold">Champagne Royale (Warm Ivory & Gold Klasik)</option>
              <option value="emerald_garden">Emerald Botanical Garden (Nuansa Hijau & Emas)</option>
              <option value="romantic_rose">Romantic Rose & Blush (Nuansa Merah Muda & Rose Gold)</option>
              <option value="javanese_heritage">Royal Heritage Nusantara (Adat Keraton & Batik Prada)</option>
              <option value="midnight_celestial">Midnight Celestial Glam (Pesta Malam & Kilau Sapphire)</option>
            </select>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
              Musik Latar Belakang (BGM Preset)
            </label>
            <select
              name="music_url"
              className="w-full rounded-xl border border-[#EAE5DC] px-4 py-2.5 text-xs bg-white focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
            >
              <option value="https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-harp-and-strings-1033.mp3">
                Mixkit - Romantic Wedding Harp & Strings
              </option>
              <option value="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3">
                Mixkit - Beautiful Dream (Soft Acoustic Piano)
              </option>
              <option value="https://assets.mixkit.co/music/preview/mixkit-gentle-romance-458.mp3">
                Mixkit - Gentle Romance & Strings
              </option>
              <option value="https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3">
                Mixkit - Serene Sunset Wedding Walk
              </option>
              <option value="https://assets.mixkit.co/music/preview/mixkit-sweet-memories-638.mp3">
                Mixkit - Sweet Memories Acoustic Guitar
              </option>
            </select>
            <p className="text-[10px] text-[#9B9185]">
              Dapat diubah atau diganti dengan file audio kustom kapan saja melalui menu Edit Acara.
            </p>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-3 pt-2">
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
            <span>Buat Undangan Klien</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
