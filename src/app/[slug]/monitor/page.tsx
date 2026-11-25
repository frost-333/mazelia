import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Heart, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MessageSquareHeart, 
  Users, 
  Share2, 
  ExternalLink,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils/formatters';
import { DEFAULT_INVITATION } from '@/lib/constants/default-invitation';
import { ClientMonitorView } from '@/components/modules/portal/ClientMonitorView';

interface ClientMonitorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ClientMonitorPageProps) {
  const { slug } = await params;
  return {
    title: `Portal Tamu & RSVP — MAZÉLIA`,
    description: `Pantau kehadiran tamu dan doa restu secara langsung.`,
  };
}

export default async function ClientMonitorPage({ params }: ClientMonitorPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .single();

  const activeInvitation =
    invitation ||
    (slug === 'fadhil-mazaya' || slug === 'sarah-brian' ? DEFAULT_INVITATION : null);

  if (!activeInvitation) {
    notFound();
  }

  const { data: wishes } = await supabase
    .from('invitation_wishes')
    .select('*')
    .eq('invitation_id', activeInvitation.id)
    .order('created_at', { ascending: false });

  const wishList = wishes || [];

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302D29] font-sans selection:bg-[#B69A72]/20">
      {/* Top Navbar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#EAE5DC] sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF8F4] border border-[#B69A72]/40 text-[#846B48] flex items-center justify-center font-serif font-bold text-sm">
              M
            </div>
            <div>
              <span className="font-serif font-bold text-sm tracking-wider text-[#302D29] block">
                MAZÉLIA
              </span>
              <span className="text-[10px] text-[#846B48] font-medium block">
                Portal Pengantin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#B69A72]/30 bg-[#FAF8F4] text-xs font-semibold text-[#846B48] hover:bg-[#F2EDE4] transition-all"
            >
              <span>Buka Undangan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <ClientMonitorView 
          invitation={activeInvitation}
          initialWishes={wishList}
        />
      </main>

      <footer className="text-center py-8 text-xs text-[#9B9185] border-t border-[#EAE5DC]">
        MAZÉLIA — Digital Wedding Experience
      </footer>
    </div>
  );
}