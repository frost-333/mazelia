'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitWishAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    
    const invitationId = formData.get('invitation_id') as string;
    const slug = formData.get('slug') as string;
    const senderName = formData.get('sender_name') as string;
    const relationship = formData.get('relationship') as string || null;
    const attendance = (formData.get('attendance') as string) || 'attending';
    const paxCount = parseInt(formData.get('pax_count') as string || '1', 10);
    const message = formData.get('message') as string;

    if (!invitationId || !senderName || !message) {
      return { error: 'Nama dan ucapan doa wajib diisi.' };
    }

    const { error } = await supabase.from('invitation_wishes').insert({
      invitation_id: invitationId,
      sender_name: senderName,
      relationship: relationship,
      attendance: attendance,
      pax_count: paxCount,
      message: message,
    });

    if (error) {
      return { error: 'Gagal mengirim ucapan: ' + error.message };
    }

    revalidatePath(`/i/${slug}`);
    return { success: 'Terima kasih, ucapan dan konfirmasi kehadiran Anda telah tersimpan.' };
  } catch (err: any) {
    return { error: err?.message || 'Terjadi kesalahan sistem.' };
  }
}
