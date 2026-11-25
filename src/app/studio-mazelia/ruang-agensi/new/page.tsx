import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CreateInvitationForm } from '@/components/modules/admin/CreateInvitationForm';

export const metadata = {
  title: 'Tambah Undangan Klien — MAZÉLIA Admin',
};

export default async function AdminNewInvitationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/studio-mazelia/portal-masuk');
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <CreateInvitationForm />
    </div>
  );
}
