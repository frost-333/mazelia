'use client';

import * as React from 'react';
import { Share2, Copy, Check, MessageCircle, ExternalLink, Sparkles, UserCheck } from 'lucide-react';
import { formatDateIndo } from '@/lib/utils/formatters';

interface GuestLinkGeneratorProps {
  slug: string;
  groomNickname: string;
  brideNickname: string;
  ceremonyDate?: string;
  ceremonyLocation?: string;
}

export function GuestLinkGenerator({
  slug,
  groomNickname,
  brideNickname,
  ceremonyDate,
  ceremonyLocation,
}: GuestLinkGeneratorProps) {
  const [guestName, setGuestName] = React.useState('');
  const [category, setCategory] = React.useState('Keluarga');
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState(false);
  const [baseUrl, setBaseUrl] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const invitationUrl = baseUrl ? `${baseUrl}/${slug}` : `/${slug}`;
  const personalizedUrl = guestName.trim()
    ? `${invitationUrl}?to=${encodeURIComponent(guestName.trim())}`
    : invitationUrl;

  const dateText = ceremonyDate ? formatDateIndo(ceremonyDate) : 'Hari Bahagia';
  const locationText = ceremonyLocation || 'Lokasi Acara';

  const waMessage = `Kepada Yth.
Bapak/Ibu/Saudara/i: ${guestName.trim() || '[Nama Tamu]'}

Assalamu’alaikum Wr. Wb. / Salam Sejahtera,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri momen istimewa pernikahan kami:

💍 ${groomNickname} & ${brideNickname} 💍

📅 ${dateText}
📍 ${locationText}

Untuk detail informasi acara, waktu, lokasi, serta konfirmasi kehadiran (RSVP), silakan mengakses tautan undangan berikut:
👉 ${personalizedUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih atas segala perhatian dan doa restunya.

Salam hangat,
${groomNickname} & ${brideNickname} & Keluarga`;

  const copyLink = () => {
    navigator.clipboard.writeText(personalizedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(waMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const shareToWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#EAE5DC]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FAF8F4] text-[#846B48] border border-[#B69A72]/30 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#302D29]">
              Generator Link Tamu & WhatsApp
            </h2>
            <p className="text-xs text-[#6E675F]">
              Buat tautan personal dengan nama tamu dan bagikan pesan undangan resmi dalam satu klik.
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#B69A72]/10 text-[#846B48] border border-[#B69A72]/20 text-[11px] font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B69A72]" />
          Format Elegan
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Input */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641] flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#B69A72]" />
              <span>Nama Tamu Undangan</span>
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Contoh: Bpk. Bambang & Keluarga atau Anisa Rahma"
              className="w-full rounded-xl border border-[#EAE5DC] px-4 py-2.5 text-sm focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
            />
            <p className="text-[11px] text-[#9B9185]">
              Nama ini akan langsung tertera di cover pembuka undangan saat tamu membuka link.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
              Kategori Hubungan (Label Internal)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#EAE5DC] px-4 py-2.5 text-sm bg-white focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
            >
              <option value="Keluarga">Keluarga</option>
              <option value="Sahabat">Sahabat</option>
              <option value="Rekan Kerja">Rekan Kerja</option>
              <option value="VIP">Tamu VIP</option>
              <option value="Umum">Umum</option>
            </select>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641]">
              Hasil Tautan Personal
            </label>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC]">
              <input
                readOnly
                value={personalizedUrl}
                className="w-full bg-transparent text-xs text-[#4A4641] font-mono px-2 py-1 outline-none truncate"
              />
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EAE5DC] text-xs font-semibold text-[#846B48] hover:bg-gray-50 shrink-0 shadow-sm transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Pesan WhatsApp */}
        <div className="flex flex-col justify-between space-y-4 bg-[#FAF8F4] p-5 rounded-2xl border border-[#EAE5DC]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#846B48]">
                Preview Teks WhatsApp
              </span>
              <span className="text-[10px] text-[#9B9185]">Siap dikirim ke WhatsApp</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#EAE5DC] text-xs text-[#4A4641] font-sans leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-all shadow-inner">
              {waMessage}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={shareToWhatsApp}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim via WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={copyMessage}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#EAE5DC] text-xs font-semibold text-[#4A4641] hover:bg-gray-50 shadow-sm transition-all active:scale-95"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Teks Tersalin' : 'Salin Teks'}</span>
            </button>

            <a
              href={personalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-white border border-[#EAE5DC] text-xs font-medium text-[#846B48] hover:bg-gray-50 transition-all"
              title="Tes Buka Tautan"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
