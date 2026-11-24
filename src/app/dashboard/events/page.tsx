import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Plus, Calendar, MapPin, Wallet, Users, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { formatDateIndo, formatRupiah, calculateDaysRemaining } from '@/lib/utils/formatters';

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', user?.id || '')
    .order('event_date', { ascending: true });

  const eventList = events || [];

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Daftar Acara Saya"
        subtitle="Kelola seluruh rencana acara keluarga dan personal Anda dalam satu tempat."
        actionButton={
          <Link href="/dashboard/events/new">
            <Button size="md" className="shadow-luxury-gold gap-2">
              <Plus className="w-4 h-4" />
              Buat Acara Baru
            </Button>
          </Link>
        }
      />

      {eventList.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border-2 border-dashed border-mazelia-border bg-white p-12 text-center max-w-xl mx-auto my-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-mazelia-gold-100 border border-mazelia-gold/30 mx-auto flex items-center justify-center text-mazelia-bronze shadow-sm">
            <Calendar className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-mazelia-charcoal">
              Belum Ada Acara yang Terdaftar
            </h3>
            <p className="text-xs sm:text-sm text-mazelia-taupe max-w-sm mx-auto">
              Mulai langkah awal perencanaan Anda sekarang. MAZÉLIA akan menyiapkan checklist dan kalkulator anggaran otomatis untuk Anda.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/dashboard/events/new">
              <Button size="lg" className="shadow-luxury-gold gap-2">
                <Sparkles className="w-4 h-4" />
                Buat Acara Pertama Saya
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Grid of Event Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventList.map((ev) => {
            const countdown = calculateDaysRemaining(ev.event_date);
            return (
              <Card key={ev.id} className="hover:shadow-luxury-lg hover:border-mazelia-gold/60 transition-all flex flex-col justify-between group">
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="gold">{ev.category}</Badge>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${countdown.isPast ? 'bg-gray-100 text-gray-600' : 'bg-amber-50 text-amber-800'}`}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {countdown.label}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-mazelia-gold-dark transition-colors line-clamp-1">
                      {ev.name}
                    </CardTitle>
                    {ev.description && (
                      <CardDescription className="line-clamp-2 mt-1">
                        {ev.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="py-3 space-y-2 text-xs text-mazelia-charcoal-light">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-mazelia-taupe shrink-0" />
                      <span>{formatDateIndo(ev.event_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-mazelia-taupe shrink-0" />
                      <span className="truncate">{ev.city}{ev.location ? ` • ${ev.location}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-mazelia-taupe shrink-0" />
                      <span>Target: {formatRupiah(ev.estimated_budget)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-mazelia-taupe shrink-0" />
                      <span>Estimasi: {ev.estimated_guest_count} Tamu</span>
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-3 pb-4">
                  <Link href={`/dashboard/events/${ev.id}/overview`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full justify-between group-hover:bg-mazelia-gold group-hover:text-white group-hover:border-mazelia-gold transition-all">
                      <span>Buka Workspace Acara</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
