import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { GuestClient } from '@/components/modules/guests/GuestClient';

export default async function EventGuestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();

  if (!event) notFound();

  const { data: guests } = await supabase
    .from('guests')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  const { data: groups } = await supabase
    .from('guest_groups')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Daftar Tamu & RSVP"
        subtitle={`Manajemen tamu undangan dan generator pesan WhatsApp untuk ${event.name}.`}
      />

      <GuestClient
        eventId={eventId}
        event={event}
        initialGuests={guests || []}
        initialGroups={groups || []}
      />
    </div>
  );
}
