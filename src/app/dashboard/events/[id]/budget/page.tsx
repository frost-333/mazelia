import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { BudgetClient } from '@/components/modules/budget/BudgetClient';

export default async function EventBudgetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from('events')
    .select('name, estimated_budget')
    .eq('id', eventId)
    .single();

  if (!event) notFound();

  const { data: budgets } = await supabase
    .from('event_budgets')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Budget Planner"
        subtitle={`Pengelolaan dan kalkulasi anggaran finansial untuk ${event.name}.`}
      />

      <BudgetClient
        eventId={eventId}
        targetBudget={event.estimated_budget || 0}
        initialBudgets={budgets || []}
      />
    </div>
  );
}
