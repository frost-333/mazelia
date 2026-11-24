import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  MessageSquareHeart, 
  Calendar, 
  ExternalLink, 
  Gift, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Copy,
  Edit,
  Sparkles,
  ArrowUpRight,
  Music,
  Share2,
  SlidersHorizontal,
  LayoutDashboard
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils/formatters';

export const metadata = {
  title: 'Admin Undangan — MAZÉLIA',
  description: 'Kelola data undangan, tamu, ucapan, dan konfirmasi RSVP',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }

  // Fetch invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const targetInvitation = invitation || (
    await supabase.from('invitations').select('*').eq('slug', 'sarah-brian').single()
  ).data;

  // Fetch wishes
  const { data: wishes } = await supabase
    .from('invitation_wishes')
    .select('*')
    .eq('invitation_id', targetInvitation?.id || '')
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

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302D29] font-sans selection:bg-[#B69A72]/20 selection:text-[#846B48]">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#EAE5DC] sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl font-bold tracking-wider text-[#302D29] group-hover:text-[#B69A72] transition-colors">
                MAZÉLIA
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#B69A72]/15 text-[#846B48] border border-[#B69A72]/30 text-[10px] uppercase font-bold tracking-widest">
                Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#B69A72]/30 bg-[#FAF8F4] text-xs font-semibold text-[#846B48] hover:bg-[#F2EDE4] transition-all shadow-sm"
            >
              <span>Lihat Undangan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/edit"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs font-semibold shadow-luxury-gold transition-all"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Undangan</span>
            </Link>

            <form action="/auth/signout" method="post">
              <button 
                type="submit" 
                className="text-xs text-[#9B9185] hover:text-red-600 font-medium px-2.5 py-1.5 transition-colors"
              >
                Keluar
              </button>
            </form>
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
                Undangan Online
              </span>
              <span className="text-xs text-[#9B9185] bg-[#FAF8F4] px-2.5 py-1 rounded-lg border border-[#EAE5DC]">
                URL: /{targetInvitation?.slug}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#302D29]">
              {targetInvitation?.title || 'The Wedding of Sarah & Brian'}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E675F] flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>📅 {formatDateIndo(targetInvitation?.ceremony_date)}</span>
              <span>•</span>
              <span>📍 {targetInvitation?.ceremony_location}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0">
            <Link
              href="/admin/edit"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs sm:text-sm font-semibold shadow-luxury-gold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Nama & Acara</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white border border-[#EAE5DC] hover:bg-[#FAF8F4] text-[#846B48] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Buka Website</span>
            </Link>
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
              Tercatat di Buku Tamu
            </div>
          </div>
        </div>

        {/* Content: Guestbook & Wishes Table */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#EAE5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#302D29]">
                Buku Tamu & Ucapan Doa Masuk
              </h2>
              <p className="text-xs text-[#9B9185] mt-0.5">
                Semua doa restu dan konfirmasi kehadiran yang dikirimkan oleh para tamu melalui website.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#846B48] bg-[#FAF8F4] px-3 py-1.5 rounded-lg border border-[#EAE5DC] self-start sm:self-auto">
              Total {wishList.length} Ucapan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#6E675F] uppercase font-semibold border-b border-[#EAE5DC]">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Nama Pengirim</th>
                  <th className="py-3 px-4 sm:px-6">Hubungan</th>
                  <th className="py-3 px-4 sm:px-6">Kehadiran</th>
                  <th className="py-3 px-4 sm:px-6">Pax</th>
                  <th className="py-3 px-4 sm:px-6">Pesan Doa Restu</th>
                  <th className="py-3 px-4 sm:px-6">Waktu Kirim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5DC]">
                {wishList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#9B9185]">
                      Belum ada ucapan doa atau konfirmasi RSVP masuk.
                    </td>
                  </tr>
                ) : (
                  wishList.map((w) => (
                    <tr key={w.id} className="hover:bg-[#FAF8F4]/60 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-[#302D29]">
                        {w.sender_name}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-[#6E675F]">
                        {w.relationship || '-'}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          w.attendance === 'attending'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : w.attendance === 'maybe'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {w.attendance === 'attending' ? 'Hadir' : w.attendance === 'maybe' ? 'Ragu' : 'Tidak Hadir'}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-mono font-semibold text-[#302D29]">
                        {w.pax_count || 1}
                      </td>
                      <td className="py-4 px-4 sm:px-6 max-w-sm sm:max-w-md text-[#4A4641] leading-relaxed whitespace-pre-wrap">
                        {w.message}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-[#9B9185] whitespace-nowrap">
                        {new Date(w.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
