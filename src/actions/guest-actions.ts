'use server';

import { createClient } from '@/lib/supabase/server';
import { guestSchema } from '@/lib/validations/guest';
import { revalidatePath } from 'next/cache';

export async function createGuestAction(eventId: string, prevState: any, formData: FormData) {
  const full_name = formData.get('full_name') as string;
  const group_id = (formData.get('group_id') as string) || null;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const pax = formData.get('pax') ? Number(formData.get('pax')) : 1;
  const rsvp_status = (formData.get('rsvp_status') as any) || 'pending';
  const attendance_status = (formData.get('attendance_status') as any) || 'unconfirmed';
  const notes = formData.get('notes') as string;

  const validated = guestSchema.safeParse({
    full_name,
    group_id,
    phone,
    address,
    pax,
    rsvp_status,
    attendance_status,
    notes,
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Data tamu tidak valid' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('guests').insert({
    event_id: eventId,
    group_id: validated.data.group_id || null,
    full_name: validated.data.full_name,
    phone: validated.data.phone || null,
    address: validated.data.address || null,
    pax: validated.data.pax,
    rsvp_status: validated.data.rsvp_status,
    attendance_status: validated.data.attendance_status,
    notes: validated.data.notes || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/guests`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Tamu undangan berhasil ditambahkan!' };
}

export async function updateGuestAction(id: string, eventId: string, prevState: any, formData: FormData) {
  const full_name = formData.get('full_name') as string;
  const group_id = (formData.get('group_id') as string) || null;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const pax = formData.get('pax') ? Number(formData.get('pax')) : 1;
  const rsvp_status = (formData.get('rsvp_status') as any) || 'pending';
  const attendance_status = (formData.get('attendance_status') as any) || 'unconfirmed';
  const notes = formData.get('notes') as string;

  const validated = guestSchema.safeParse({
    full_name,
    group_id,
    phone,
    address,
    pax,
    rsvp_status,
    attendance_status,
    notes,
  });

  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Data tamu tidak valid' };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('guests')
    .update({
      group_id: validated.data.group_id || null,
      full_name: validated.data.full_name,
      phone: validated.data.phone || null,
      address: validated.data.address || null,
      pax: validated.data.pax,
      rsvp_status: validated.data.rsvp_status,
      attendance_status: validated.data.attendance_status,
      notes: validated.data.notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('event_id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/guests`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Data tamu berhasil diperbarui!' };
}

export async function updateGuestRsvpAction(id: string, eventId: string, newRsvpStatus: 'pending' | 'attending' | 'not_attending') {
  const supabase = await createClient();
  const { error } = await supabase
    .from('guests')
    .update({
      rsvp_status: newRsvpStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('event_id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/guests`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: true };
}

export async function deleteGuestAction(id: string, eventId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('guests')
    .delete()
    .eq('id', id)
    .eq('event_id', eventId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/guests`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);
  return { success: 'Tamu berhasil dihapus' };
}

export async function createGuestGroupAction(eventId: string, name: string) {
  if (!name.trim()) {
    return { error: 'Nama kelompok tamu wajib diisi' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('guest_groups').insert({
    event_id: eventId,
    name: name.trim(),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/guests`);
  return { success: 'Kelompok tamu berhasil dibuat' };
}
