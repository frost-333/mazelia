'use server';

import { createClient } from '@/lib/supabase/server';
import { budgetItemSchema } from '@/lib/validations/budget';
import { revalidatePath } from 'next/cache';

export async function createBudgetItemAction(eventId: string, prevState: any, formData: FormData) {
  const category = formData.get('category') as string;
  const item_name = formData.get('item_name') as string;
  const estimated_cost = formData.get('estimated_cost') ? Math.round(Number(formData.get('estimated_cost'))) : 0;
  const actual_cost = formData.get('actual_cost') ? Math.round(Number(formData.get('actual_cost'))) : 0;
  const down_payment = formData.get('down_payment') ? Math.round(Number(formData.get('down_payment'))) : 0;
  const notes = formData.get('notes') as string;

  let payment_status: 'unpaid' | 'partially_paid' | 'paid' = 'unpaid';
  if (actual_cost > 0 && down_payment >= actual_cost) {
    payment_status = 'paid';
  } else if (down_payment > 0) {
    payment_status = 'partially_paid';
  }

  const validated = budgetItemSchema.safeParse({
    category,
    item_name,
    estimated_cost,
    actual_cost,
    down_payment,
    payment_status,
    notes,
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Data anggaran tidak valid' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('event_budgets').insert({
    event_id: eventId,
    category: validated.data.category,
    item_name: validated.data.item_name,
    estimated_cost: validated.data.estimated_cost,
    actual_cost: validated.data.actual_cost,
    down_payment: validated.data.down_payment,
    payment_status: validated.data.payment_status,
    notes: validated.data.notes || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/budget`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Item anggaran berhasil ditambahkan!' };
}

export async function updateBudgetItemAction(id: string, eventId: string, prevState: any, formData: FormData) {
  const category = formData.get('category') as string;
  const item_name = formData.get('item_name') as string;
  const estimated_cost = formData.get('estimated_cost') ? Math.round(Number(formData.get('estimated_cost'))) : 0;
  const actual_cost = formData.get('actual_cost') ? Math.round(Number(formData.get('actual_cost'))) : 0;
  const down_payment = formData.get('down_payment') ? Math.round(Number(formData.get('down_payment'))) : 0;
  const notes = formData.get('notes') as string;

  let payment_status: 'unpaid' | 'partially_paid' | 'paid' = 'unpaid';
  if (actual_cost > 0 && down_payment >= actual_cost) {
    payment_status = 'paid';
  } else if (down_payment > 0) {
    payment_status = 'partially_paid';
  }

  const validated = budgetItemSchema.safeParse({
    category,
    item_name,
    estimated_cost,
    actual_cost,
    down_payment,
    payment_status,
    notes,
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Data anggaran tidak valid' };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('event_budgets')
    .update({
      category: validated.data.category,
      item_name: validated.data.item_name,
      estimated_cost: validated.data.estimated_cost,
      actual_cost: validated.data.actual_cost,
      down_payment: validated.data.down_payment,
      payment_status: validated.data.payment_status,
      notes: validated.data.notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('event_id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/budget`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Item anggaran berhasil diperbarui!' };
}

export async function deleteBudgetItemAction(id: string, eventId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('event_budgets')
    .delete()
    .eq('id', id)
    .eq('event_id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/budget`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Item anggaran berhasil dihapus' };
}

export async function updateOverallTargetBudget(eventId: string, newTarget: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('events')
    .update({
      estimated_budget: Math.round(Number(newTarget)),
      updated_at: new Date().toISOString(),
    })
    .eq('id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/budget`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Target total anggaran berhasil diperbarui!' };
}
