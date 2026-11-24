'use client';

import * as React from 'react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  Gift, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  MailOpen, 
  Send, 
  Instagram, 
  ExternalLink,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { formatDateIndo, formatTimeIndo } from '@/lib/utils/formatters';
import { submitWishAction } from '@/actions/invitation-actions';

interface InvitationClientProps {
  invitation: any;
  wishes: any[];
  guestName?: string;
}

export function InvitationClient({ invitation, wishes, guestName }: InvitationClientProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [copiedBank, setCopiedBank] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [wishState, setWishState] = React.useState<{ error?: string; success?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Audio control
  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current && invitation.music_url) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log('Autoplay blocked:', e);
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setWishState(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const res = await submitWishAction(null, formData);
    setIsSubmitting(false);
    setWishState(res);
    if (res?.success) {
      form.reset();
    }
  };

  // Countdown timer calculation
  const targetDate = new Date(invitation.ceremony_date || new Date()).getTime();
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302D29] font-sans relative overflow-x-hidden selection:bg-[#B69A72]/20 selection:text-[#846B48]">
      {/* Background Audio */}
      {invitation.music_url && (
        <audio ref={audioRef} src={invitation.music_url} loop preload="auto" />
      )}

      {/* Floating Music Button */}
      {isOpen && invitation.music_url && (
        <button
          onClick={toggleMusic}
          aria-label="Toggle background music"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#B69A72]/30 shadow-luxury-gold flex items-center justify-center text-[#846B48] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      )}

      {/* 1. COVER / HERO OVERLAY (Sampul Undangan) */}
      {!isOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col justify-between items-center text-center p-8 bg-[#24221F] text-[#FAF8F4] overflow-hidden">
          {/* Subtle floral texture background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url(${invitation.cover_image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(4px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#24221F]/80 via-[#24221F]/90 to-[#24221F]" />

          {/* Top Label */}
          <div className="relative z-10 pt-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="font-serif tracking-[0.3em] uppercase text-xs text-[#B69A72]">
              The Wedding Invitation
            </span>
          </div>

          {/* Couple Names */}
          <div className="relative z-10 max-w-lg space-y-4 my-auto">
            <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F4] tracking-wide font-normal leading-tight">
              {invitation.groom_nickname || 'Brian'} <span className="font-serif italic text-[#B69A72]">&</span> {invitation.bride_nickname || 'Sarah'}
            </h1>
            <p className="text-xs sm:text-sm text-[#9B9185] tracking-widest uppercase">
              {formatDateIndo(invitation.ceremony_date)}
            </p>

            {guestName && (
              <div className="pt-6 pb-2">
                <span className="text-[11px] uppercase tracking-wider text-[#9B9185] block mb-1">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </span>
                <span className="inline-block px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-sm sm:text-base font-medium text-[#FAF8F4]">
                  {guestName}
                </span>
              </div>
            )}
          </div>

          {/* Open Button */}
          <div className="relative z-10 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              onClick={handleOpenInvitation}
              className="px-8 py-3.5 rounded-full bg-[#B69A72] hover:bg-[#A0845E] text-white font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 shadow-luxury-gold transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MailOpen className="w-4 h-4" />
              <span>Buka Undangan</span>
            </button>
            <p className="text-[10px] text-[#9B9185] mt-3">
              *Disarankan menggunakan audio untuk pengalaman terbaik
            </p>
          </div>
        </div>
      ) : null}

      {/* 2. MAIN INVITATION CONTENT (Scrollable Section) */}
      <main className="max-w-2xl mx-auto min-h-screen bg-white shadow-2xl relative border-x border-[#EAE5DC]">
        {/* Hero Header Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center p-8 bg-gradient-to-b from-[#FAF8F4] to-white overflow-hidden">
          <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#B69A72]/10 to-transparent pointer-events-none" />
          
          <div className="space-y-4 relative z-10 max-w-md animate-in fade-in duration-1000">
            <span className="font-serif tracking-[0.25em] uppercase text-xs text-[#846B48] font-medium block">
              Walimatul Ursy
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#302D29] font-normal tracking-wide">
              {invitation.groom_nickname} <span className="italic text-[#B69A72]">&</span> {invitation.bride_nickname}
            </h2>
            <div className="w-16 h-0.5 bg-[#B69A72] mx-auto my-3" />
            <p className="text-sm text-[#9B9185] tracking-widest uppercase">
              {formatDateIndo(invitation.ceremony_date)}
            </p>

            {/* Countdown Clock */}
            <div className="pt-8 grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mx-auto">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="bg-[#FAF8F4] border border-[#EAE5DC] rounded-xl p-2.5 text-center">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#846B48] block">
                    {item.val}
                  </span>
                  <span className="text-[10px] uppercase text-[#9B9185] tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 animate-bounce text-[#B69A72]">
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* Quote / Ayat Section */}
        {invitation.quote_text && (
          <section className="py-16 px-8 text-center bg-[#FAF8F4] border-y border-[#EAE5DC]">
            <div className="max-w-md mx-auto space-y-4">
              <Sparkles className="w-5 h-5 text-[#B69A72] mx-auto" />
              <p className="font-serif italic text-sm sm:text-base text-[#4A4641] leading-relaxed">
                "{invitation.quote_text}"
              </p>
              {invitation.quote_source && (
                <span className="text-xs uppercase tracking-widest text-[#846B48] font-semibold block">
                  — {invitation.quote_source}
                </span>
              )}
            </div>
          </section>
        )}

        {/* Bride & Groom Profile Section */}
        <section className="py-20 px-8 text-center space-y-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#846B48] font-semibold">
              Pasangan Mempelai
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#302D29]">
              Maha Suci Allah yang Telah Mempertemukan Kami
            </h3>
          </div>

          <div className="space-y-12 max-w-lg mx-auto">
            {/* Groom */}
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] space-y-3">
              <h4 className="font-serif text-2xl text-[#302D29] font-medium">
                {invitation.groom_name}
              </h4>
              <p className="text-xs text-[#6E675F] leading-relaxed">
                {invitation.groom_parents}
              </p>
              {invitation.groom_instagram && (
                <a
                  href={`https://instagram.com/${invitation.groom_instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#846B48] hover:text-[#B69A72] pt-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{invitation.groom_instagram}</span>
                </a>
              )}
            </div>

            <div className="font-serif italic text-3xl text-[#B69A72]">&</div>

            {/* Bride */}
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] space-y-3">
              <h4 className="font-serif text-2xl text-[#302D29] font-medium">
                {invitation.bride_name}
              </h4>
              <p className="text-xs text-[#6E675F] leading-relaxed">
                {invitation.bride_parents}
              </p>
              {invitation.bride_instagram && (
                <a
                  href={`https://instagram.com/${invitation.bride_instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#846B48] hover:text-[#B69A72] pt-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{invitation.bride_instagram}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Event Sessions (Akad & Resepsi) */}
        <section className="py-20 px-8 bg-[#FAF8F4] border-t border-[#EAE5DC] space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#846B48] font-semibold">
              Rangkaian Acara
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#302D29]">
              Waktu & Tempat Pelaksanaan
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
            {/* Session 1: Ceremony */}
            <div className="bg-white p-8 rounded-2xl border border-[#EAE5DC] shadow-sm text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F4] text-[#846B48] border border-[#B69A72]/30 flex items-center justify-center mx-auto">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#302D29]">
                {invitation.ceremony_title}
              </h4>
              <div className="space-y-1 text-xs text-[#6E675F]">
                <p className="font-medium text-[#302D29] text-sm">
                  {formatDateIndo(invitation.ceremony_date)}
                </p>
                <p className="flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B69A72]" />
                  <span>{formatTimeIndo(invitation.ceremony_start_time)} - {formatTimeIndo(invitation.ceremony_end_time)} WIB</span>
                </p>
              </div>

              <div className="pt-2 text-xs text-[#6E675F] space-y-1">
                <p className="font-semibold text-[#302D29]">{invitation.ceremony_location}</p>
                <p>{invitation.ceremony_address}</p>
              </div>

              {invitation.ceremony_maps_url && (
                <div className="pt-2">
                  <a
                    href={invitation.ceremony_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FAF8F4] hover:bg-[#F2EDE4] text-[#846B48] border border-[#B69A72]/40 text-xs font-medium transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Buka Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Session 2: Reception */}
            <div className="bg-white p-8 rounded-2xl border border-[#EAE5DC] shadow-sm text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F4] text-[#846B48] border border-[#B69A72]/30 flex items-center justify-center mx-auto">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#302D29]">
                {invitation.reception_title}
              </h4>
              <div className="space-y-1 text-xs text-[#6E675F]">
                <p className="font-medium text-[#302D29] text-sm">
                  {formatDateIndo(invitation.reception_date)}
                </p>
                <p className="flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B69A72]" />
                  <span>{formatTimeIndo(invitation.reception_start_time)} - {formatTimeIndo(invitation.reception_end_time)} WIB</span>
                </p>
              </div>

              <div className="pt-2 text-xs text-[#6E675F] space-y-1">
                <p className="font-semibold text-[#302D29]">{invitation.reception_location}</p>
                <p>{invitation.reception_address}</p>
              </div>

              {invitation.reception_maps_url && (
                <div className="pt-2">
                  <a
                    href={invitation.reception_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FAF8F4] hover:bg-[#F2EDE4] text-[#846B48] border border-[#B69A72]/40 text-xs font-medium transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Buka Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Digital Gift / Amplop Digital */}
        {(invitation.bank_account_1 || invitation.bank_account_2) && (
          <section className="py-20 px-8 text-center space-y-8">
            <div className="space-y-2">
              <Gift className="w-6 h-6 text-[#B69A72] mx-auto" />
              <h3 className="font-serif text-2xl sm:text-3xl text-[#302D29]">
                Tanda Kasih Digital
              </h3>
              <p className="text-xs text-[#6E675F] max-w-sm mx-auto leading-relaxed">
                Doa restu Anda merupakan karunia terindah bagi kami. Bagi Anda yang ingin memberikan tanda kasih secara digital:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {invitation.bank_account_1 && (
                <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] text-center space-y-3">
                  <span className="font-bold text-sm tracking-wider uppercase text-[#846B48] block">
                    {invitation.bank_name_1}
                  </span>
                  <div className="font-mono text-xl font-bold tracking-wider text-[#302D29]">
                    {invitation.bank_account_1}
                  </div>
                  <p className="text-xs text-[#6E675F]">a.n. {invitation.bank_holder_1}</p>
                  <button
                    onClick={() => copyToClipboard(invitation.bank_account_1, 'bank1')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#EAE5DC] text-xs font-medium text-[#846B48] hover:bg-gray-50 transition-colors"
                  >
                    {copiedBank === 'bank1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank === 'bank1' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                  </button>
                </div>
              )}

              {invitation.bank_account_2 && (
                <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#EAE5DC] text-center space-y-3">
                  <span className="font-bold text-sm tracking-wider uppercase text-[#846B48] block">
                    {invitation.bank_name_2}
                  </span>
                  <div className="font-mono text-xl font-bold tracking-wider text-[#302D29]">
                    {invitation.bank_account_2}
                  </div>
                  <p className="text-xs text-[#6E675F]">a.n. {invitation.bank_holder_2}</p>
                  <button
                    onClick={() => copyToClipboard(invitation.bank_account_2, 'bank2')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#EAE5DC] text-xs font-medium text-[#846B48] hover:bg-gray-50 transition-colors"
                  >
                    {copiedBank === 'bank2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank === 'bank2' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* RSVP & Wishes Guestbook */}
        <section className="py-20 px-8 bg-[#FAF8F4] border-t border-[#EAE5DC] space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#846B48] font-semibold">
              RSVP & Buku Doa
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#302D29]">
              Kirimkan Doa Restu & Konfirmasi Kehadiran
            </h3>
          </div>

          {/* Form */}
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-4">
            {wishState?.error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {wishState.error}
              </div>
            )}
            {wishState?.success && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{wishState.success}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              <input type="hidden" name="invitation_id" value={invitation.id} />
              <input type="hidden" name="slug" value={invitation.slug} />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#4A4641] uppercase tracking-wider">
                  Nama Anda
                </label>
                <input
                  name="sender_name"
                  defaultValue={guestName || ''}
                  placeholder="Contoh: Dimas & Partner"
                  required
                  className="w-full rounded-lg border border-[#EAE5DC] px-3.5 py-2.5 text-sm focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#4A4641] uppercase tracking-wider">
                  Konfirmasi Kehadiran
                </label>
                <select
                  name="attendance"
                  className="w-full rounded-lg border border-[#EAE5DC] px-3.5 py-2.5 text-sm bg-white focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
                >
                  <option value="attending">Hadir</option>
                  <option value="maybe">Masih Ragu</option>
                  <option value="not_attending">Berhalangan Hadir</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#4A4641] uppercase tracking-wider">
                  Jumlah Kehadiran (Pax)
                </label>
                <select
                  name="pax_count"
                  className="w-full rounded-lg border border-[#EAE5DC] px-3.5 py-2.5 text-sm bg-white focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#4A4641] uppercase tracking-wider">
                  Pesan Ucapan & Doa
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tuliskan doa restu untuk kedua mempelai..."
                  required
                  className="w-full rounded-lg border border-[#EAE5DC] px-3.5 py-2.5 text-sm focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-luxury-gold transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan & Konfirmasi'}</span>
              </button>
            </form>
          </div>

          {/* List of Wishes */}
          <div className="max-w-md mx-auto space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#302D29] text-center">
              Ucapan Doa ({wishes.length})
            </h4>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div key={w.id} className="p-4 rounded-xl bg-white border border-[#EAE5DC] text-left space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#302D29]">{w.sender_name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      w.attendance === 'attending' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : w.attendance === 'maybe' 
                        ? 'bg-amber-50 text-amber-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {w.attendance === 'attending' ? 'Hadir' : w.attendance === 'maybe' ? 'Ragu-ragu' : 'Tidak Hadir'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6E675F] leading-relaxed whitespace-pre-wrap">
                    {w.message}
                  </p>
                  <span className="text-[10px] text-[#9B9185] block pt-1">
                    {new Date(w.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 text-center bg-[#24221F] text-[#FAF8F4] space-y-4">
          <h4 className="font-serif text-2xl tracking-wider text-[#B69A72]">
            MAZÉLIA
          </h4>
          <p className="text-xs text-[#9B9185] tracking-widest uppercase">
            Events • Moments • Memories
          </p>
          <div className="text-[11px] text-[#9B9185]/70 pt-4 border-t border-white/10">
            Dibuat dengan cinta untuk {invitation.groom_nickname} & {invitation.bride_nickname}
          </div>
        </footer>
      </main>
    </div>
  );
}
