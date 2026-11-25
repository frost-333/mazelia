import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Edit, 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MessageSquareHeart,
  Calendar,
  MapPin
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils/formatters';
import { DEFAULT_INVITATION } from '@/lib/constants/default-invitation';
import { GuestLinkGenerator } from '@/components/modules/admin/GuestLinkGenerator';
import { BulkGuestGenerator } from '@/components/modules/admin/BulkGuestGenerator';
import { AdminGuestbookTable } from '@/components/modules/admin/AdminGuestbookTable';
import { LogoutButton } from '@/components/layout/LogoutButton';

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ClientDetailPageProps) {
  const { id } = await params;
  return {
    title: `Kelola Acara Klien — MAZÉLIA Admin`,
  };
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/studio-mazelia/portal-masuk`);
  }

  // Fetch this specific invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .single();

  const targetInvitation =
    invitation ||
    (id === DEFAULT_INVITATION.id || id === 'demo' ? DEFAULT_INVITATION : null);

  if (!targetInvitation) {
    notFound();
  }

  // Fetch wishes for this specific invitation
  const { data: wishes } = await supabase
    .from('invitation_wishes')
    .select('*')
    .eq('invitation_id', targetInvitation.id)
    .order('created_at', { ascending: false });

  const wishList = wishes || [];

  // Metrics
  const totalWishes = wishList.length;
  const attendingCount = wishList.filter((w) => w.attendance === 'attending').length;
  const maybeCount = wishList.filter((w) => w.attendance === 'maybe').length;
  const declinedCount = wishList.filter((w) => w.attendance === 'not_attending').length;
  const totalPax = wishList
    .filter((w) => w.attendance === 'attending')
    .reduce((sum, w) => sum + (w.pax_count || 1), 0);

  const invitationSlug = targetInvitation.slug;
  const invitationUrl = `/${invitationSlug}`;

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302D29] font-sans selection:bg-[#B69A72]/20 selection:text-[#846B48]">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#EAE5DC] sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/studio-mazelia/ruang-agensi"
              className="inline-flex items-center gap-1.5 text-xs text-[#846B48] hover:text-[#302D29] font-semibold mr-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Semua Klien</span>
            </Link>
            <span className="text-[#EAE5DC]">|</span>
            <span className="font-serif text-lg font-bold text-[#302D29] truncate max-w-[200px] sm:max-w-none">
              {targetInvitation.title}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={invitationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#B69A72]/30 bg-[#FAF8F4] text-xs font-semibold text-[#846B48] hover:bg-[#F2EDE4] transition-all shadow-sm"
            >
              <span>Lihat Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href={`/studio-mazelia/ruang-agensi/invitations/${targetInvitation.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs font-semibold shadow-luxury-gold transition-all"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Data</span>
            </Link>

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Banner Info / Overview */}
        <div className="bg-gradient-to-r from-white via-white to-[#FAF8F4] rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Online
              </span>
              <a
                href={invitationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#846B48] hover:text-[#B69A72] bg-[#FAF8F4] px-2.5 py-1 rounded-lg border border-[#EAE5DC] flex items-center gap-1 transition-colors"
              >
                <span>URL: /{invitationSlug}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#302D29]">
              {targetInvitation.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E675F] flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>📅 {formatDateIndo(targetInvitation.ceremony_date)}</span>
              <span>•</span>
              <span>📍 {targetInvitation.ceremony_location || 'Lokasi Acara'}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0">
            <Link
              href={`/studio-mazelia/ruang-agensi/invitations/${targetInvitation.id}/edit`}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs sm:text-sm font-semibold shadow-luxury-gold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Nama & Acara</span>
            </Link>

            <a
              href={`/${invitationSlug}/monitor`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#B69A72]/40 hover:bg-[#F2EDE4] text-[#846B48] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              title="Portal Khusus Calon Pengantin (Read-Only Monitor & WhatsApp Sender)"
            >
              <span>Portal Pengantin 📱</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={invitationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white border border-[#EAE5DC] hover:bg-[#FAF8F4] text-[#846B48] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Buka Website</span>
            </a>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span className="font-medium">Konfirmasi Hadir</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-[#302D29]">
              {attendingCount}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span>Total {totalPax} Pax Hadir</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span className="font-medium">Masih Ragu</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-[#302D29]">
              {maybeCount}
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
              {declinedCount}
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              Mengirim doa restu
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
              {totalWishes}
            </div>
            <div className="text-[11px] text-[#846B48] font-medium">
              Tercatat di Buku Tamu Klien
            </div>
          </div>
        </div>

        {/* Bulk Guest Link & WhatsApp Generator */}
        <BulkGuestGenerator
          slug={invitationSlug}
          groomNickname={targetInvitation.groom_nickname || 'Groom'}
          brideNickname={targetInvitation.bride_nickname || 'Bride'}
          ceremonyDate={targetInvitation.ceremony_date}
          ceremonyLocation={targetInvitation.ceremony_location}
        />

        {/* Guest Link & WhatsApp Generator (Single Guest) */}
        <GuestLinkGenerator
          slug={invitationSlug}
          groomNickname={targetInvitation.groom_nickname || 'Groom'}
          brideNickname={targetInvitation.bride_nickname || 'Bride'}
          ceremonyDate={targetInvitation.ceremony_date}
          ceremonyLocation={targetInvitation.ceremony_location}
        />

        {/* Content: Guestbook & Wishes Table with Filter, Search, CSV Export & Delete */}
        <AdminGuestbookTable initialWishes={wishList} />
      </main>
    </div>
  );
}
