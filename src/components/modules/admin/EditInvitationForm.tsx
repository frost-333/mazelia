'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { updateInvitationAction } from '@/actions/invitation-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  ArrowLeft, 
  Heart, 
  Calendar, 
  Gift, 
  Quote, 
  Music, 
  Image as ImageIcon, 
  Instagram, 
  Globe,
  Camera,
  BookOpen,
  ShieldCheck,
  FileText,
  Phone,
  Eye,
  Play,
  Palette
} from 'lucide-react';
import Link from 'next/link';
import { WEDDING_THEMES, WeddingThemeId } from '@/lib/constants/themes';

interface EditInvitationFormProps {
  invitation: any;
}

const BGM_PRESETS = [
  {
    name: 'Mixkit - Romantic Wedding Harp & Strings',
    url: 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-harp-and-strings-1033.mp3',
  },
  {
    name: 'Mixkit - Beautiful Dream (Soft Acoustic Piano)',
    url: 'https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3',
  },
  {
    name: 'Mixkit - Gentle Romance & Strings',
    url: 'https://assets.mixkit.co/music/preview/mixkit-gentle-romance-458.mp3',
  },
  {
    name: 'Mixkit - Serene Sunset Wedding Walk',
    url: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
  },
  {
    name: 'Mixkit - Sweet Memories Acoustic Guitar',
    url: 'https://assets.mixkit.co/music/preview/mixkit-sweet-memories-638.mp3',
  },
];

export function EditInvitationForm({ invitation }: EditInvitationFormProps) {
  const [state, formAction, isPending] = useActionState(updateInvitationAction, null);

  const [musicUrl, setMusicUrl] = React.useState(invitation.music_url || '');
  const [statusVal, setStatusVal] = React.useState(invitation.status || 'active');
  const [selectedTheme, setSelectedTheme] = React.useState<WeddingThemeId>(
    (invitation.theme in WEDDING_THEMES ? invitation.theme : 'champagne_gold') as WeddingThemeId
  );

  const galleryInitial = Array.isArray(invitation.gallery_urls) ? invitation.gallery_urls : [];
  const [galleryInputs, setGalleryInputs] = React.useState<string[]>([
    galleryInitial[0] || '',
    galleryInitial[1] || '',
    galleryInitial[2] || '',
    galleryInitial[3] || '',
    galleryInitial[4] || '',
    galleryInitial[5] || '',
  ]);

  const loveStoryInitial = Array.isArray(invitation.love_story) ? invitation.love_story : [];
  const defaultMilestones = [
    { year: '2020', title: 'Pertama Berjumpa', description: 'Takdir mempertemukan kami dalam sebuah kegiatan di kampus, di mana percakapan sederhana menjadi awal kisah panjang kami.' },
    { year: '2022', title: 'Menjalin Komitmen', description: 'Setelah melalui berbagai cerita dan saling mengenal karakter satu sama lain, kami memutuskan untuk melangkah bersama.' },
    { year: '2025', title: 'Momen Lamaran', description: 'Di hadapan keluarga besar kedua belah pihak, niat suci kami diikat dalam sebuah ikrar pertunangan yang hangat.' },
    { year: '2027', title: 'Hari Bahagia', description: 'Memulai lembaran hidup baru sebagai pasangan suami istri, memohon doa restu dalam ikatan pernikahan yang suci.' },
  ];

  const [storyInputs, setStoryInputs] = React.useState([
    loveStoryInitial[0] || defaultMilestones[0],
    loveStoryInitial[1] || defaultMilestones[1],
    loveStoryInitial[2] || defaultMilestones[2],
    loveStoryInitial[3] || defaultMilestones[3],
  ]);

  const handleGalleryChange = (index: number, val: string) => {
    const updated = [...galleryInputs];
    updated[index] = val;
    setGalleryInputs(updated);
  };

  const handleStoryChange = (index: number, field: 'year' | 'title' | 'description', val: string) => {
    const updated = [...storyInputs];
    updated[index] = { ...updated[index], [field]: val };
    setStoryInputs(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAE5DC] gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-[#846B48] hover:text-[#302D29] font-medium mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Katalog Klien
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
            Pengaturan Data Undangan & Acara
          </h1>
          <p className="text-xs text-[#6E675F] mt-1">
            Ubah nama mempelai, tanggal acara, sesi, amplop digital, galeri foto, kisah cinta, dan status penerbitan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/${invitation.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EAE5DC] text-xs font-semibold text-[#846B48] hover:bg-[#FAF8F4] transition-all shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Tampilan Web</span>
          </a>
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

        {/* SECTION 0: Status & Catatan Agensi */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <ShieldCheck className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Status Publikasi & Manajemen Agensi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Status Publikasi Undangan
              </label>
              <select
                name="status"
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-[#EAE5DC] bg-white text-xs font-medium focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20 text-[#302D29]"
              >
                <option value="active">🟢 Active / Live Online (Dapat Dibuka Publik)</option>
                <option value="draft">🟡 Draft (Sedang Disiapkan / Terkunci)</option>
                <option value="archived">⚪ Archived (Acara Selesai / Arsip)</option>
              </select>
              <p className="text-[10px] text-[#9B9185]">
                Pilih 'Draft' saat undangan sedang dalam pengerjaan awal agar tamu belum bisa mengakses.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#B69A72]" />
                <span>Nomor WhatsApp Klien</span>
              </label>
              <Input
                name="client_phone"
                defaultValue={invitation.client_phone || ''}
                placeholder="Contoh: 081234567890"
              />
              <p className="text-[10px] text-[#9B9185]">Kontak langsung mempelai untuk koordinasi agensi.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#B69A72]" />
                <span>Catatan Pesanan Agensi</span>
              </label>
              <Input
                name="client_notes"
                defaultValue={invitation.client_notes || ''}
                placeholder="Paket Luxury, DP 50%, Lunas H-7"
              />
              <p className="text-[10px] text-[#9B9185]">Catatan internal (hanya terlihat oleh admin agensi).</p>
            </div>
          </div>
        </div>

        {/* SECTION TEMA: Pilihan Tema Visual Undangan */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Palette className="w-5 h-5 text-[#B69A72]" />
            <div>
              <h2 className="font-serif text-lg font-bold text-[#302D29]">
                Tema Desain & Palet Warna Undangan
              </h2>
              <p className="text-xs text-[#6E675F]">
                Pilih konsep estetika untuk undangan digital klien ini. Setiap tema memiliki palet warna, ornamen, dan tipografi khusus.
              </p>
            </div>
          </div>

          <input type="hidden" name="theme" value={selectedTheme} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(WEDDING_THEMES).map((thm) => {
              const isSelected = selectedTheme === thm.id;
              return (
                <div
                  key={thm.id}
                  onClick={() => setSelectedTheme(thm.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                    isSelected
                      ? 'border-[#B69A72] bg-[#FAF8F4] shadow-md scale-[1.01]'
                      : 'border-[#EAE5DC] bg-white hover:border-[#B69A72]/40 hover:bg-[#FAF8F4]/40'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Top Row: Badge & Swatches */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#EAE5DC] text-[#846B48]">
                        {thm.badge}
                      </span>

                      {/* Swatch dots */}
                      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-[#EAE5DC]">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: thm.swatch[0] }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: thm.swatch[1] }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: thm.swatch[2] }}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#302D29]">
                        {thm.name}
                      </h4>
                      <p className="text-[11px] text-[#6E675F] leading-relaxed pt-0.5">
                        {thm.subtitle}
                      </p>
                      <p className="text-[10px] text-[#846B48] font-medium pt-1.5">
                        Transisi: {thm.openingLabel}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EAE5DC]/60 flex items-center justify-between text-[11px] gap-2">
                    <span className={isSelected ? 'text-[#846B48] font-bold' : 'text-[#9B9185]'}>
                      {isSelected ? '✓ Tema Aktif' : 'Pilih Tema Ini'}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/${invitation.slug}?preview=true&previewTheme=${thm.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-[#EAE5DC] text-[10px] font-semibold text-[#846B48] hover:border-[#B69A72] hover:bg-[#FAF8F4] transition-colors"
                        title="Pratinjau langsung tema ini"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </a>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                          isSelected
                            ? 'border-[#B69A72] bg-[#B69A72] text-white'
                            : 'border-[#EAE5DC] bg-white'
                        }`}
                      >
                        {isSelected && '✓'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 1: Judul & Informasi Mempelai */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Heart className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Identitas & Mempelai
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#B69A72]" />
                  <span>Slug URL Undangan (/...)</span>
                </label>
                <Input
                  name="slug"
                  defaultValue={invitation.slug === 'sarah-brian' ? 'fadhil-mazaya' : (invitation.slug || 'fadhil-mazaya')}
                  placeholder="fadhil-mazaya"
                  required
                />
                <p className="text-[10px] text-[#9B9185]">Format huruf kecil dan tanda hubung, contoh: fadhil-mazaya</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
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
                  Panggilan Pria
                </label>
                <Input
                  name="groom_nickname"
                  defaultValue={invitation.groom_nickname}
                  placeholder="Brian"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Instagram Pria (Opsional)
                </label>
                <Input
                  name="groom_instagram"
                  defaultValue={invitation.groom_instagram || ''}
                  placeholder="brianpratama (tanpa @)"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Keterangan Orang Tua Pria
              </label>
              <Input
                name="groom_parents"
                defaultValue={invitation.groom_parents}
                placeholder="Putra pertama dari Bpk. Bambang & Ibu Sulastri"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#EAE5DC]">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Nama Lengkap Wanita
                </label>
                <Input
                  name="bride_name"
                  defaultValue={invitation.bride_name}
                  placeholder="Sarah Almira, B.A."
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Panggilan Wanita
                </label>
                <Input
                  name="bride_nickname"
                  defaultValue={invitation.bride_nickname}
                  placeholder="Sarah"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Instagram Wanita (Opsional)
                </label>
                <Input
                  name="bride_instagram"
                  defaultValue={invitation.bride_instagram || ''}
                  placeholder="sarahalmira (tanpa @)"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Keterangan Orang Tua Wanita
              </label>
              <Input
                name="bride_parents"
                defaultValue={invitation.bride_parents}
                placeholder="Putri kedua dari Bpk. Hendra & Ibu Ratna"
                required
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Kutipan / Ayat Suci */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Quote className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Kutipan & Ayat Suci
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Teks Kutipan / Ayat
              </label>
              <textarea
                name="quote_text"
                rows={3}
                defaultValue={invitation.quote_text || ''}
                placeholder="Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."
                className="w-full p-3 rounded-xl border border-[#EAE5DC] bg-white text-xs leading-relaxed focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Sumber Kutipan (Surah / Kitab)
              </label>
              <Input
                name="quote_source"
                defaultValue={invitation.quote_source || ''}
                placeholder="QS. Ar-Rum: 21"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Rangkaian Acara (Sesi 1: Akad & Sesi 2: Resepsi) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Calendar className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Rangkaian Acara (Akad & Resepsi)
            </h2>
          </div>

          {/* Sesi 1: Akad */}
          <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#846B48] block">
              Sesi 1: Akad Nikah / Pemberkatan
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Nama Sesi
                </label>
                <Input
                  name="ceremony_title"
                  defaultValue={invitation.ceremony_title}
                  placeholder="Akad Nikah"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Tanggal Acara
                </label>
                <Input
                  type="date"
                  name="ceremony_date"
                  defaultValue={invitation.ceremony_date}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Waktu Mulai
                  </label>
                  <Input
                    name="ceremony_start_time"
                    defaultValue={invitation.ceremony_start_time}
                    placeholder="08:00"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Selesai
                  </label>
                  <Input
                    name="ceremony_end_time"
                    defaultValue={invitation.ceremony_end_time}
                    placeholder="10:30"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Nama Tempat / Gedung
                </label>
                <Input
                  name="ceremony_location"
                  defaultValue={invitation.ceremony_location}
                  placeholder="Masjid Agung Sunda Kelapa"
                  required
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
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Alamat Lengkap
              </label>
              <Input
                name="ceremony_address"
                defaultValue={invitation.ceremony_address}
                placeholder="Jl. Taman Sunda Kelapa No. 16, Menteng, Jakarta Pusat"
                required
              />
            </div>
          </div>

          {/* Sesi 2: Resepsi */}
          <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#846B48] block">
              Sesi 2: Resepsi Pernikahan
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Tanggal Acara
                </label>
                <Input
                  type="date"
                  name="reception_date"
                  defaultValue={invitation.reception_date}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Waktu Mulai
                  </label>
                  <Input
                    name="reception_start_time"
                    defaultValue={invitation.reception_start_time}
                    placeholder="11:30"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Selesai
                  </label>
                  <Input
                    name="reception_end_time"
                    defaultValue={invitation.reception_end_time}
                    placeholder="14:30"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                  Nama Tempat / Gedung
                </label>
                <Input
                  name="reception_location"
                  defaultValue={invitation.reception_location}
                  placeholder="The Dharmawangsa Hotel Poolside"
                  required
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
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                Alamat Lengkap
              </label>
              <Input
                name="reception_address"
                defaultValue={invitation.reception_address}
                placeholder="Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan"
                required
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Amplop Digital & Rekening Bank */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Gift className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Amplop Digital & Kado Fisik
            </h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#846B48]">
                Rekening Utama (Bank 1)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Nama Bank
                  </label>
                  <Input
                    name="bank_name_1"
                    defaultValue={invitation.bank_name_1 || ''}
                    placeholder="BCA / Mandiri / BNI"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Nomor Rekening
                  </label>
                  <Input
                    name="bank_account_1"
                    defaultValue={invitation.bank_account_1 || ''}
                    placeholder="5271928391"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Atas Nama
                  </label>
                  <Input
                    name="bank_holder_1"
                    defaultValue={invitation.bank_holder_1 || ''}
                    placeholder="Brian Pratama"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#EAE5DC]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#846B48]">
                Rekening Cadangan (Bank 2) — Opsional
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Nama Bank
                  </label>
                  <Input
                    name="bank_name_2"
                    defaultValue={invitation.bank_name_2 || ''}
                    placeholder="Mandiri / BNI / BRI"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Nomor Rekening
                  </label>
                  <Input
                    name="bank_account_2"
                    defaultValue={invitation.bank_account_2 || ''}
                    placeholder="1370019283912"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
                    Atas Nama
                  </label>
                  <Input
                    name="bank_holder_2"
                    defaultValue={invitation.bank_holder_2 || ''}
                    placeholder="Sarah Almira"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Media & Musik dengan Presets */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Music className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Media & Musik Latar Belakang
            </h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#B69A72]" />
                <span>URL Foto Sampul (Cover Image)</span>
              </label>
              <Input
                name="cover_image_url"
                defaultValue={invitation.cover_image_url || ''}
                placeholder="https://images.unsplash.com/..."
              />
              <p className="text-[10px] text-[#9B9185]">Tautan gambar berkualitas tinggi untuk sampul undangan dan preview OpenGraph.</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641] flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-[#B69A72]" />
                  <span>Audio / Musik Latar Belakang (MP3)</span>
                </label>
                <span className="text-[10px] text-[#846B48] font-medium">BGM Library Presets</span>
              </div>

              {/* BGM Preset Buttons */}
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC] space-y-2">
                <span className="text-[11px] font-semibold text-[#846B48] block">
                  Pilih Lagu Romantis Siap Pakai:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BGM_PRESETS.map((bgm, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMusicUrl(bgm.url)}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${
                        musicUrl === bgm.url
                          ? 'border-[#B69A72] bg-white text-[#846B48] font-semibold shadow-sm'
                          : 'border-[#EAE5DC] bg-white/70 hover:bg-white text-[#4A4641]'
                      }`}
                    >
                      <span className="truncate pr-2">{bgm.name}</span>
                      <Play className="w-3 h-3 shrink-0 text-[#B69A72]" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#6E675F]">
                  URL File Audio MP3 Kustom (Langsung Terisi):
                </label>
                <Input
                  name="music_url"
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  placeholder="https://assets.mixkit.co/...mp3"
                />
                <p className="text-[10px] text-[#9B9185]">
                  Bisa menggunakan preset di atas atau paste URL file audio MP3 kustom sendiri.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: Galeri Foto Prewedding (6 Slot) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <Camera className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Galeri Foto Prewedding (6 Slot)
            </h2>
          </div>

          <p className="text-xs text-[#6E675F]">
            Masukkan tautan URL foto prewedding mempelai (misalnya dari Unsplash, Cloudinary, Imgur, atau Supabase Storage). Foto akan otomatis tampil di grid galeri foto undangan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryInputs.map((val, idx) => (
              <div key={idx} className="space-y-2 p-3.5 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#846B48]">
                  <span>Foto Prewedding #{idx + 1}</span>
                  {val && (
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Ada Foto
                    </span>
                  )}
                </div>

                <Input
                  name={`gallery_${idx + 1}`}
                  value={val}
                  onChange={(e) => handleGalleryChange(idx, e.target.value)}
                  placeholder={`https://images.unsplash.com/...foto-${idx + 1}`}
                />

                {val ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 border border-[#EAE5DC] relative">
                    <img
                      src={val}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-lg bg-white/70 border border-dashed border-[#EAE5DC] flex items-center justify-center text-[10px] text-[#9B9185]">
                    Slot Foto Kosong
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: Kisah Cinta / Love Story (4 Milestone) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
            <BookOpen className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Kisah Cinta / Love Story Timeline (4 Momen)
            </h2>
          </div>

          <p className="text-xs text-[#6E675F]">
            Tuliskan 4 titik balik perjalanan cinta kedua mempelai menuju hari pernikahan untuk menginspirasi tamu undangan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storyInputs.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#846B48]">
                    Milestone #{idx + 1}
                  </span>
                  <span className="text-[10px] text-[#9B9185]">Momen {idx + 1}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-medium text-[#4A4641]">Tahun</label>
                    <Input
                      name={`story_year_${idx + 1}`}
                      value={item.year}
                      onChange={(e) => handleStoryChange(idx, 'year', e.target.value)}
                      placeholder="2020"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-medium text-[#4A4641]">Judul Momen</label>
                    <Input
                      name={`story_title_${idx + 1}`}
                      value={item.title}
                      onChange={(e) => handleStoryChange(idx, 'title', e.target.value)}
                      placeholder="Pertama Berjumpa"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-medium text-[#4A4641]">Cerita Singkat</label>
                  <textarea
                    name={`story_desc_${idx + 1}`}
                    rows={2}
                    value={item.description}
                    onChange={(e) => handleStoryChange(idx, 'description', e.target.value)}
                    placeholder="Ceritakan momen indah ini secara ringkas..."
                    className="w-full p-2.5 rounded-xl border border-[#EAE5DC] bg-white text-xs leading-relaxed focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
                  />
                </div>
              </div>
            ))}
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