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
  ArrowUpRight
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

  // If user has no invitation linked yet, fallback to sample slug
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
      <header className="bg-white border-b border-[#EAE5DC] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-serif text-2xl font-bold tracking-wider text-[#302D29]">
              MAZÉLIA <span className="text-xs uppercase font-sans font-semibold tracking-widest text-[#B69A72] ml-1">Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/i/${targetInvitation?.slug || 'sarah-brian'}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#B69A72]/40 bg-[#FAF8F4] text-xs font-semibold text-[#846B48] hover:bg-[#F2EDE4] transition-all"
            >
              <span>Lihat Undangan Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <form action="/auth/signout" method="post">
              <button 
                type="submit" 
                className="text-xs text-[#9B9185] hover:text-[#302D29] font-medium px-3 py-1.5"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Info */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                Undangan Aktif
              </span>
              <span className="text-xs text-[#9B9185]">Slug: /{targetInvitation?.slug}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
              {targetInvitation?.title || 'The Wedding of Sarah & Brian'}
            </h1>
            <p className="text-xs text-[#6E675F]">
              Tanggal Acara: {formatDateIndo(targetInvitation?.ceremony_date)} • {targetInvitation?.ceremony_location}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs font-medium shadow-luxury-gold flex items-center gap-1.5 transition-all"
            >
              <span>Buka Halaman Utama</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span>Tamu Konfirmasi Hadir</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
              {attendingCount}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium">
              Total {totalPax} Pax Hadir
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span>Masih Ragu-ragu</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
              {maybeCount}
            </div>
            <div className="text-[11px] text-amber-700 font-medium">
              Perlu konfirmasi ulang
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span>Berhalangan Hadir</span>
              <XCircle className="w-4 h-4 text-gray-400" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
              {declinedCount}
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              Telah mengirim ucapan
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span>Total Ucapan Doa</span>
              <MessageSquareHeart className="w-4 h-4 text-[#B69A72]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
              {totalWishes}
            </div>
            <div className="text-[11px] text-[#846B48] font-medium">
              Doa restu tersimpan
            </div>
          </div>
        </div>

        {/* Content: RSVP & Wishes Table */}
        <div className="bg-white rounded-2xl border border-[#EAE5DC] shadow-sm overflow-hidden space-y-4">
          <div className="p-6 border-b border-[#EAE5DC] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#302D29]">
                Buku Tamu & Ucapan Doa Masuk
              </h2>
              <p className="text-xs text-[#9B9185] mt-0.5">
                Semua ucapan dan konfirmasi kehadiran yang dikirimkan oleh para undangan melalui website.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F4] text-[#6E675F] uppercase font-semibold border-b border-[#EAE5DC]">
                <tr>
                  <th className="py-3 px-6">Nama Pengirim</th>
                  <th className="py-3 px-6">Hubungan</th>
                  <th className="py-3 px-6">Kehadiran</th>
                  <th className="py-3 px-6">Pax</th>
                  <th className="py-3 px-6">Pesan Doa Restu</th>
                  <th className="py-3 px-6">Waktu Kirim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5DC]">
                {wishList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#9B9185]">
                      Belum ada ucapan doa atau konfirmasi RSVP masuk.
                    </td>
                  </tr>
                ) : (
                  wishList.map((w) => (
                    <tr key={w.id} className="hover:bg-[#FAF8F4]/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-[#302D29]">
                        {w.sender_name}
                      </td>
                      <td className="py-4 px-6 text-[#6E675F]">
                        {w.relationship || '-'}
                      </td>
                      <td className="py-4 px-6">
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
                      <td className="py-4 px-6 font-mono text-[#302D29]">
                        {w.pax_count || 1}
                      </td>
                      <td className="py-4 px-6 max-w-md text-[#4A4641] leading-relaxed">
                        {w.message}
                      </td>
                      <td className="py-4 px-6 text-[#9B9185] whitespace-nowrap">
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
