import { createClient } from '@/lib/supabase/server';
import { InvitationClient } from '@/components/modules/invitation/InvitationClient';
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
  searchParams: Promise<{ to?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { to: guestName } = await searchParams;
  const supabase = await createClient();

  // Ambil undangan utama (default: sarah-brian)
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', 'sarah-brian')
    .single();

  const fallbackInvitation = invitation || {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    slug: 'sarah-brian',
    title: 'The Wedding of Sarah & Brian',
    theme: 'champagne_gold',
    groom_name: 'Brian Pratama, S.T.',
    groom_nickname: 'Brian',
    groom_parents: 'Putra pertama dari Bpk. Bambang Sudirman & Ibu Ratna Dewi',
    groom_instagram: 'brianpratama',
    bride_name: 'Sarah Almira, S.Ds.',
    bride_nickname: 'Sarah',
    bride_parents: 'Putri kedua dari Bpk. Ir. Hendra Gunawan & Ibu Sri Wahyuni',
    bride_instagram: 'sarahalmira',
    quote_text: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    quote_source: 'QS. Ar-Rum: 21',
    ceremony_title: 'Akad Nikah & Upacara Adat',
    ceremony_date: '2027-01-08',
    ceremony_start_time: '08:00',
    ceremony_end_time: '10:30',
    ceremony_location: 'The Dharmawangsa Poolside',
    ceremony_address: 'Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan',
    ceremony_maps_url: 'https://maps.google.com/?q=The+Dharmawangsa+Jakarta',
    reception_title: 'Resepsi Pernikahan',
    reception_date: '2027-01-08',
    reception_start_time: '11:30',
    reception_end_time: '14:30',
    reception_location: 'Grand Ballroom The Dharmawangsa',
    reception_address: 'Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan',
    reception_maps_url: 'https://maps.google.com/?q=The+Dharmawangsa+Jakarta',
    bank_name_1: 'BCA',
    bank_account_1: '5271928391',
    bank_holder_1: 'Brian Pratama',
    bank_name_2: 'Mandiri',
    bank_account_2: '1370019283912',
    bank_holder_2: 'Sarah Almira',
    music_url: 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-harp-and-strings-1033.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  };

  const { data: wishes } = await supabase
    .from('invitation_wishes')
    .select('*')
    .eq('invitation_id', fallbackInvitation.id)
    .order('created_at', { ascending: false });

  return (
    <InvitationClient
      invitation={fallbackInvitation}
      wishes={wishes || []}
      guestName={guestName}
    />
  );
}
