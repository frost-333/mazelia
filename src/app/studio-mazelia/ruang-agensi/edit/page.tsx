import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { EditInvitationForm } from '@/components/modules/admin/EditInvitationForm';
import { DEFAULT_INVITATION } from '@/lib/constants/default-invitation';

export const metadata = {
  title: 'Edit Data Undangan — MAZÉLIA Admin',
};

export default async function AdminEditPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/studio-mazelia/portal-masuk?redirect=/studio-mazelia/ruang-agensi/edit');
  }

  // Fetch latest invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const targetInvitation = invitation || DEFAULT_INVITATION;

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <EditInvitationForm invitation={targetInvitation} />
    </div>
  );
}
