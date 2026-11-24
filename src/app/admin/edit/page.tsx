import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { EditInvitationForm } from '@/components/modules/admin/EditInvitationForm';

export const metadata = {
  title: 'Edit Data Undangan — MAZÉLIA Admin',
};

export default async function AdminEditPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin/edit');
  }

  // Fetch invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const targetInvitation = invitation || (
    await supabase.from('invitations').select('*').eq('slug', 'sarah-brian').single()
  ).data;

  if (!targetInvitation) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <EditInvitationForm invitation={targetInvitation} />
    </div>
  );
}
