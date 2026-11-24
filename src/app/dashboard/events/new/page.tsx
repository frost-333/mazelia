'use client';

import * as React from 'react';
import Link from 'next/link';
import { useActionState } from 'react';
import { createEventAction } from '@/actions/event-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { ArrowLeft, Sparkles, AlertCircle, Heart, Gem, Cake, Wine, Users, Calendar } from 'lucide-react';

const CATEGORIES = [
  { name: 'Wedding', label: 'Pernikahan (Wedding)', icon: Heart },
  { name: 'Engagement', label: 'Lamaran & Tunangan', icon: Gem },
  { name: 'Birthday', label: 'Ulang Tahun (Birthday)', icon: Cake },
  { name: 'Anniversary', label: 'Anniversary', icon: Wine },
  { name: 'Family Gathering', label: 'Family Gathering', icon: Users },
  { name: 'Other', label: 'Acara Personal Lainnya', icon: Calendar },
];

export default function NewEventPage() {
  const [state, formAction, isPending] = useActionState(createEventAction, null);
  const [selectedCategory, setSelectedCategory] = React.useState('Wedding');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/dashboard/events"
        className="inline-flex items-center gap-1.5 text-xs text-mazelia-taupe hover:text-mazelia-charcoal transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Acara
      </Link>

      <DashboardHeader
        title="Buat Acara Baru"
        subtitle="Mulai rancang momen istimewa Anda. MAZÉLIA akan otomatis menyiapkan checklist tugas awal."
      />

      <div className="rounded-2xl border border-mazelia-border bg-white p-6 sm:p-10 shadow-luxury space-y-8">
        {state?.error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="category" value={selectedCategory} />

          {/* 1. Category Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-mazelia-bronze">
              1. Pilih Jenis Acara
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      isSelected
                        ? 'border-mazelia-gold bg-mazelia-gold-50 text-mazelia-bronze ring-2 ring-mazelia-gold/20 shadow-sm'
                        : 'border-mazelia-border bg-white text-mazelia-charcoal hover:border-mazelia-gold/60 hover:bg-mazelia-ivory/50'
                    }`}
                  >
                    <cat.icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-mazelia-gold' : 'text-mazelia-taupe'}`} />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Event Title & Description */}
          <div className="space-y-4 pt-2 border-t border-mazelia-border/60">
            <label className="block text-xs font-bold uppercase tracking-wider text-mazelia-bronze">
              2. Informasi Utama Acara
            </label>
            <Input
              name="name"
              label="Nama / Judul Acara"
              placeholder="Contoh: The Wedding of Dimas & Anissa"
              required
            />
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
                Deskripsi / Catatan Singkat
              </label>
              <textarea
                name="description"
                rows={2}
                placeholder="Tema, nuansa, atau catatan penting terkait acara..."
                className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal placeholder:text-mazelia-taupe/70 transition-all focus:border-mazelia-gold focus:outline-none focus:ring-2 focus:ring-mazelia-gold/20"
              />
            </div>
          </div>

          {/* 3. Date, Time & Location */}
          <div className="space-y-4 pt-2 border-t border-mazelia-border/60">
            <label className="block text-xs font-bold uppercase tracking-wider text-mazelia-bronze">
              3. Waktu & Lokasi Penyelenggaraan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="event_date"
                type="date"
                label="Tanggal Acara (Hari-H)"
                required
              />
              <Input
                name="event_time"
                type="time"
                label="Waktu Mulai (Opsional)"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="city"
                label="Kota / Wilayah"
                placeholder="Contoh: Jakarta Selatan"
                required
              />
              <Input
                name="location"
                label="Nama Gedung / Tempat (Opsional)"
                placeholder="Contoh: Balai Kartini / Rumah Mempelai"
              />
            </div>
          </div>

          {/* 4. Budget & Guests target */}
          <div className="space-y-4 pt-2 border-t border-mazelia-border/60">
            <label className="block text-xs font-bold uppercase tracking-wider text-mazelia-bronze">
              4. Target Anggaran & Tamu
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="estimated_budget"
                type="number"
                step="500000"
                label="Target Anggaran Keseluruhan (Rp)"
                placeholder="Contoh: 150000000"
              />
              <Input
                name="estimated_guest_count"
                type="number"
                label="Perkiraan Jumlah Tamu (Orang/Pax)"
                placeholder="Contoh: 300"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-mazelia-border flex items-center justify-end gap-3">
            <Link href="/dashboard/events">
              <Button variant="ghost" type="button">
                Batal
              </Button>
            </Link>
            <Button type="submit" size="md" className="shadow-luxury-gold gap-2" isLoading={isPending}>
              <Sparkles className="w-4 h-4" />
              Simpan & Buat Workspace Acara
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
