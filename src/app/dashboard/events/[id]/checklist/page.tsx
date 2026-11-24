import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { ChecklistClient } from '@/components/modules/checklist/ChecklistClient';

export default async function EventChecklistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from('events')
    .select('name')
    .eq('id', eventId)
    .single();

  if (!event) notFound();

  const { data: checklists } = await supabase
    .from('event_checklists')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Checklist & Lini Masa"
        subtitle={`Daftar tugas persiapan untuk ${event.name}.`}
      />

      <ChecklistClient eventId={eventId} initialChecklists={checklists || []} />
    </div>
  );
}
