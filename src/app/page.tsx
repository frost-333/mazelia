import { createClient } from '@/lib/supabase/server';
import { InvitationClient } from '@/components/modules/invitation/InvitationClient';
import { DEFAULT_INVITATION } from '@/lib/constants/default-invitation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Wedding of Sarah & Brian — MAZÉLIA Undangan Digital',
  description: 'Undangan Pernikahan Eksklusif Sarah & Brian. Events • Moments • Memories.',
  openGraph: {
    title: 'The Wedding of Sarah & Brian — MAZÉLIA',
    description: 'Undangan Pernikahan Eksklusif Sarah & Brian. Events • Moments • Memories.',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'],
  },
};

interface HomePageProps {
  searchParams?: Promise<{ to?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const guestName = resolvedParams?.to;
  const supabase = await createClient();

  // Ambil undangan utama (default: sarah-brian)
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', 'sarah-brian')
    .single();

  const activeInvitation = invitation || DEFAULT_INVITATION;

  const { data: wishes } = await supabase
    .from('invitation_wishes')
    .select('*')
    .eq('invitation_id', activeInvitation.id)
    .order('created_at', { ascending: false });

  return (
    <InvitationClient
      invitation={activeInvitation}
      wishes={wishes || []}
      guestName={guestName}
    />
  );
}
