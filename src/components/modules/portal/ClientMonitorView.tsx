'use client';

import * as React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MessageSquareHeart, 
  Send, 
  Copy, 
  Check, 
  Download, 
  Search, 
  Filter, 
  Share2, 
  Calendar, 
  MapPin, 
  Heart,
  Users
} from 'lucide-react';
import { formatDateIndo, formatTimeIndo } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ClientMonitorViewProps {
  invitation: any;
  initialWishes: any[];
}

export function ClientMonitorView({ invitation, initialWishes }: ClientMonitorViewProps) {
  const [wishes] = React.useState<any[]>(initialWishes);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterAttendance, setFilterAttendance] = React.useState<string>('all');
  const [quickGuestName, setQuickGuestName] = React.useState('');
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [baseUrl, setBaseUrl] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  // Metrics
  const attendingWishes = wishes.filter((w) => w.attendance === 'attending');
  const maybeWishes = wishes.filter((w) => w.attendance === 'maybe');
  const declinedWishes = wishes.filter((w) => w.attendance === 'not_attending');
  const totalPax = attendingWishes.reduce((sum, w) => sum + (w.pax_count || 1), 0);

  // Filtered wishes
  const filteredWishes = wishes.filter((w) => {
    const matchesSearch =
      w.sender_name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      w.message.toLowerCase().includes(searchQuery.toLowerCase().trim());

    if (!matchesSearch) return false;
    if (filterAttendance === 'all') return true;
    return w.attendance === filterAttendance;
  });

  const getGuestUrl = (name: string) => {
    if (!name.trim()) return `${baseUrl || ''}/${invitation.slug}`;
    return `${baseUrl || ''}/${invitation.slug}?to=${encodeURIComponent(name.trim())}`;
  };

  const getWhatsAppMessage = (name: string) => {
    const url = getGuestUrl(name);
    return `Kepada Yth.
Bapak/Ibu/Saudara/i: *${name || '[Nama Tamu]'}*

Assalamu'alaikum Wr. Wb / Salam Sejahtera,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri momen istimewa pernikahan kami:

💍 *${invitation.groom_nickname} & ${invitation.bride_nickname}* 💍

Untuk informasi lengkap mengenai acara dan konfirmasi kehadiran, silakan buka tautan undangan digital kami berikut:
${url}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.`;
  };

  const handleCopyLink = () => {
    const url = getGuestUrl(quickGuestName);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const exportCSV = () => {
    if (wishes.length === 0) return;

    let csvContent = '\uFEFF"Nama Tamu","Status Kehadiran","Jumlah Pax","Hubungan","Pesan Doa","Waktu"\n';
    wishes.forEach((w) => {
      const attLabel =
        w.attendance === 'attending'
          ? 'Hadir'
          : w.attendance === 'maybe'
          ? 'Ragu-ragu'
          : 'Berhalangan';
      const cleanMsg = (w.message || '').replace(/"/g, '""');
      const cleanRel = (w.relationship || '').replace(/"/g, '""');
      csvContent += `"${w.sender_name}","${attLabel}","${w.pax_count || 1}","${cleanRel}","${cleanMsg}","${w.created_at}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Rekap_RSVP_${invitation.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-white via-white to-[#FAF8F4] rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            Live RSVP Monitor
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
          The Wedding of {invitation.groom_nickname} & {invitation.bride_nickname}
        </h1>
        <p className="text-xs sm:text-sm text-[#6E675F] flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>📅 {formatDateIndo(invitation.ceremony_date)}</span>
          <span>•</span>
          <span>📍 {invitation.ceremony_location}</span>
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9B9185]">
            <span className="font-medium">Hadir</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#302D29]">
            {attendingWishes.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">
            Total {totalPax} Pax Hadir
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9B9185]">
            <span className="font-medium">Ragu-ragu</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#302D29]">
            {maybeWishes.length}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            Menunggu kepastian
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9B9185]">
            <span className="font-medium">Berhalangan</span>
            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
              <XCircle className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#302D29]">
            {declinedWishes.length}
          </div>
          <div className="text-[11px] text-gray-500 font-medium">
            Kirim doa restu
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9B9185]">
            <span className="font-medium">Total Ucapan</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F4] border border-[#B69A72]/30 flex items-center justify-center">
              <MessageSquareHeart className="w-4 h-4 text-[#B69A72]" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#302D29]">
            {wishes.length}
          </div>
          <div className="text-[11px] text-[#846B48] font-medium">
            Tercatat di buku tamu
          </div>
        </div>
      </div>

      {/* Quick WhatsApp Inviter for Bride & Groom */}
      <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#EAE5DC]">
          <Share2 className="w-5 h-5 text-[#B69A72]" />
          <div>
            <h2 className="font-serif text-base font-bold text-[#302D29]">
              Kirim Undangan WhatsApp Langsung dari HP
            </h2>
            <p className="text-xs text-[#6E675F]">
              Ketik nama teman atau kerabat, lalu klik tombol untuk langsung membuka aplikasi WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 space-y-1">
            <Input
              value={quickGuestName}
              onChange={(e) => setQuickGuestName(e.target.value)}
              placeholder="Ketik nama teman, contoh: Bpk. Rudi & Keluarga"
              className="text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(getWhatsAppMessage(quickGuestName))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Buka WA</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-xl bg-[#FAF8F4] hover:bg-[#F2EDE4] border border-[#EAE5DC] text-[#846B48] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              title="Salin Tautan"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wishes & Guestbook List */}
      <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE5DC]">
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-[#B69A72]" />
            <h2 className="font-serif text-base font-bold text-[#302D29]">
              Daftar Ucapan & Konfirmasi Kehadiran ({filteredWishes.length})
            </h2>
          </div>

          <Button
            type="button"
            onClick={exportCSV}
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs text-[#846B48] border-[#B69A72]/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Rekap Doa (CSV)</span>
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9185]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau pesan..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#EAE5DC] bg-white text-xs focus:border-[#B69A72] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setFilterAttendance('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterAttendance === 'all'
                  ? 'bg-[#B69A72] text-white'
                  : 'bg-[#FAF8F4] text-[#6E675F] hover:bg-gray-100'
              }`}
            >
              Semua ({wishes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterAttendance('attending')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterAttendance === 'attending'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Hadir ({attendingWishes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterAttendance('maybe')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterAttendance === 'maybe'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Ragu ({maybeWishes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterAttendance('not_attending')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterAttendance === 'not_attending'
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Berhalangan ({declinedWishes.length})
            </button>
          </div>
        </div>

        {/* Wishes Cards */}
        {filteredWishes.length === 0 ? (
          <div className="text-center py-12 text-[#9B9185] space-y-1">
            <p className="text-sm font-medium">Belum ada ucapan yang sesuai.</p>
            <p className="text-xs">Ucapan dan doa dari para tamu akan muncul di sini secara otomatis.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWishes.map((w, idx) => (
              <div
                key={w.id || idx}
                className="p-4 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC] space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#302D29]">
                        {w.sender_name}
                      </h4>
                      {w.relationship && (
                        <span className="text-[10px] text-[#846B48] block">
                          Hubungan: {w.relationship}
                        </span>
                      )}
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                        w.attendance === 'attending'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : w.attendance === 'maybe'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {w.attendance === 'attending'
                        ? `✓ Hadir (${w.pax_count || 1} Pax)`
                        : w.attendance === 'maybe'
                        ? '⏳ Ragu-ragu'
                        : '✕ Berhalangan'}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A4641] leading-relaxed pt-1">
                    "{w.message}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#EAE5DC]/60 text-[10px] text-[#9B9185]">
                  {w.created_at ? new Date(w.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}