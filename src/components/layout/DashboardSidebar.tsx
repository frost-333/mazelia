'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  Wallet,
  Users,
  Settings,
  Calendar,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils/formatters';
import { logoutAction } from '@/actions/auth-actions';
import { Event } from '@/types';

interface DashboardSidebarProps {
  currentEvent?: Event | null;
  events?: Event[];
  userEmail?: string | null;
  userName?: string | null;
}

export function DashboardSidebar({ currentEvent, events = [], userEmail, userName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const eventId = currentEvent?.id;

  const navigation = eventId
    ? [
        { name: 'Ringkasan Acara', href: `/dashboard/events/${eventId}/overview`, icon: LayoutDashboard },
        { name: 'Checklist & Timeline', href: `/dashboard/events/${eventId}/checklist`, icon: CheckSquare },
        { name: 'Budget Planner', href: `/dashboard/events/${eventId}/budget`, icon: Wallet },
        { name: 'Daftar Tamu & RSVP', href: `/dashboard/events/${eventId}/guests`, icon: Users },
        { name: 'Pengaturan Acara', href: `/dashboard/events/${eventId}/settings`, icon: Settings },
      ]
    : [
        { name: 'Daftar Acara Saya', href: '/dashboard/events', icon: Calendar },
      ];

  return (
    <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-white border-r border-mazelia-border z-30">
      {/* Brand Header */}
      <div className="h-20 flex flex-col justify-center px-6 border-b border-mazelia-border/60">
        <Link href="/dashboard/events" className="flex flex-col group">
          <span className="font-serif text-xl font-bold tracking-wider text-mazelia-charcoal group-hover:text-mazelia-gold transition-colors">
            MAZÉLIA
          </span>
          <span className="text-[9px] uppercase tracking-widest text-mazelia-taupe -mt-0.5 font-medium">
            Events • Moments • Memories
          </span>
        </Link>
      </div>

      {/* Event Context Switcher */}
      {currentEvent && (
        <div className="px-4 py-3 border-b border-mazelia-border/60 bg-mazelia-ivory/50 relative">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-mazelia-taupe block mb-1">
            Acara Aktif
          </label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg border border-mazelia-border bg-white text-xs font-semibold text-mazelia-charcoal hover:border-mazelia-gold transition-all shadow-sm"
          >
            <span className="truncate pr-2">{currentEvent.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-mazelia-taupe shrink-0" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full left-4 right-4 mt-1 bg-white rounded-xl shadow-luxury-lg border border-mazelia-border p-1.5 z-40 space-y-1 animate-in fade-in zoom-in-95 duration-150">
              <div className="max-h-48 overflow-y-auto space-y-0.5">
                {events.map((ev) => (
                  <Link
                    key={ev.id}
                    href={`/dashboard/events/${ev.id}/overview`}
                    onClick={() => setDropdownOpen(false)}
                    className={cn(
                      'block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors truncate',
                      ev.id === currentEvent.id
                        ? 'bg-mazelia-gold-50 text-mazelia-bronze font-semibold'
                        : 'text-mazelia-charcoal hover:bg-mazelia-ivory'
                    )}
                  >
                    {ev.name}
                  </Link>
                ))}
              </div>
              <div className="pt-1.5 border-t border-mazelia-border/60">
                <Link
                  href="/dashboard/events/new"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-mazelia-gold hover:bg-mazelia-gold-50 rounded-lg transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  + Buat Acara Baru
                </Link>
                <Link
                  href="/dashboard/events"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-mazelia-taupe hover:text-mazelia-charcoal hover:bg-mazelia-ivory rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Kelola Semua Acara
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all',
                isActive
                  ? 'bg-mazelia-gold text-white shadow-luxury-gold font-semibold'
                  : 'text-mazelia-charcoal hover:bg-mazelia-ivory hover:text-mazelia-gold-dark'
              )}
            >
              <item.icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-mazelia-taupe')} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-mazelia-border/60 bg-mazelia-ivory/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-mazelia-gold-100 border border-mazelia-gold/30 flex items-center justify-center text-mazelia-bronze font-bold text-xs shrink-0">
              {userName ? userName.charAt(0).toUpperCase() : 'M'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-mazelia-charcoal truncate">{userName || 'Pengguna Mazelia'}</p>
              <p className="text-[10px] text-mazelia-taupe truncate">{userEmail || ''}</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="p-1.5 text-mazelia-taupe hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
