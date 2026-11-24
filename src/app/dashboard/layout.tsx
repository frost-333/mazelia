import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Event } from '@/types';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If user is not authenticated, redirect to login
  if (!user) {
    redirect('/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch all events for the current user
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', user.id)
    .order('event_date', { ascending: true });

  const userEvents: Event[] = events || [];

  return (
    <div className="min-h-screen bg-mazelia-ivory flex">
      {/* Fixed Desktop Sidebar */}
      <DashboardSidebar
        events={userEvents}
        userEmail={user.email}
        userName={profile?.full_name || user.email?.split('@')[0]}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {userEvents.length > 0 && <MobileBottomNav eventId={userEvents[0]?.id} />}
    </div>
  );
}
