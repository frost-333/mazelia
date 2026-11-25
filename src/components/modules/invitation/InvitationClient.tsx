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
  ChevronDown,
  CalendarPlus,
  Package,
  Camera,
  X, 
  Shirt,
  Loader2
} from 'lucide-react';
import { formatDateIndo, formatTimeIndo } from '@/lib/utils/formatters';
import { submitWishAction } from '@/actions/invitation-actions';
import { getWeddingTheme } from '@/lib/constants/themes';
import { 
  CornerFlourish, 
  FlourishDivider, 
  ThemeHeaderMotif, 
  ThemeParticleOverlay,
  RoyalArchFrame,
  ThemeOpeningOverlay
} from './ThemeOrnaments';
import { ThemeBackground } from './ThemeBackground';
import { ThemeDesktopBackdrop } from './ThemeDesktopBackdrop';

interface InvitationClientProps {
  invitation: any;
  wishes: any[];
  guestName?: string;
}

const defaultGallery = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    caption: 'Momen Bahagia Bersama',
  },
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    caption: 'Cinta & Kehangatan',
  },
  {
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    caption: 'Menatap Masa Depan',
  },
  {
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    caption: 'Janji Setia',
  },
  {
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
    caption: 'Langkah Awal',
  },
  {
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Menuju Pelaminan',
  },
];

const loveStoryMilestones = [
  {
    year: '2021',
    title: 'Pertama Kali Berjumpa',
    description: 'Pertemuan tak sengaja di sebuah kedai kopi di Bandung yang berlanjut menjadi obrolan hangat tanpa henti.',
  },
  {
    year: '2023',
    title: 'Menjalin Komitmen',
    description: 'Dua hati yang sepakat untuk saling melengkapi, tumbuh bersama, dan saling mendukung mimpi masing-masing.',
  },
  {
    year: '2025',
    title: 'Hari Lamaran',
    description: 'Di hadapan kedua keluarga besar, cincin disematkan sebagai ikrar keseriusan untuk melangkah ke jenjang pernikahan.',
  },
  {
    year: '2027',
    title: 'Menuju Hari Bahagia',
    description: 'Dengan memohon ridho Allah SWT, kami bersiap mengikrarkan janji suci pernikahan untuk selamanya.',
  },
];

const dressCodeColors = [
  { name: 'Champagne Gold', hex: '#C5A880' },
  { name: 'Sage Green', hex: '#9CAF88' },
  { name: 'Warm Terracotta', hex: '#C88A75' },
  { name: 'Soft Ivory', hex: '#FAF8F4', border: true },
];

function createGoogleCalendarLink(
  title: string,
  dateStr?: string,
  startTime?: string,
  endTime?: string,
  location?: string,
  address?: string
) {
  if (!dateStr) return '#';
  const cleanDate = dateStr.replace(/-/g, '');
  const cleanStart = (startTime || '09:00').replace(/:/g, '').padEnd(6, '0').slice(0, 6);
  const cleanEnd = (endTime || startTime || '12:00').replace(/:/g, '').padEnd(6, '0').slice(0, 6);
  const startIso = `${cleanDate}T${cleanStart}`;
  const endIso = `${cleanDate}T${cleanEnd}`;
  const details = encodeURIComponent(`Menghadiri ${title}.\nLokasi: ${location || ''}\nAlamat: ${address || ''}`);
  const loc = encodeURIComponent(`${location || ''}, ${address || ''}`);
  const eventTitle = encodeURIComponent(title);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startIso}/${endIso}&details=${details}&location=${loc}`;
}

export function InvitationClient({ invitation, wishes, guestName }: InvitationClientProps) {
  const theme = getWeddingTheme(invitation.theme);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpening, setIsOpening] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [copiedBank, setCopiedBank] = React.useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = React.useState<string | null>(null);
  const [localWishes, setLocalWishes] = React.useState<any[]>(wishes);
  const [visibleWishesCount, setVisibleWishesCount] = React.useState(5);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [wishState, setWishState] = React.useState<{ error?: string; success?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Dynamic gallery from database or fallback to default
  const galleryItems = (Array.isArray(invitation.gallery_urls) && invitation.gallery_urls.length > 0)
    ? invitation.gallery_urls.filter(Boolean).map((url: string, idx: number) => ({
        url,
        caption: `Momen Bahagia ${idx + 1}`
      }))
    : defaultGallery;

  // Dynamic love story from database or fallback to default
  const activeLoveStory = (Array.isArray(invitation.love_story) && invitation.love_story.length > 0)
    ? invitation.love_story
    : loveStoryMilestones;

  React.useEffect(() => {
    setLocalWishes(wishes);
  }, [wishes]);

  // Audio control with smooth entrance animation
  const handleOpenInvitation = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);

    if (audioRef.current && invitation.music_url) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log('Autoplay blocked:', e);
      });
    }
  };

  // Scroll reveal observer
  React.useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [isOpen]);

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

    // Anti-Spam Honeypot check
    const honeypot = formData.get('hp_field') as string;
    if (honeypot) {
      setIsSubmitting(false);
      return;
    }
    
    const senderName = formData.get('sender_name') as string;
    const attendance = formData.get('attendance') as string;
    const paxCount = parseInt(formData.get('pax_count') as string || '1', 10);
    const message = formData.get('message') as string;

    const res = await submitWishAction(null, formData);
    setIsSubmitting(false);
    setWishState(res);

    if (res?.success) {
      // Optimistic update
      const newWish = {
        id: 'temp-' + Date.now(),
        sender_name: senderName,
        attendance: attendance,
        pax_count: paxCount,
        message: message,
        created_at: new Date().toISOString(),
      };
      setLocalWishes((prev) => [newWish, ...prev]);
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
    <div 
      className="min-h-screen font-sans relative overflow-x-hidden transition-colors duration-500"
      style={{ backgroundColor: theme.colors.bgPage, color: theme.colors.textBody }}
    >
      {/* Background Audio */}
      {invitation.music_url && (
        <audio ref={audioRef} src={invitation.music_url} loop preload="auto" />
      )}

      {/* Floating Music Button */}
      {isOpen && invitation.music_url && (
        <button
          onClick={toggleMusic}
          aria-label="Toggle background music"
          style={{ 
            backgroundColor: `${theme.colors.bgSection}E6`,
            borderColor: theme.colors.borderAccent,
            color: theme.colors.accentDark
          }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full backdrop-blur-md border shadow-luxury flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Foto Prewedding Preview"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}

      {/* Full-Bleed Desktop Side Backdrop (fills left & right outer areas) */}
      <ThemeDesktopBackdrop
        theme={theme}
        groomNickname={invitation.groom_nickname}
        brideNickname={invitation.bride_nickname}
        ceremonyDate={invitation.ceremony_date}
      />

      {/* Ambient Theme Floating Particles */}
      <ThemeParticleOverlay themeId={invitation.theme} />

      {/* Per-Theme Unique Opening Transition Overlay */}
      <ThemeOpeningOverlay
        transitionType={theme.openingTransition}
        accentColor={theme.colors.accent}
        isOpening={isOpening && !isOpen}
      />

      {/* 1. COVER / HERO OVERLAY (Sampul Undangan) */}
      {!isOpen ? (
        <div 
          className={`fixed inset-0 z-50 flex flex-col justify-between items-center text-center p-6 sm:p-8 overflow-hidden select-none ${isOpening ? 'curtain-exit' : ''}`}
          style={{ backgroundColor: theme.isDark ? '#060B18' : '#1F1C18', color: '#FAF8F4' }}
        >
          {/* Bespoke Thematic Background on Cover */}
          <ThemeBackground themeId={invitation.theme} isCover={true} />

          {/* Background image preview with blur */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url(${invitation.cover_image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(6px)',
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b"
            style={{
              backgroundImage: theme.isDark 
                ? 'linear-gradient(to bottom, rgba(6,11,24,0.68), rgba(6,11,24,0.88), rgba(6,11,24,0.98))'
                : 'linear-gradient(to bottom, rgba(31,28,24,0.72), rgba(31,28,24,0.88), rgba(31,28,24,0.98))'
            }}
          />

          {/* Inner Ornamental Cover Border Frame */}
          <div
            className="absolute inset-4 sm:inset-6 rounded-3xl border pointer-events-none"
            style={{ borderColor: `${theme.colors.accent}35` }}
          />

          {/* Corner Flourishes on Cover */}
          <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tl" className="absolute top-5 left-5 sm:top-7 sm:left-7" />
          <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tr" className="absolute top-5 right-5 sm:top-7 sm:right-7" />
          <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="bl" className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7" />
          <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="br" className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7" />

          {/* Top Label with Monogram Seal */}
          <div className="relative z-10 pt-6 animate-in fade-in slide-in-from-top-4 duration-700 flex flex-col items-center">
            <div 
              className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center mb-3 shadow-luxury animate-pulse-glow"
              style={{ 
                borderColor: theme.colors.accent, 
                backgroundColor: `${theme.colors.accent}20` 
              }}
            >
              <span className="font-serif italic text-2xl font-bold" style={{ color: theme.colors.accent }}>
                {invitation.groom_nickname?.[0] || 'F'}&{invitation.bride_nickname?.[0] || 'M'}
              </span>
            </div>
            <span 
              className="font-serif tracking-[0.3em] uppercase text-xs font-semibold"
              style={{ color: theme.colors.accent }}
            >
              The Wedding Invitation
            </span>
          </div>

          {/* Couple Names */}
          <div className="relative z-10 max-w-lg space-y-3 my-auto animate-float-gentle">
            <ThemeHeaderMotif themeId={invitation.theme} color={theme.colors.accent} />
            <h1 className="font-serif text-4xl sm:text-6xl tracking-wide font-normal leading-tight text-white drop-shadow-md">
              {invitation.groom_nickname || 'Brian'}{' '}
              <span className="font-serif italic" style={{ color: theme.colors.accent }}>&</span>{' '}
              {invitation.bride_nickname || 'Sarah'}
            </h1>
            <p className="text-xs sm:text-sm tracking-widest uppercase opacity-80" style={{ color: theme.colors.accent }}>
              {formatDateIndo(invitation.ceremony_date)}
            </p>

            {guestName && (
              <div className="pt-6 pb-2">
                <span className="text-[11px] uppercase tracking-wider text-white/70 block mb-1.5">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </span>
                <span 
                  className="inline-block px-5 py-2 rounded-xl backdrop-blur-md border text-sm sm:text-base font-medium shadow-sm animate-pulse-glow"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    borderColor: `${theme.colors.accent}40`,
                    color: '#FAF8F4'
                  }}
                >
                  {guestName}
                </span>
              </div>
            )}
          </div>

          {/* Open Button */}
          <div className="relative z-10 pb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              onClick={handleOpenInvitation}
              style={{ 
                backgroundColor: theme.colors.buttonBg, 
                color: theme.colors.buttonText 
              }}
              className={`px-8 py-3.5 rounded-full font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 ${theme.styleClass.buttonShadow}`}
            >
              <MailOpen className="w-4 h-4" />
              <span>Buka Undangan</span>
            </button>
            <p className="text-[10px] text-white/60 mt-3">
              *Disarankan menyalakan audio untuk pengalaman terbaik
            </p>
          </div>
        </div>
      ) : null}

      {/* 2. MAIN INVITATION CONTENT (Scrollable Section) */}
      <main 
        className={`max-w-2xl mx-auto min-h-screen shadow-2xl relative z-10 border-x transition-colors duration-500 overflow-hidden ${theme.revealAnimation}`}
        style={{ 
          backgroundColor: theme.colors.bgSection, 
          borderColor: theme.colors.border 
        }}
      >
        {/* Full Height Bespoke Thematic Background on Main Section */}
        <ThemeBackground themeId={invitation.theme} isCover={false} />

        {/* Hero Header Section */}
        <section 
          className="relative min-h-[90vh] flex flex-col justify-center items-center text-center p-6 sm:p-8 overflow-hidden z-10"
          style={{ 
            background: `linear-gradient(to bottom, ${theme.colors.bgCard}B3, ${theme.colors.bgSection}E6)` 
          }}
        >
          {/* Top Royal Arch Ribbon */}
          <RoyalArchFrame color={theme.colors.accent} themeId={invitation.theme} />

          {/* Classical Corner Flourishes */}
          <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tl" className="absolute top-6 left-4 sm:left-6" />
          <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tr" className="absolute top-6 right-4 sm:right-6" />
          <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="bl" className="absolute bottom-6 left-4 sm:left-6 opacity-70" />
          <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="br" className="absolute bottom-6 right-4 sm:right-6 opacity-70" />

          <div className="space-y-4 relative z-10 max-w-md w-full p-6 sm:p-8 rounded-3xl border shadow-lg backdrop-blur-[3px] animate-in fade-in duration-1000"
            style={{
              backgroundColor: `${theme.colors.bgCard}DF`,
              borderColor: `${theme.colors.borderAccent}60`,
            }}
          >
            {/* Inner subtle double border */}
            <div
              className="absolute inset-2 rounded-2xl border pointer-events-none opacity-40"
              style={{ borderColor: theme.colors.borderAccent, borderStyle: 'dashed' }}
            />

            <ThemeHeaderMotif themeId={invitation.theme} color={theme.colors.accent} />

            <span 
              className="font-serif tracking-[0.3em] uppercase text-xs font-semibold block relative"
              style={{ color: theme.colors.accentDark }}
            >
              Walimatul Ursy
            </span>

            <h2 
              className={`font-serif text-4xl sm:text-5xl font-normal drop-shadow-sm relative ${theme.styleClass.headingAccent}`}
              style={{ color: theme.colors.textTitle }}
            >
              {invitation.groom_nickname}{' '}
              <span className="italic" style={{ color: theme.colors.accent }}>&</span>{' '}
              {invitation.bride_nickname}
            </h2>

            <FlourishDivider themeId={invitation.theme} color={theme.colors.dividerColor} />

            <p className="text-xs sm:text-sm tracking-widest uppercase font-medium" style={{ color: theme.colors.textMuted }}>
              {formatDateIndo(invitation.ceremony_date)}
            </p>

            {/* Countdown Clock */}
            <div className="pt-4 grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="border rounded-2xl p-2 sm:p-2.5 text-center shadow-sm hover:scale-105 transition-transform duration-300"
                  style={{ 
                    backgroundColor: theme.colors.bgSection, 
                    borderColor: `${theme.colors.borderAccent}60` 
                  }}
                >
                  <span 
                    className="font-serif text-xl sm:text-2xl font-bold block"
                    style={{ color: theme.colors.accentDark }}
                  >
                    {item.val}
                  </span>
                  <span 
                    className="text-[9px] sm:text-[10px] uppercase tracking-wider block pt-0.5"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="absolute bottom-6 animate-bounce"
            style={{ color: theme.colors.accent }}
          >
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* Quote / Ayat Section */}
        {invitation.quote_text && (
          <section 
            className="py-16 px-8 text-center border-y reveal-on-scroll"
            style={{ 
              backgroundColor: theme.colors.bgCard, 
              borderColor: theme.colors.border 
            }}
          >
            <div className="max-w-md mx-auto space-y-4">
              <FlourishDivider themeId={invitation.theme} color={theme.colors.accent} />
              <p 
                className="font-serif italic text-sm sm:text-base leading-relaxed"
                style={{ color: theme.colors.textTitle }}
              >
                "{invitation.quote_text}"
              </p>
              {invitation.quote_source && (
                <span 
                  className="text-xs uppercase tracking-widest font-semibold block pt-2"
                  style={{ color: theme.colors.accentDark }}
                >
                  — {invitation.quote_source}
                </span>
              )}
            </div>
          </section>
        )}

        {/* Bride & Groom Profile Section */}
        <section className="py-20 px-8 text-center space-y-12 reveal-on-scroll">
          <div className="space-y-2">
            <ThemeHeaderMotif themeId={invitation.theme} color={theme.colors.accent} />
            <span 
              className="text-xs uppercase tracking-widest font-semibold block"
              style={{ color: theme.colors.accentDark }}
            >
              Pasangan Mempelai
            </span>
            <h3 
              className="font-serif text-2xl sm:text-3xl"
              style={{ color: theme.colors.textTitle }}
            >
              Maha Suci Allah yang Telah Mempertemukan Kami
            </h3>
          </div>

          <div className="space-y-10 max-w-lg mx-auto">
            {/* Groom */}
            <div 
              className="p-6 rounded-2xl border space-y-3 relative shadow-sm hover:shadow-md transition-all duration-300 reveal-on-scroll reveal-delay-1"
              style={{ 
                backgroundColor: theme.colors.bgCard, 
                borderColor: theme.colors.border 
              }}
            >
              <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tr" className="absolute top-2 right-2 opacity-50" />
              <h4 
                className="font-serif text-2xl font-medium"
                style={{ color: theme.colors.textTitle }}
              >
                {invitation.groom_name}
              </h4>
              <p 
                className="text-xs leading-relaxed"
                style={{ color: theme.colors.textBody }}
              >
                {invitation.groom_parents}
              </p>
              {invitation.groom_instagram && (
                <a
                  href={`https://instagram.com/${invitation.groom_instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs pt-1 transition-colors hover:scale-105"
                  style={{ color: theme.colors.accentDark }}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{invitation.groom_instagram}</span>
                </a>
              )}
            </div>

            <div 
              className="font-serif italic text-3xl animate-pulse-glow"
              style={{ color: theme.colors.accent }}
            >
              &
            </div>

            {/* Bride */}
            <div 
              className="p-6 rounded-2xl border space-y-3 relative shadow-sm hover:shadow-md transition-all duration-300 reveal-on-scroll reveal-delay-2"
              style={{ 
                backgroundColor: theme.colors.bgCard, 
                borderColor: theme.colors.border 
              }}
            >
              <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tl" className="absolute top-2 left-2 opacity-50" />
              <h4 
                className="font-serif text-2xl font-medium"
                style={{ color: theme.colors.textTitle }}
              >
                {invitation.bride_name}
              </h4>
              <p 
                className="text-xs leading-relaxed"
                style={{ color: theme.colors.textBody }}
              >
                {invitation.bride_parents}
              </p>
              {invitation.bride_instagram && (
                <a
                  href={`https://instagram.com/${invitation.bride_instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs pt-1 transition-colors hover:scale-105"
                  style={{ color: theme.colors.accentDark }}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{invitation.bride_instagram}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Love Story Section */}
        <section 
          className="py-20 px-8 border-t space-y-12 reveal-on-scroll"
          style={{ 
            backgroundColor: theme.colors.bgCard, 
            borderColor: theme.colors.border 
          }}
        >
          <div className="text-center space-y-2">
            <span 
              className="text-xs uppercase tracking-widest font-semibold block"
              style={{ color: theme.colors.accentDark }}
            >
              Kisah Kami
            </span>
            <h3 
              className="font-serif text-2xl sm:text-3xl"
              style={{ color: theme.colors.textTitle }}
            >
              Perjalanan Cinta Menuju Pelaminan
            </h3>
          </div>

          <div 
            className="max-w-md mx-auto space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5"
            style={{ 
              // Custom line color
            }}
          >
            {activeLoveStory.map((item: any, idx: number) => (
              <div key={idx} className="relative flex items-start gap-4 reveal-on-scroll reveal-delay-1">
                <div 
                  className="w-10 h-10 rounded-full border text-xs font-serif font-bold flex items-center justify-center shrink-0 shadow-sm z-10 animate-pulse-glow"
                  style={{ 
                    backgroundColor: theme.colors.bgSection, 
                    borderColor: theme.colors.borderAccent,
                    color: theme.colors.accentDark
                  }}
                >
                  {item.year ? item.year.slice(-2) : '•'}
                </div>
                <div 
                  className="p-5 rounded-2xl border shadow-sm flex-1 space-y-1 text-left hover:shadow-md transition-shadow"
                  style={{ 
                    backgroundColor: theme.colors.bgSection, 
                    borderColor: theme.colors.border 
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-serif font-bold text-sm"
                      style={{ color: theme.colors.textTitle }}
                    >
                      {item.title}
                    </span>
                    <span 
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                      style={{ 
                        backgroundColor: theme.colors.tagBg, 
                        borderColor: theme.colors.border,
                        color: theme.colors.tagText 
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p 
                    className="text-xs leading-relaxed"
                    style={{ color: theme.colors.textBody }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Event Sessions (Akad & Resepsi) */}
        <section 
          className="py-20 px-8 border-t space-y-12 reveal-on-scroll"
          style={{ 
            backgroundColor: theme.colors.bgSection, 
            borderColor: theme.colors.border 
          }}
        >
          <div className="text-center space-y-2">
            <ThemeHeaderMotif themeId={invitation.theme} color={theme.colors.accent} />
            <span 
              className="text-xs uppercase tracking-widest font-semibold block"
              style={{ color: theme.colors.accentDark }}
            >
              Rangkaian Acara
            </span>
            <h3 
              className="font-serif text-2xl sm:text-3xl"
              style={{ color: theme.colors.textTitle }}
            >
              Waktu & Tempat Pelaksanaan
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
            {/* Session 1: Ceremony */}
            <div 
              className="p-8 rounded-2xl border shadow-sm text-center space-y-4 relative overflow-hidden reveal-on-scroll reveal-delay-1 hover:shadow-lg transition-all duration-300"
              style={{ 
                backgroundColor: theme.colors.bgCard, 
                borderColor: theme.colors.border 
              }}
            >
              <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tl" className="absolute top-3 left-3" />
              <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tr" className="absolute top-3 right-3" />

              <div 
                className="w-12 h-12 rounded-full border flex items-center justify-center mx-auto"
                style={{ 
                  backgroundColor: theme.colors.bgSection, 
                  borderColor: theme.colors.borderAccent,
                  color: theme.colors.accentDark 
                }}
              >
                <Calendar className="w-5 h-5" />
              </div>
              <h4 
                className="font-serif text-2xl font-bold"
                style={{ color: theme.colors.textTitle }}
              >
                {invitation.ceremony_title}
              </h4>
              <div className="space-y-1 text-xs" style={{ color: theme.colors.textBody }}>
                <p className="font-medium text-sm" style={{ color: theme.colors.textTitle }}>
                  {formatDateIndo(invitation.ceremony_date)}
                </p>
                <p className="flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
                  <span>{formatTimeIndo(invitation.ceremony_start_time)} - {formatTimeIndo(invitation.ceremony_end_time)}</span>
                </p>
              </div>

              <div className="pt-2 text-xs space-y-1" style={{ color: theme.colors.textBody }}>
                <p className="font-semibold" style={{ color: theme.colors.textTitle }}>{invitation.ceremony_location}</p>
                <p>{invitation.ceremony_address}</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                {invitation.ceremony_maps_url && (
                  <a
                    href={invitation.ceremony_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-all shadow-sm hover:scale-105"
                    style={{ 
                      backgroundColor: theme.colors.bgSection, 
                      borderColor: theme.colors.borderAccent,
                      color: theme.colors.accentDark 
                    }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Buka Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}

                <a
                  href={createGoogleCalendarLink(
                    `${invitation.ceremony_title} — ${invitation.groom_nickname} & ${invitation.bride_nickname}`,
                    invitation.ceremony_date,
                    invitation.ceremony_start_time,
                    invitation.ceremony_end_time,
                    invitation.ceremony_location,
                    invitation.ceremony_address
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-all shadow-sm hover:scale-105"
                  style={{ 
                    backgroundColor: theme.colors.bgSection, 
                    borderColor: theme.colors.border,
                    color: theme.colors.textBody 
                  }}
                >
                  <CalendarPlus className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
                  <span>Simpan ke Kalender</span>
                </a>
              </div>
            </div>

            {/* Session 2: Reception */}
            <div 
              className="p-8 rounded-2xl border shadow-sm text-center space-y-4 relative overflow-hidden reveal-on-scroll reveal-delay-2 hover:shadow-lg transition-all duration-300"
              style={{ 
                backgroundColor: theme.colors.bgCard, 
                borderColor: theme.colors.border 
              }}
            >
              <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tl" className="absolute top-3 left-3" />
              <CornerFlourish themeId={invitation.theme} color={theme.colors.accent} position="tr" className="absolute top-3 right-3" />

              <div 
                className="w-12 h-12 rounded-full border flex items-center justify-center mx-auto"
                style={{ 
                  backgroundColor: theme.colors.bgSection, 
                  borderColor: theme.colors.borderAccent,
                  color: theme.colors.accentDark 
                }}
              >
                <Heart className="w-5 h-5" />
              </div>
              <h4 
                className="font-serif text-2xl font-bold"
                style={{ color: theme.colors.textTitle }}
              >
                {invitation.reception_title}
              </h4>
              <div className="space-y-1 text-xs" style={{ color: theme.colors.textBody }}>
                <p className="font-medium text-sm" style={{ color: theme.colors.textTitle }}>
                  {formatDateIndo(invitation.reception_date)}
                </p>
                <p className="flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
                  <span>{formatTimeIndo(invitation.reception_start_time)} - {formatTimeIndo(invitation.reception_end_time)}</span>
                </p>
              </div>

              <div className="pt-2 text-xs space-y-1" style={{ color: theme.colors.textBody }}>
                <p className="font-semibold" style={{ color: theme.colors.textTitle }}>{invitation.reception_location}</p>
                <p>{invitation.reception_address}</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                {invitation.reception_maps_url && (
                  <a
                    href={invitation.reception_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-all shadow-sm hover:scale-105"
                    style={{ 
                      backgroundColor: theme.colors.bgSection, 
                      borderColor: theme.colors.borderAccent,
                      color: theme.colors.accentDark 
                    }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Buka Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}

                <a
                  href={createGoogleCalendarLink(
                    `${invitation.reception_title} — ${invitation.groom_nickname} & ${invitation.bride_nickname}`,
                    invitation.reception_date,
                    invitation.reception_start_time,
                    invitation.reception_end_time,
                    invitation.reception_location,
                    invitation.reception_address
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-all shadow-sm"
                  style={{ 
                    backgroundColor: theme.colors.bgSection, 
                    borderColor: theme.colors.border,
                    color: theme.colors.textBody 
                  }}
                >
                  <CalendarPlus className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
                  <span>Simpan ke Kalender</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dress Code & Etiket Section */}
        <section 
          className="py-16 px-8 border-t text-center space-y-6 reveal-on-scroll"
          style={{ 
            backgroundColor: theme.colors.bgCard, 
            borderColor: theme.colors.border 
          }}
        >
          <div className="space-y-2">
            <Shirt className="w-5 h-5 mx-auto animate-pulse-glow" style={{ color: theme.colors.accent }} />
            <span 
              className="text-xs uppercase tracking-widest font-semibold block"
              style={{ color: theme.colors.accentDark }}
            >
              Dress Code & Panduan Busana
            </span>
            <p className="text-xs max-w-sm mx-auto leading-relaxed" style={{ color: theme.colors.textBody }}>
              Demi keselarasan dokumentasi momen bahagia ini, tamu undangan disarankan mengenakan pakaian bernuansa:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-md mx-auto pt-2">
            {dressCodeColors.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 hover:scale-110 transition-transform duration-300">
                <div
                  className="w-9 h-9 rounded-full shadow-sm border"
                  style={{ 
                    backgroundColor: color.hex, 
                    borderColor: theme.colors.border 
                  }}
                />
                <span className="text-[10px] font-medium" style={{ color: theme.colors.textBody }}>
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Prewedding Photo Gallery Section */}
        <section 
          className="py-20 px-8 border-t space-y-8 text-center reveal-on-scroll"
          style={{ 
            backgroundColor: theme.colors.bgSection, 
            borderColor: theme.colors.border 
          }}
        >
          <div className="space-y-2">
            <ThemeHeaderMotif themeId={invitation.theme} color={theme.colors.accent} />
            <span 
              className="text-xs uppercase tracking-widest font-semibold block"
              style={{ color: theme.colors.accentDark }}
            >
              Galeri Momen
            </span>
            <h3 
              className="font-serif text-2xl sm:text-3xl"
              style={{ color: theme.colors.textTitle }}
            >
              Potret Kebahagiaan Kami
            </h3>
            <FlourishDivider themeId={invitation.theme} color={theme.colors.dividerColor} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
            {galleryItems.map((item: any, idx: number) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(item.url)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 reveal-on-scroll"
                style={{ borderColor: theme.colors.border }}
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[10px] text-white font-medium truncate">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px]" style={{ color: theme.colors.textMuted }}>
            *Ketuk foto untuk memperbesar tampilan
          </p>
        </section>

        {/* Digital Gift / Amplop Digital & Kado Fisik */}
        {(invitation.bank_account_1 || invitation.bank_account_2) && (
          <section 
            className="py-20 px-8 border-t text-center space-y-8 reveal-on-scroll"
            style={{ 
              backgroundColor: theme.colors.bgCard, 
              borderColor: theme.colors.border 
            }}
          >
            <div className="space-y-2">
              <Gift className="w-6 h-6 mx-auto animate-pulse-glow" style={{ color: theme.colors.accent }} />
              <h3 
                className="font-serif text-2xl sm:text-3xl"
                style={{ color: theme.colors.textTitle }}
              >
                Tanda Kasih Digital & Kado
              </h3>
              <p className="text-xs max-w-sm mx-auto leading-relaxed" style={{ color: theme.colors.textBody }}>
                Doa restu Anda merupakan karunia terindah bagi kami. Bagi Anda yang ingin memberikan tanda kasih secara digital maupun cinderamata:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {invitation.bank_account_1 && (
                <div 
                  className="p-6 rounded-2xl border text-center space-y-3 shadow-sm hover:shadow-md transition-shadow reveal-on-scroll reveal-delay-1"
                  style={{ 
                    backgroundColor: theme.colors.bgSection, 
                    borderColor: theme.colors.border 
                  }}
                >
                  <span 
                    className="font-bold text-sm tracking-wider uppercase block"
                    style={{ color: theme.colors.accentDark }}
                  >
                    {invitation.bank_name_1}
                  </span>
                  <div 
                    className="font-mono text-xl font-bold tracking-wider"
                    style={{ color: theme.colors.textTitle }}
                  >
                    {invitation.bank_account_1}
                  </div>
                  <p className="text-xs" style={{ color: theme.colors.textBody }}>a.n. {invitation.bank_holder_1}</p>
                  <button
                    onClick={() => copyToClipboard(invitation.bank_account_1, 'bank1')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium transition-colors hover:scale-105 active:scale-95"
                    style={{ 
                      backgroundColor: theme.colors.bgCard, 
                      borderColor: theme.colors.borderAccent,
                      color: theme.colors.accentDark 
                    }}
                  >
                    {copiedBank === 'bank1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank === 'bank1' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                  </button>
                </div>
              )}

              {invitation.bank_account_2 && (
                <div 
                  className="p-6 rounded-2xl border text-center space-y-3 shadow-sm hover:shadow-md transition-shadow reveal-on-scroll reveal-delay-2"
                  style={{ 
                    backgroundColor: theme.colors.bgSection, 
                    borderColor: theme.colors.border 
                  }}
                >
                  <span 
                    className="font-bold text-sm tracking-wider uppercase block"
                    style={{ color: theme.colors.accentDark }}
                  >
                    {invitation.bank_name_2}
                  </span>
                  <div 
                    className="font-mono text-xl font-bold tracking-wider"
                    style={{ color: theme.colors.textTitle }}
                  >
                    {invitation.bank_account_2}
                  </div>
                  <p className="text-xs" style={{ color: theme.colors.textBody }}>a.n. {invitation.bank_holder_2}</p>
                  <button
                    onClick={() => copyToClipboard(invitation.bank_account_2, 'bank2')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium transition-colors hover:scale-105 active:scale-95"
                    style={{ 
                      backgroundColor: theme.colors.bgCard, 
                      borderColor: theme.colors.borderAccent,
                      color: theme.colors.accentDark 
                    }}
                  >
                    {copiedBank === 'bank2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank === 'bank2' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                  </button>
                </div>
              )}

              {/* Kirim Kado Fisik Card */}
              <div 
                className="p-6 rounded-2xl border text-center space-y-3 shadow-sm hover:shadow-md transition-shadow reveal-on-scroll reveal-delay-3"
                style={{ 
                  backgroundColor: theme.colors.bgSection, 
                  borderColor: theme.colors.border 
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full border flex items-center justify-center mx-auto"
                  style={{ 
                    backgroundColor: theme.colors.bgCard, 
                    borderColor: theme.colors.borderAccent,
                    color: theme.colors.accentDark 
                  }}
                >
                  <Package className="w-5 h-5" />
                </div>
                <span 
                  className="font-bold text-sm tracking-wider uppercase block"
                  style={{ color: theme.colors.accentDark }}
                >
                  Kirim Kado Fisik
                </span>
                <p className="text-xs max-w-xs mx-auto" style={{ color: theme.colors.textBody }}>
                  Bagi kerabat yang ingin mengirimkan cinderamata atau kado fisik, dapat ditujukan ke alamat:
                </p>
                <div 
                  className="p-3 rounded-xl border text-xs space-y-1 text-left"
                  style={{ 
                    backgroundColor: theme.colors.bgCard, 
                    borderColor: theme.colors.border,
                    color: theme.colors.textTitle 
                  }}
                >
                  <p className="font-bold text-center">Kediaman Mempelai ({invitation.groom_nickname} & {invitation.bride_nickname})</p>
                  <p className="text-center" style={{ color: theme.colors.textBody }}>
                    {invitation.ceremony_address || 'Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan 12160'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(invitation.ceremony_address || 'Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan 12160', 'giftAddress')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium transition-colors hover:scale-105 active:scale-95"
                  style={{ 
                    backgroundColor: theme.colors.bgCard, 
                    borderColor: theme.colors.borderAccent,
                    color: theme.colors.accentDark 
                  }}
                >
                  {copiedBank === 'giftAddress' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank === 'giftAddress' ? 'Alamat Tersalin' : 'Salin Alamat Kirim Kado'}</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* RSVP & Wishes Guestbook */}
        <section 
          className="py-20 px-8 border-t space-y-12 reveal-on-scroll"
          style={{ 
            backgroundColor: theme.colors.bgSection, 
            borderColor: theme.colors.border 
          }}
        >
          <div className="text-center space-y-2">
            <ThemeHeaderMotif themeId={invitation.theme} color={theme.colors.accent} />
            <span 
              className="text-xs uppercase tracking-widest font-semibold block"
              style={{ color: theme.colors.accentDark }}
            >
              RSVP & Buku Doa
            </span>
            <h3 
              className="font-serif text-2xl sm:text-3xl"
              style={{ color: theme.colors.textTitle }}
            >
              Kirimkan Doa Restu & Konfirmasi Kehadiran
            </h3>
          </div>

          {/* Form */}
          <div 
            className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl border shadow-sm space-y-4 hover:shadow-md transition-shadow reveal-on-scroll reveal-delay-1"
            style={{ 
              backgroundColor: theme.colors.bgCard, 
              borderColor: theme.colors.border 
            }}
          >
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
              {/* Anti-spam honeypot */}
              <input type="text" name="hp_field" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.colors.textTitle }}>
                  Nama Anda
                </label>
                <input
                  name="sender_name"
                  defaultValue={guestName || ''}
                  placeholder="Contoh: Dimas & Partner"
                  required
                  className="w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2"
                  style={{ borderColor: theme.colors.border }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.colors.textTitle }}>
                  Hubungan / Kerabat (Opsional)
                </label>
                <input
                  name="relationship"
                  placeholder="Contoh: Sahabat Kuliah / Rekan Kerja"
                  className="w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2"
                  style={{ borderColor: theme.colors.border }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.colors.textTitle }}>
                    Konfirmasi Kehadiran
                  </label>
                  <select
                    name="attendance"
                    className="w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2"
                    style={{ borderColor: theme.colors.border }}
                  >
                    <option value="attending">Hadir</option>
                    <option value="maybe">Masih Ragu</option>
                    <option value="not_attending">Berhalangan Hadir</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.colors.textTitle }}>
                    Jumlah Kehadiran (Pax)
                  </label>
                  <select
                    name="pax_count"
                    className="w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2"
                    style={{ borderColor: theme.colors.border }}
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.colors.textTitle }}>
                  Pesan Ucapan & Doa
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tuliskan doa restu untuk kedua mempelai..."
                  required
                  className="w-full rounded-xl border px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 resize-none font-sans"
                  style={{ borderColor: theme.colors.border }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ 
                  backgroundColor: theme.colors.buttonBg, 
                  color: theme.colors.buttonText 
                }}
                className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 active:scale-95 ${theme.styleClass.buttonShadow}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirim Ucapan & Konfirmasi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Ucapan & Konfirmasi</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List of Wishes */}
          <div className="max-w-md mx-auto space-y-4">
            <h4 
              className="font-serif text-lg font-semibold text-center"
              style={{ color: theme.colors.textTitle }}
            >
              Ucapan Doa Masuk ({localWishes.length})
            </h4>

            <div className="space-y-3">
              {localWishes.slice(0, visibleWishesCount).map((w) => (
                <div 
                  key={w.id} 
                  className="p-4 rounded-xl border text-left space-y-1.5 shadow-sm"
                  style={{ 
                    backgroundColor: theme.colors.bgCard, 
                    borderColor: theme.colors.border 
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs" style={{ color: theme.colors.textTitle }}>
                        {w.sender_name}
                      </span>
                      {w.relationship && (
                        <span className="text-[10px]" style={{ color: theme.colors.textMuted }}>
                          ({w.relationship})
                        </span>
                      )}
                    </div>
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
                  <p 
                    className="text-xs leading-relaxed whitespace-pre-wrap"
                    style={{ color: theme.colors.textBody }}
                  >
                    {w.message}
                  </p>
                  <span className="text-[10px] block pt-1" style={{ color: theme.colors.textMuted }}>
                    {new Date(w.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))}

              {localWishes.length === 0 && (
                <div className="text-center py-8 text-xs" style={{ color: theme.colors.textMuted }}>
                  Belum ada ucapan doa masuk. Jadilah yang pertama memberikan doa restu!
                </div>
              )}
            </div>

            {/* Load More Button */}
            {localWishes.length > visibleWishesCount && (
              <button
                type="button"
                onClick={() => setVisibleWishesCount((prev) => prev + 5)}
                className="w-full py-2.5 rounded-xl border text-xs font-semibold transition-all"
                style={{ 
                  backgroundColor: theme.colors.bgCard, 
                  borderColor: theme.colors.border,
                  color: theme.colors.accentDark 
                }}
              >
                Muat Lebih Banyak Ucapan ({localWishes.length - visibleWishesCount} tersisa)
              </button>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="py-12 px-8 text-center space-y-4"
          style={{ 
            backgroundColor: theme.isDark ? '#060B18' : '#1F1C18', 
            color: '#FAF8F4' 
          }}
        >
          <FlourishDivider themeId={invitation.theme} color={theme.colors.accent} />
          <h4 
            className="font-serif text-2xl tracking-wider"
            style={{ color: theme.colors.accent }}
          >
            MAZÉLIA
          </h4>
          <p className="text-xs opacity-75 tracking-widest uppercase">
            Events • Moments • Memories
          </p>
          <div className="text-[11px] opacity-60 pt-4 border-t border-white/10">
            Dibuat dengan cinta untuk {invitation.groom_nickname} & {invitation.bride_nickname}
          </div>
        </footer>
      </main>
    </div>
  );
}
