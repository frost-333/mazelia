'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { loginSchema, registerSchema, profileSchema } from '@/lib/validations/auth';
import { revalidatePath } from 'next/cache';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectTo = (formData.get('redirect') as string) || '/studio-mazelia/ruang-agensi';

  const validated = loginSchema.safeParse({ email, password });
  if (!validated.success) {
    return {
      error: validated.error.errors[0]?.message || 'Data login tidak valid',
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Email atau kata sandi tidak cocok. Silakan periksa kembali.' };
    }
    return { error: error.message };
  }

  redirect(redirectTo);
}

export async function registerAction(prevState: any, formData: FormData) {
  const full_name = formData.get('full_name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validated = registerSchema.safeParse({
    full_name,
    email,
    password,
    confirmPassword,
  });

  if (!validated.success) {
    return {
      error: validated.error.errors[0]?.message || 'Data pendaftaran tidak valid',
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      data: {
        full_name: validated.data.full_name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If session is established directly
  if (data.session) {
    redirect('/dashboard/events');
  }

  return {
    success: 'Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi atau silakan masuk.',
  };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/studio-mazelia/portal-masuk');
}

export async function updateProfileAction(prevState: any, formData: FormData) {
  const full_name = formData.get('full_name') as string;
  const phone = formData.get('phone') as string;

  const validated = profileSchema.safeParse({ full_name, phone });
  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Data tidak valid' };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Anda harus masuk terlebih dahulu' };
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: validated.data.full_name,
      phone: validated.data.phone || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard/settings');
  return { success: 'Profil berhasil diperbarui!' };
}
