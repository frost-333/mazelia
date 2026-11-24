'use client';

import Link from 'next/link';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, actionButton }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-mazelia-border/60 gap-4">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-mazelia-charcoal tracking-tight">
          {title || 'Dashboard'}
        </h1>
        {subtitle && <p className="text-xs sm:text-sm text-mazelia-taupe mt-1">{subtitle}</p>}
      </div>
      {actionButton && <div className="flex items-center gap-2.5 shrink-0">{actionButton}</div>}
    </div>
  );
}
