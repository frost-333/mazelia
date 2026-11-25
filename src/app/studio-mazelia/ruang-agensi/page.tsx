import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  Users, 
  MessageSquareHeart, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { DEFAULT_INVITATION } from '@/lib/constants/default-invitation';
import { logoutAction } from '@/actions/auth-actions';
import { AgencyClientGrid } from '@/components/modules/admin/AgencyClientGrid';

export const metadata = {
  title: 'Agency Hub — MAZÉLIA Admin',
  description: 'Kelola semua website undangan digital klien dari satu dashboard terpusat.',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/studio-mazelia/portal-masuk');
  }

  // Fetch all invitations created by user
  const { data: userInvitations } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fallback: if no invitations in DB yet, show DEFAULT_INVITATION
  let allInvitations = userInvitations || [];
  if (allInvitations.length === 0) {
    // Check if there is sarah-brian or fadhil-mazaya in DB
    const { data: sample } = await supabase.from('invitations').select('*').limit(5);
    if (sample && sample.length > 0) {
      allInvitations = sample;
    } else {
      allInvitations = [DEFAULT_INVITATION];
    }
  }

  // Fetch all wishes across these invitations
  const invitationIds = allInvitations.map((i) => i.id);
  const { data: allWishes } = await supabase
    .from('invitation_wishes')
    .select('id, invitation_id, attendance, pax_count')
    .in('invitation_id', invitationIds);

  const wishesList = allWishes || [];

  // Calculate stats per invitation
  const itemsWithStats = allInvitations.map((inv) => {
    const invWishes = wishesList.filter((w) => w.invitation_id === inv.id);
    const attendingCount = invWishes.filter((w) => w.attendance === 'attending').length;
    const totalPax = invWishes
      .filter((w) => w.attendance === 'attending')
      .reduce((sum, w) => sum + (w.pax_count || 1), 0);

    return {
      id: inv.id,
      slug: inv.slug,
      title: inv.title,
      groom_nickname: inv.groom_nickname || 'Groom',
      bride_nickname: inv.bride_nickname || 'Bride',
      ceremony_date: inv.ceremony_date,
      ceremony_location: inv.ceremony_location,
      created_at: inv.created_at || new Date().toISOString(),
      status: inv.status || 'active',
      attendingCount,
      totalPax,
      totalWishes: invWishes.length,
    };
  });

  // Global Agency Metrics
  const totalClients = itemsWithStats.length;
  const globalAttending = itemsWithStats.reduce((sum, item) => sum + item.attendingCount, 0);
  const globalPax = itemsWithStats.reduce((sum, item) => sum + item.totalPax, 0);
  const globalWishes = itemsWithStats.reduce((sum, item) => sum + item.totalWishes, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302D29] font-sans selection:bg-[#B69A72]/20 selection:text-[#846B48]">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#EAE5DC] sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/studio-mazelia/ruang-agensi" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl font-bold tracking-wider text-[#302D29] group-hover:text-[#B69A72] transition-colors">
                MAZÉLIA
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#B69A72]/15 text-[#846B48] border border-[#B69A72]/30 text-[10px] uppercase font-bold tracking-widest">
                Agency
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/studio-mazelia/ruang-agensi/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs font-semibold shadow-luxury-gold transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Klien</span>
            </Link>

            <form action={logoutAction}>
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
        {/* Banner Overview */}
        <div className="bg-gradient-to-r from-white via-white to-[#FAF8F4] rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#B69A72]/15 text-[#846B48] border border-[#B69A72]/30 text-xs font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#B69A72]" />
                Client Management Hub
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
              Katalog Undangan Klien Agensi
            </h1>
            <p className="text-xs sm:text-sm text-[#6E675F]">
              Kelola seluruh website undangan digital pesanan klien Anda, pantau RSVP, dan atur buku tamu dalam satu dashboard.
            </p>
          </div>

          <Link
            href="/studio-mazelia/ruang-agensi/new"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs sm:text-sm font-semibold shadow-luxury-gold transition-all"
          >
            <span>Buat Undangan Klien</span>
          </Link>
        </div>

        {/* Global Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span className="font-medium">Total Klien / Acara</span>
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F4] border border-[#B69A72]/30 flex items-center justify-center">
                <Layers className="w-4 h-4 text-[#B69A72]" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-[#302D29]">
              {totalClients}
            </div>
            <div className="text-[11px] text-[#846B48] font-medium">
              Website Undangan Aktif
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span className="font-medium">Konfirmasi Hadir</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-[#302D29]">
              {globalAttending}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold">
              Total {globalPax} Pax Tamu
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span className="font-medium">Total Doa & Ucapan</span>
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F4] border border-[#B69A72]/30 flex items-center justify-center">
                <MessageSquareHeart className="w-4 h-4 text-[#B69A72]" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-[#302D29]">
              {globalWishes}
            </div>
            <div className="text-[11px] text-[#846B48] font-medium">
              Tercatat di Seluruh Buku Tamu
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE5DC] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#9B9185]">
              <span className="font-medium">Tipe Layanan</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="font-serif text-2xl font-bold text-[#302D29]">
              Unlimited
            </div>
            <div className="text-[11px] text-[#9B9185] font-medium">
              Multi-Client Ready
            </div>
          </div>
        </div>

        {/* Agency Client Grid */}
        <AgencyClientGrid initialInvitations={itemsWithStats} />
      </main>
    </div>
  );
}
