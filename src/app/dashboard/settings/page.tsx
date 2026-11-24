import { createClient } from '@/lib/supabase/server';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { ProfileSettingsClient } from '@/components/modules/profile/ProfileSettingsClient';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id || '')
    .single();

  return (
    <div className="space-y-6 max-w-2xl">
      <DashboardHeader
        title="Pengaturan Profil"
        subtitle="Kelola informasi akun dan preferensi kontak Anda."
      />

      <ProfileSettingsClient profile={profile} email={user?.email || ''} />
    </div>
  );
}
