import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { EventSettingsClient } from '@/components/modules/events/EventSettingsClient';

export default async function EventSettingsPage({
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

  return (
    <div className="space-y-6 max-w-3xl">
      <DashboardHeader
        title="Pengaturan Acara"
        subtitle={`Kelola parameter dan status untuk ${event.name}.`}
      />

      <EventSettingsClient event={event} />
    </div>
  );
}
