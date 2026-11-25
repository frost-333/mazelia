'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { DEFAULT_INVITATION } from '@/lib/constants/default-invitation';

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
    const slug = formData.get('slug') as string;
    const groomName = formData.get('groom_name') as string;
    const groomNickname = formData.get('groom_nickname') as string;
    const groomParents = formData.get('groom_parents') as string;
    const groomInstagram = formData.get('groom_instagram') as string;
    const brideName = formData.get('bride_name') as string;
    const brideNickname = formData.get('bride_nickname') as string;
    const brideParents = formData.get('bride_parents') as string;
    const brideInstagram = formData.get('bride_instagram') as string;
    const quoteText = formData.get('quote_text') as string;
    const quoteSource = formData.get('quote_source') as string;
    
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

    const bankName2 = formData.get('bank_name_2') as string;
    const bankAccount2 = formData.get('bank_account_2') as string;
    const bankHolder2 = formData.get('bank_holder_2') as string;

    const coverImageUrl = formData.get('cover_image_url') as string;
    const musicUrl = formData.get('music_url') as string;
    const status = (formData.get('status') as string) || 'active';
    const theme = (formData.get('theme') as string) || 'champagne_gold';
    const clientPhone = formData.get('client_phone') as string;
    const clientNotes = formData.get('client_notes') as string;

    const galleryUrls: string[] = [];
    for (let i = 1; i <= 6; i++) {
      const gUrl = (formData.get(`gallery_${i}`) as string)?.trim();
      if (gUrl) galleryUrls.push(gUrl);
    }

    const loveStory = [];
    for (let i = 1; i <= 4; i++) {
      const yr = (formData.get(`story_year_${i}`) as string)?.trim();
      const ttl = (formData.get(`story_title_${i}`) as string)?.trim();
      const dsc = (formData.get(`story_desc_${i}`) as string)?.trim();
      if (yr || ttl || dsc) {
        loveStory.push({ year: yr || '', title: ttl || '', description: dsc || '' });
      }
    }

    const updatePayload: Record<string, any> = {
      title,
      theme,
      groom_name: groomName,
      groom_nickname: groomNickname,
      groom_parents: groomParents,
      groom_instagram: groomInstagram || null,
      bride_name: brideName,
      bride_nickname: brideNickname,
      bride_parents: brideParents,
      bride_instagram: brideInstagram || null,
      quote_text: quoteText || null,
      quote_source: quoteSource || null,
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
      bank_name_1: bankName1 || null,
      bank_account_1: bankAccount1 || null,
      bank_holder_1: bankHolder1 || null,
      bank_name_2: bankName2 || null,
      bank_account_2: bankAccount2 || null,
      bank_holder_2: bankHolder2 || null,
      cover_image_url: coverImageUrl || null,
      music_url: musicUrl || null,
      updated_at: new Date().toISOString(),
    };

    // Sertakan kolom baru (agency/multi-client) secara kondisional
    if (status) updatePayload.status = status;
    if (clientPhone) updatePayload.client_phone = clientPhone;
    if (clientNotes) updatePayload.client_notes = clientNotes;
    if (galleryUrls.length > 0) {
      updatePayload.gallery_urls = galleryUrls;
      updatePayload.gallery_images = galleryUrls;
    }
    if (loveStory.length > 0) {
      updatePayload.love_story = loveStory;
    }

    if (slug) {
      updatePayload.slug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    }

    const { data: existing } = await supabase
      .from('invitations')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    let error;
    if (existing?.id) {
      let res = await supabase
        .from('invitations')
        .update(updatePayload)
        .eq('id', existing.id);

      // Jika gagal karena kolom baru (status, client_notes, client_phone, dll) belum di-migrate di Supabase:
      if (res.error && res.error.message.includes('Could not find the') && res.error.message.includes('column')) {
        const safePayload = { ...updatePayload };
        delete safePayload.status;
        delete safePayload.client_notes;
        delete safePayload.client_phone;
        delete safePayload.gallery_urls;
        delete safePayload.love_story;

        res = await supabase
          .from('invitations')
          .update(safePayload)
          .eq('id', existing.id);
      }

      error = res.error;
    } else {
      let res = await supabase
        .from('invitations')
        .insert({
          ...updatePayload,
          user_id: user.id,
          theme: theme || 'champagne_gold',
        });

      if (res.error && res.error.message.includes('Could not find the') && res.error.message.includes('column')) {
        const safePayload = { ...updatePayload };
        delete safePayload.status;
        delete safePayload.client_notes;
        delete safePayload.client_phone;
        delete safePayload.gallery_urls;
        delete safePayload.love_story;

        res = await supabase
          .from('invitations')
          .insert({
            ...safePayload,
            user_id: user.id,
            theme: theme || 'champagne_gold',
          });
      }

      error = res.error;
    }

    if (error) {
      return { error: 'Gagal memperbarui data: ' + error.message };
    }

    revalidatePath('/');
    if (slug) {
      revalidatePath(`/${slug}`);
      revalidatePath(`/i/${slug}`);
    }
    revalidatePath('/admin');
    revalidatePath(`/admin/invitations/${id}`);
    revalidatePath(`/admin/invitations/${id}/edit`);
    revalidatePath('/admin/edit');
    return { success: 'Data undangan dan acara berhasil diperbarui!' };
  } catch (err: any) {
    return { error: err?.message || 'Terjadi kesalahan sistem.' };
  }
}

export async function deleteWishAction(wishId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Sesi login telah berakhir. Silakan login kembali.' };
    }

    const { error } = await supabase
      .from('invitation_wishes')
      .delete()
      .eq('id', wishId);

    if (error) {
      return { error: 'Gagal menghapus ucapan: ' + error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: 'Ucapan berhasil dihapus.' };
  } catch (err: any) {
    return { error: err?.message || 'Terjadi kesalahan sistem.' };
  }
}

export async function createInvitationAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Sesi login telah berakhir. Silakan login kembali.' };
    }

    const groomName = (formData.get('groom_name') as string)?.trim();
    const groomNickname = (formData.get('groom_nickname') as string)?.trim();
    const brideName = (formData.get('bride_name') as string)?.trim();
    const brideNickname = (formData.get('bride_nickname') as string)?.trim();
    let slug = (formData.get('slug') as string)?.trim()?.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const title = (formData.get('title') as string)?.trim() || `The Wedding of ${groomNickname || 'Groom'} & ${brideNickname || 'Bride'}`;
    const ceremonyDate = formData.get('ceremony_date') as string || '2027-01-08';
    const ceremonyLocation = (formData.get('ceremony_location') as string)?.trim() || 'Jakarta';
    const theme = (formData.get('theme') as string) || 'champagne_gold';
    const musicUrl = (formData.get('music_url') as string)?.trim() || 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-harp-and-strings-1033.mp3';

    if (!groomName || !groomNickname || !brideName || !brideNickname) {
      return { error: 'Nama kedua mempelai wajib diisi lengkap.' };
    }

    if (!slug) {
      slug = `${groomNickname.toLowerCase()}-${brideNickname.toLowerCase()}`.replace(/[^a-z0-9-]/g, '-');
    }

    // Check if slug already exists
    const { data: existingSlug } = await supabase
      .from('invitations')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existingSlug) {
      slug = `${slug}-${Math.floor(100 + Math.random() * 900)}`;
    }

    const newRecord = {
      user_id: user.id,
      slug,
      title,
      theme,
      groom_name: groomName,
      groom_nickname: groomNickname,
      groom_parents: `Putra dari Bpk. & Ibu`,
      bride_name: brideName,
      bride_nickname: brideNickname,
      bride_parents: `Putri dari Bpk. & Ibu`,
      quote_text: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
      quote_source: 'QS. Ar-Rum: 21',
      ceremony_title: 'Akad Nikah / Pemberkatan',
      ceremony_date: ceremonyDate,
      ceremony_start_time: '08:00',
      ceremony_end_time: '10:30',
      ceremony_location: ceremonyLocation,
      ceremony_address: `${ceremonyLocation}, Indonesia`,
      reception_title: 'Resepsi Pernikahan',
      reception_date: ceremonyDate,
      reception_start_time: '11:30',
      reception_end_time: '14:30',
      reception_location: ceremonyLocation,
      reception_address: `${ceremonyLocation}, Indonesia`,
      bank_name_1: 'BCA',
      bank_account_1: '1234567890',
      bank_holder_1: groomName,
      cover_image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      music_url: musicUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: created, error } = await supabase
      .from('invitations')
      .insert(newRecord)
      .select('id, slug')
      .single();

    if (error) {
      return { error: 'Gagal membuat undangan: ' + error.message };
    }

    revalidatePath('/admin');
    revalidatePath(`/${slug}`);
    return { success: true, invitationId: created.id, slug: created.slug };
  } catch (err: any) {
    return { error: err?.message || 'Terjadi kesalahan sistem.' };
  }
}

export async function deleteInvitationAction(invitationId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Sesi login telah berakhir.' };
    }

    // Delete wishes first
    await supabase.from('invitation_wishes').delete().eq('invitation_id', invitationId);

    // Delete invitation
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', invitationId)
      .eq('user_id', user.id);

    if (error) {
      return { error: 'Gagal menghapus acara klien: ' + error.message };
    }

    revalidatePath('/admin');
    return { success: 'Acara klien berhasil dihapus.' };
  } catch (err: any) {
    return { error: err?.message || 'Terjadi kesalahan sistem.' };
  }
}

export async function duplicateInvitationAction(invitationId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Sesi login telah berakhir.' };
    }

    // Fetch source invitation
    let source: any = null;
    const { data: inv } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', invitationId)
      .maybeSingle();

    if (inv) {
      source = inv;
    } else if (invitationId === DEFAULT_INVITATION.id || invitationId === 'demo') {
      source = DEFAULT_INVITATION;
    }

    if (!source) {
      return { error: 'Undangan sumber tidak ditemukan untuk diduplikasi.' };
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newSlug = `${source.slug || 'acara'}-copy-${randomSuffix}`;
    const newTitle = `${source.title || 'Undangan'} (Salinan)`;

    const newRecord: Record<string, any> = {
      ...source,
      user_id: user.id,
      title: newTitle,
      slug: newSlug,
      status: 'draft',
      client_notes: `Diduplikasi dari template: ${source.title}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    delete newRecord.id;

    let { data: created, error } = await supabase
      .from('invitations')
      .insert(newRecord)
      .select('id, slug, title')
      .single();

    if (error && error.message.includes('Could not find the') && error.message.includes('column')) {
      delete newRecord.status;
      delete newRecord.client_notes;
      delete newRecord.client_phone;
      delete newRecord.gallery_urls;
      delete newRecord.love_story;

      const res = await supabase
        .from('invitations')
        .insert(newRecord)
        .select('id, slug, title')
        .single();
      created = res.data;
      error = res.error;
    }

    if (error || !created) {
      return { error: 'Gagal menduplikasi undangan: ' + (error?.message || 'Data tidak tersimpan.') };
    }

    revalidatePath('/admin');
    return { success: true, newInvitationId: created.id, newSlug: created.slug };
  } catch (err: any) {
    return { error: err?.message || 'Terjadi kesalahan sistem.' };
  }
}
