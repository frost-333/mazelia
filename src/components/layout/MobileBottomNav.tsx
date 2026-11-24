'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, Wallet, Users } from 'lucide-react';
import { cn } from '@/lib/utils/formatters';

interface MobileBottomNavProps {
  eventId?: string;
}

export function MobileBottomNav({ eventId }: MobileBottomNavProps) {
  const pathname = usePathname();

  if (!eventId) return null;

  const items = [
    { name: 'Overview', href: `/dashboard/events/${eventId}/overview`, icon: LayoutDashboard },
    { name: 'Checklist', href: `/dashboard/events/${eventId}/checklist`, icon: CheckSquare },
    { name: 'Budget', href: `/dashboard/events/${eventId}/budget`, icon: Wallet },
    { name: 'Tamu', href: `/dashboard/events/${eventId}/guests`, icon: Users },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-mazelia-border shadow-luxury">
      <nav className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-medium transition-colors',
                isActive ? 'text-mazelia-gold font-bold' : 'text-mazelia-taupe hover:text-mazelia-charcoal'
              )}
            >
              <item.icon className={cn('w-5 h-5 mb-0.5', isActive ? 'text-mazelia-gold stroke-[2.3]' : 'text-mazelia-taupe')} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
