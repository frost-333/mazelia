import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { InvitationClient } from '@/components/modules/invitation/InvitationClient';
import type { Metadata } from 'next';

interface InvitationPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

export async function generateMetadata({ params }: InvitationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: invitation } = await supabase
    .from('invitations')
    .select('title, groom_nickname, bride_nickname, cover_image_url')
    .eq('slug', slug)
    .single();

  if (!invitation) {
    return { title: 'Undangan Tidak Ditemukan — MAZÉLIA' };
  }

  return {
    title: `${invitation.title} — MAZÉLIA`,
    description: `Undangan Pernikahan ${invitation.groom_nickname} & ${invitation.bride_nickname}`,
    openGraph: {
      title: `${invitation.title} — MAZÉLIA`,
      description: `Undangan Pernikahan ${invitation.groom_nickname} & ${invitation.bride_nickname}`,
      images: invitation.cover_image_url ? [invitation.cover_image_url] : [],
    },
  };
}

export default async function InvitationPage({ params, searchParams }: InvitationPageProps) {
  const { slug } = await params;
  const { to: guestName } = await searchParams;
  const supabase = await createClient();

  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !invitation) {
    notFound();
  }

  const { data: wishes } = await supabase
    .from('invitation_wishes')
    .select('*')
    .eq('invitation_id', invitation.id)
    .order('created_at', { ascending: false });

  return (
    <InvitationClient
      invitation={invitation}
      wishes={wishes || []}
      guestName={guestName}
    />
  );
}
