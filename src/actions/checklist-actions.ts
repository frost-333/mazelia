'use server';

import { createClient } from '@/lib/supabase/server';
import { checklistSchema } from '@/lib/validations/checklist';
import { revalidatePath } from 'next/cache';

export async function toggleChecklistAction(id: string, eventId: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('event_checklists')
    .update({
      is_completed: !currentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('event_id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/checklist`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: true };
}

export async function createChecklistAction(eventId: string, prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const category = (formData.get('category') as string) || 'Umum';
  const priority = (formData.get('priority') as any) || 'medium';
  const due_date = formData.get('due_date') as string;
  const description = formData.get('description') as string;

  const validated = checklistSchema.safeParse({
    title,
    category,
    priority,
    due_date,
    description,
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Data tugas tidak valid' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('event_checklists').insert({
    event_id: eventId,
    title: validated.data.title,
    category: validated.data.category,
    priority: validated.data.priority,
    due_date: validated.data.due_date || null,
    description: validated.data.description || null,
    is_completed: false,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/checklist`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Tugas baru berhasil ditambahkan!' };
}

export async function updateChecklistAction(id: string, eventId: string, prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const category = (formData.get('category') as string) || 'Umum';
  const priority = (formData.get('priority') as any) || 'medium';
  const due_date = formData.get('due_date') as string;
  const description = formData.get('description') as string;

  const validated = checklistSchema.safeParse({
    title,
    category,
    priority,
    due_date,
    description,
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Data tidak valid' };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('event_checklists')
    .update({
      title: validated.data.title,
      category: validated.data.category,
      priority: validated.data.priority,
      due_date: validated.data.due_date || null,
      description: validated.data.description || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('event_id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/checklist`);
  return { success: 'Tugas berhasil diperbarui!' };
}

export async function deleteChecklistAction(id: string, eventId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('event_checklists')
    .delete()
    .eq('id', id)
    .eq('event_id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/checklist`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Tugas berhasil dihapus' };
}
