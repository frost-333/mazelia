import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { EditInvitationForm } from '@/components/modules/admin/EditInvitationForm';
import { DEFAULT_INVITATION } from '@/lib/constants/default-invitation';

interface EditClientPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Edit Data Undangan Klien — MAZÉLIA Admin',
};

export default async function EditClientPage({ params }: EditClientPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/admin/invitations/${id}/edit`);
  }

  // Fetch invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .single();

  const targetInvitation =
    invitation ||
    (id === DEFAULT_INVITATION.id || id === 'demo' ? DEFAULT_INVITATION : null);

  if (!targetInvitation) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <EditInvitationForm invitation={targetInvitation} />
    </div>
  );
}
