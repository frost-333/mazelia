import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AddSessionModal } from '@/components/modules/events/AddSessionModal';
import {
  Calendar,
  Clock,
  MapPin,
  CheckSquare,
  Wallet,
  Users,
  ArrowRight,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import {
  formatDateIndo,
  formatRupiah,
  formatTimeIndo,
  calculateDaysRemaining,
} from '@/lib/utils/formatters';
import { deleteSessionAction } from '@/actions/event-actions';

export default async function EventOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;
  const supabase = await createClient();

  // 1. Fetch Event
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();

  if (!event) {
    notFound();
  }

  // 2. Fetch Sessions
  const { data: sessions } = await supabase
    .from('event_sessions')
    .select('*')
    .eq('event_id', eventId)
    .order('start_time', { ascending: true });

  // 3. Fetch Checklists metrics
  const { data: checklists } = await supabase
    .from('event_checklists')
    .select('*')
    .eq('event_id', eventId);

  const totalTasks = checklists?.length || 0;
  const completedTasks = checklists?.filter((c) => c.is_completed).length || 0;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const upcomingTasks = checklists?.filter((c) => !c.is_completed).slice(0, 5) || [];

  // 4. Fetch Budget metrics
  const { data: budgets } = await supabase
    .from('event_budgets')
    .select('*')
    .eq('event_id', eventId);

  const totalActualBudget = budgets?.reduce((acc, b) => acc + (b.actual_cost || 0), 0) || 0;
  const totalDownPayment = budgets?.reduce((acc, b) => acc + (b.down_payment || 0), 0) || 0;
  const remainingBudget = (event.estimated_budget || 0) - totalActualBudget;

  // 5. Fetch Guest metrics
  const { data: guests } = await supabase
    .from('guests')
    .select('*')
    .eq('event_id', eventId);

  const totalGuests = guests?.length || 0;
  const totalPax = guests?.reduce((acc, g) => acc + (g.pax || 1), 0) || 0;
  const attendingPax = guests
    ?.filter((g) => g.rsvp_status === 'attending')
    .reduce((acc, g) => acc + (g.pax || 1), 0) || 0;

  const countdown = calculateDaysRemaining(event.event_date);

  return (
    <div className="space-y-8">
      {/* HEADER COUNTDOWN BANNER */}
      <div className="rounded-2xl border border-mazelia-border bg-white p-6 sm:p-8 shadow-luxury relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="gold">{event.category}</Badge>
              <span className="text-xs text-mazelia-taupe flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-mazelia-gold" /> {event.city}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-mazelia-charcoal">
              {event.name}
            </h1>
            <p className="text-xs sm:text-sm text-mazelia-taupe">
              {formatDateIndo(event.event_date)} {event.event_time ? `• ${formatTimeIndo(event.event_time)}` : ''}
              {event.location ? ` • ${event.location}` : ''}
            </p>
          </div>

          {/* Countdown Clock Widget */}
          <div className="rounded-xl border border-mazelia-gold/30 bg-mazelia-gold-50 p-4 sm:p-5 text-center min-w-[200px] shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-mazelia-bronze block mb-1">
              Menuju Hari Bahagia
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-mazelia-charcoal">
              {countdown.days} <span className="text-base font-normal text-mazelia-taupe">Hari</span>
            </div>
            <span className="text-[11px] text-mazelia-taupe font-medium mt-0.5 block">
              {countdown.label}
            </span>
          </div>
        </div>
      </div>

      {/* 4 CORE STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Checklist */}
        <Link href={`/dashboard/events/${eventId}/checklist`}>
          <Card className="hover:border-mazelia-gold hover:shadow-luxury-lg transition-all h-full">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-mazelia-taupe uppercase tracking-wider">
                  Progres Tugas
                </span>
                <CheckSquare className="w-4 h-4 text-mazelia-gold" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-2xl font-bold text-mazelia-charcoal">
                  {progressPercent}%
                </span>
                <span className="text-xs text-mazelia-taupe">
                  {completedTasks} / {totalTasks} selesai
                </span>
              </div>
              <div className="w-full h-1.5 bg-mazelia-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-mazelia-gold rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Card 2: Budget Spent */}
        <Link href={`/dashboard/events/${eventId}/budget`}>
          <Card className="hover:border-mazelia-gold hover:shadow-luxury-lg transition-all h-full">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-mazelia-taupe uppercase tracking-wider">
                  Biaya Riil Terdata
                </span>
                <Wallet className="w-4 h-4 text-mazelia-gold" />
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-mazelia-charcoal truncate">
                {formatRupiah(totalActualBudget)}
              </div>
              <p className="text-xs text-mazelia-taupe truncate">
                Dari target: {formatRupiah(event.estimated_budget)}
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Card 3: Budget Balance */}
        <Link href={`/dashboard/events/${eventId}/budget`}>
          <Card className="hover:border-mazelia-gold hover:shadow-luxury-lg transition-all h-full">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-mazelia-taupe uppercase tracking-wider">
                  Sisa Anggaran
                </span>
                <Badge variant={remainingBudget >= 0 ? 'success' : 'danger'}>
                  {remainingBudget >= 0 ? 'Aman' : 'Defisit'}
                </Badge>
              </div>
              <div className={`font-serif text-xl sm:text-2xl font-bold truncate ${remainingBudget >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                {formatRupiah(remainingBudget)}
              </div>
              <p className="text-xs text-mazelia-taupe">
                Uang Muka: {formatRupiah(totalDownPayment)}
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Card 4: Guests & Pax */}
        <Link href={`/dashboard/events/${eventId}/guests`}>
          <Card className="hover:border-mazelia-gold hover:shadow-luxury-lg transition-all h-full">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-mazelia-taupe uppercase tracking-wider">
                  Tamu & Pax
                </span>
                <Users className="w-4 h-4 text-mazelia-gold" />
              </div>
              <div className="font-serif text-2xl font-bold text-mazelia-charcoal">
                {totalPax} <span className="text-xs font-normal text-mazelia-taupe">Pax</span>
              </div>
              <p className="text-xs text-mazelia-taupe">
                {attendingPax} Terkonfirmasi Hadir
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* SESSIONS & SCHEDULE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-mazelia-charcoal">
                Jadwal & Sesi Acara
              </h3>
              <p className="text-xs text-mazelia-taupe">
                Rangkaian sesi seperti Akad Nikah, Pemberkatan, dan Resepsi.
              </p>
            </div>
            <AddSessionModal eventId={eventId} />
          </div>

          {sessions && sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((ses) => (
                <div
                  key={ses.id}
                  className="rounded-xl border border-mazelia-border bg-white p-4 shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-mazelia-charcoal">
                        {ses.name}
                      </span>
                      <span className="text-xs font-semibold text-mazelia-bronze bg-mazelia-gold-100 px-2 py-0.5 rounded-md">
                        {formatTimeIndo(ses.start_time)} {ses.end_time ? `- ${formatTimeIndo(ses.end_time)}` : ''}
                      </span>
                    </div>
                    <p className="text-xs text-mazelia-charcoal-light flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-mazelia-taupe shrink-0" />
                      <span>{ses.location}</span>
                      {ses.address && <span className="text-mazelia-taupe">({ses.address})</span>}
                    </p>
                    {ses.maps_url && (
                      <a
                        href={ses.maps_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-mazelia-gold hover:underline pt-0.5"
                      >
                        <ExternalLink className="w-3 h-3" /> Buka Google Maps
                      </a>
                    )}
                  </div>

                  <form
                    action={async () => {
                      'use server';
                      await deleteSessionAction(ses.id, eventId);
                    }}
                  >
                    <button
                      type="submit"
                      className="p-1.5 text-mazelia-taupe hover:text-red-600 rounded-lg transition-colors"
                      title="Hapus Sesi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-mazelia-border bg-white p-8 text-center space-y-2">
              <Clock className="w-8 h-8 text-mazelia-taupe/60 mx-auto" />
              <p className="text-xs text-mazelia-taupe">
                Belum ada rincian sesi acara (seperti Akad / Resepsi). Klik tombol &apos;Tambah Sesi&apos; di atas.
              </p>
            </div>
          )}
        </div>

        {/* UPCOMING TASKS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-mazelia-charcoal">
              Tugas Mendatang
            </h3>
            <Link
              href={`/dashboard/events/${eventId}/checklist`}
              className="text-xs text-mazelia-gold hover:underline font-semibold"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="rounded-xl border border-mazelia-border bg-white p-4 shadow-sm space-y-3">
            {upcomingTasks.length > 0 ? (
              <ul className="divide-y divide-mazelia-border/60">
                {upcomingTasks.map((t) => (
                  <li key={t.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-mazelia-gold mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-mazelia-charcoal truncate">
                        {t.title}
                      </p>
                      <span className="text-[10px] text-mazelia-taupe">
                        {t.category} • Prioritas {t.priority}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-mazelia-taupe text-center py-4">
                Semua tugas pada daftar telah selesai!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
