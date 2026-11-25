import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { InvitationClient } from '@/components/modules/invitation/InvitationClient';
import { DEFAULT_INVITATION } from '@/lib/constants/default-invitation';
import type { Metadata } from 'next';

const RESERVED_SLUGS = [
  'admin',
  'dashboard',
  'login',
  'register',
  'forgot-password',
  'fitur',
  'pricing',
  'tentang',
  'kontak',
  'api',
  'auth',
  'i',
  '_next',
  'favicon.ico',
];

interface SlugPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ to?: string; preview?: string; previewTheme?: string }>;
}

export async function generateMetadata({ params, searchParams }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
    return { title: 'MAZÉLIA' };
  }

  const resolvedParams = searchParams ? await searchParams : undefined;
  const guestName = resolvedParams?.to;
  const supabase = await createClient();

  const { data: invitation } = await supabase
    .from('invitations')
    .select('title, groom_nickname, bride_nickname, cover_image_url')
    .eq('slug', slug)
    .single();

  const activeInvitation =
    invitation ||
    (slug === 'fadhil-mazaya' || slug === 'sarah-brian' ? DEFAULT_INVITATION : null);

  if (!activeInvitation) {
    return { title: 'Undangan Tidak Ditemukan — MAZÉLIA' };
  }

  const titleText = guestName
    ? `Undangan Spesial untuk ${guestName} — ${activeInvitation.title}`
    : `${activeInvitation.title} — MAZÉLIA`;

  return {
    title: titleText,
    description: `Undangan Pernikahan Eksklusif ${activeInvitation.groom_nickname} & ${activeInvitation.bride_nickname}`,
    openGraph: {
      title: titleText,
      description: `Undangan Pernikahan Eksklusif ${activeInvitation.groom_nickname} & ${activeInvitation.bride_nickname}`,
      images: activeInvitation.cover_image_url ? [activeInvitation.cover_image_url] : [],
    },
  };
}

export default async function SlugPage({ params, searchParams }: SlugPageProps) {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
    notFound();
  }

  const resolvedParams = searchParams ? await searchParams : undefined;
  const guestName = resolvedParams?.to;
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

  // If status is draft and not in preview mode, show holding page
  if (activeInvitation.status === 'draft' && resolvedParams?.preview !== 'true') {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center text-[#302D29] font-sans selection:bg-[#B69A72]/20">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#EAE5DC] shadow-luxury space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F4] text-[#B69A72] border border-[#B69A72]/30 flex items-center justify-center mx-auto shadow-sm">
            <span className="font-serif italic text-2xl font-bold">M</span>
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold uppercase tracking-wider inline-block">
              Sedang Disiapkan
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D29]">
              {activeInvitation.title}
            </h1>
            <p className="text-xs text-[#6E675F] leading-relaxed pt-1">
              Website undangan pernikahan ini sedang dalam tahap persiapan dan penyempurnaan detail oleh kedua mempelai dan tim vendor.
            </p>
          </div>

          <div className="pt-4 border-t border-[#EAE5DC] space-y-3">
            <a
              href={`/${slug}?preview=true`}
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-[#FAF8F4] hover:bg-[#F2EDE4] border border-[#B69A72]/40 text-xs font-semibold text-[#846B48] transition-all shadow-sm"
            >
              Mode Pratinjau (Khusus Calon Pengantin / Admin)
            </a>
            <p className="text-[10px] text-[#9B9185]">
              MAZÉLIA — Platform Undangan Digital Eksklusif
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { data: wishes } = await supabase
    .from('invitation_wishes')
    .select('*')
    .eq('invitation_id', activeInvitation.id)
    .order('created_at', { ascending: false });

  const invitationWithPreviewTheme = resolvedParams?.previewTheme
    ? { ...activeInvitation, theme: resolvedParams.previewTheme }
    : activeInvitation;

  return (
    <InvitationClient
      invitation={invitationWithPreviewTheme}
      wishes={wishes || []}
      guestName={guestName}
    />
  );
}
