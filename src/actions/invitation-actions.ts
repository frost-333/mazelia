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
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: 'Terima kasih, ucapan dan konfirmasi kehadiran Anda telah tersimpan.' };
  } catch (err: any) {
    return { error: err?.message || 'Terjadi kesalahan sistem.' };
  }
}

export async function updateInvitationAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Sesi login telah berakhir. Silakan login kembali.' };
    }

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const groomName = formData.get('groom_name') as string;
    const groomNickname = formData.get('groom_nickname') as string;
    const groomParents = formData.get('groom_parents') as string;
    const brideName = formData.get('bride_name') as string;
    const brideNickname = formData.get('bride_nickname') as string;
    const brideParents = formData.get('bride_parents') as string;
    
    const ceremonyTitle = formData.get('ceremony_title') as string;
    const ceremonyDate = formData.get('ceremony_date') as string;
    const ceremonyStartTime = formData.get('ceremony_start_time') as string;
    const ceremonyEndTime = formData.get('ceremony_end_time') as string;
    const ceremonyLocation = formData.get('ceremony_location') as string;
    const ceremonyAddress = formData.get('ceremony_address') as string;
    const ceremonyMapsUrl = formData.get('ceremony_maps_url') as string;

    const receptionTitle = formData.get('reception_title') as string;
    const receptionDate = formData.get('reception_date') as string;
    const receptionStartTime = formData.get('reception_start_time') as string;
    const receptionEndTime = formData.get('reception_end_time') as string;
    const receptionLocation = formData.get('reception_location') as string;
    const receptionAddress = formData.get('reception_address') as string;
    const receptionMapsUrl = formData.get('reception_maps_url') as string;

    const bankName1 = formData.get('bank_name_1') as string;
    const bankAccount1 = formData.get('bank_account_1') as string;
    const bankHolder1 = formData.get('bank_holder_1') as string;

    const { error } = await supabase
      .from('invitations')
      .update({
        title,
        groom_name: groomName,
        groom_nickname: groomNickname,
        groom_parents: groomParents,
        bride_name: brideName,
        bride_nickname: brideNickname,
        bride_parents: brideParents,
        ceremony_title: ceremonyTitle,
        ceremony_date: ceremonyDate,
        ceremony_start_time: ceremonyStartTime,
        ceremony_end_time: ceremonyEndTime,
        ceremony_location: ceremonyLocation,
        ceremony_address: ceremonyAddress,
        ceremony_maps_url: ceremonyMapsUrl,
        reception_title: receptionTitle,
        reception_date: receptionDate,
        reception_start_time: receptionStartTime,
        reception_end_time: receptionEndTime,
        reception_location: receptionLocation,
        reception_address: receptionAddress,
        reception_maps_url: receptionMapsUrl,
        bank_name_1: bankName1,
        bank_account_1: bankAccount1,
        bank_holder_1: bankHolder1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      return { error: 'Gagal memperbarui data: ' + error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/edit');
    return { success: 'Data undangan dan acara berhasil diperbarui!' };
  } catch (err: any) {
    return { error: err?.message || 'Terjadi kesalahan sistem.' };
  }
}
