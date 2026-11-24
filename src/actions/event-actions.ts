'use server';

import { createClient } from '@/lib/supabase/server';
import { eventSchema } from '@/lib/validations/event';
import { CHECKLIST_PRESETS } from '@/lib/constants/checklist-presets';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEventAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const category = (formData.get('category') as string) || 'Wedding';
  const event_date = formData.get('event_date') as string;
  const event_time = formData.get('event_time') as string;
  const city = formData.get('city') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const estimated_budget = formData.get('estimated_budget') ? Number(formData.get('estimated_budget')) : 0;
  const estimated_guest_count = formData.get('estimated_guest_count') ? Number(formData.get('estimated_guest_count')) : 0;

  const validated = eventSchema.safeParse({
    name,
    category,
    event_date,
    event_time,
    city,
    location,
    description,
    estimated_budget,
    estimated_guest_count,
  });

  if (!validated.success) {
    return {
      error: validated.error.errors[0]?.message || 'Data acara tidak valid',
    };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Sesi telah berakhir. Silakan masuk kembali.' };
  }

  // 1. Insert Event
  const { data: newEvent, error: eventError } = await supabase
    .from('events')
    .insert({
      user_id: user.id,
      name: validated.data.name,
      category: validated.data.category,
      event_date: validated.data.event_date,
      event_time: validated.data.event_time || null,
      city: validated.data.city,
      location: validated.data.location || null,
      description: validated.data.description || null,
      estimated_budget: validated.data.estimated_budget,
      estimated_guest_count: validated.data.estimated_guest_count,
      status: 'planning',
    })
    .select('id')
    .single();

  if (eventError || !newEvent) {
    return { error: eventError?.message || 'Gagal membuat acara baru' };
  }

  const eventId = newEvent.id;

  // 2. Pre-populate Checklists based on category
  const presets = CHECKLIST_PRESETS[validated.data.category] || CHECKLIST_PRESETS.Other;
  if (presets && presets.length > 0) {
    const checklistPayload = presets.map((item) => ({
      event_id: eventId,
      title: item.title,
      category: item.category,
      priority: item.priority,
      is_completed: false,
    }));
    await supabase.from('event_checklists').insert(checklistPayload);
  }

  // 3. Pre-populate default Guest Groups
  const defaultGroups = [
    { event_id: eventId, name: 'Keluarga' },
    { event_id: eventId, name: 'Teman' },
    { event_id: eventId, name: 'Rekan Kerja' },
    { event_id: eventId, name: 'VIP' },
  ];
  await supabase.from('guest_groups').insert(defaultGroups);

  revalidatePath('/dashboard/events');
  redirect(`/dashboard/events/${eventId}/overview`);
}

export async function updateEventAction(eventId: string, prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const event_date = formData.get('event_date') as string;
  const event_time = formData.get('event_time') as string;
  const city = formData.get('city') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const estimated_budget = formData.get('estimated_budget') ? Number(formData.get('estimated_budget')) : 0;
  const estimated_guest_count = formData.get('estimated_guest_count') ? Number(formData.get('estimated_guest_count')) : 0;
  const status = (formData.get('status') as any) || 'planning';

  const validated = eventSchema.safeParse({
    name,
    category,
    event_date,
    event_time,
    city,
    location,
    description,
    estimated_budget,
    estimated_guest_count,
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Data tidak valid' };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('events')
    .update({
      name: validated.data.name,
      category: validated.data.category,
      event_date: validated.data.event_date,
      event_time: validated.data.event_time || null,
      city: validated.data.city,
      location: validated.data.location || null,
      description: validated.data.description || null,
      estimated_budget: validated.data.estimated_budget,
      estimated_guest_count: validated.data.estimated_guest_count,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}`);
  revalidatePath('/dashboard/events');
  return { success: 'Informasi acara berhasil diperbarui!' };
}

export async function deleteEventAction(eventId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('events').delete().eq('id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard/events');
  redirect('/dashboard/events');
}

export async function createSessionAction(eventId: string, prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const session_date = formData.get('session_date') as string;
  const start_time = formData.get('start_time') as string;
  const end_time = formData.get('end_time') as string;
  const location = formData.get('location') as string;
  const address = formData.get('address') as string;
  const maps_url = formData.get('maps_url') as string;

  if (!name || !start_time || !location) {
    return { error: 'Nama sesi, waktu mulai, dan lokasi wajib diisi' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('event_sessions').insert({
    event_id: eventId,
    name,
    session_date: session_date || null,
    start_time,
    end_time: end_time || null,
    location,
    address: address || null,
    maps_url: maps_url || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Sesi acara berhasil ditambahkan!' };
}

export async function deleteSessionAction(sessionId: string, eventId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('event_sessions').delete().eq('id', sessionId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Sesi acara berhasil dihapus' };
}
