import * as React from 'react';
import { cn } from '@/lib/utils/formatters';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'gold' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  const variants = {
    gold: 'bg-mazelia-gold-100 text-mazelia-bronze border-mazelia-gold/30',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-mazelia-ivory-warm text-mazelia-charcoal-muted border-mazelia-border',
    outline: 'bg-transparent text-mazelia-charcoal border-mazelia-border',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors select-none',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
