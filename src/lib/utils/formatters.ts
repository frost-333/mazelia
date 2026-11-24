import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number to Indonesian Rupiah (IDR)
 * Example: 10000000 -> "Rp10.000.000"
 */
export function formatRupiah(amount: number | bigint | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return 'Rp0';
  }
  const num = typeof amount === 'bigint' ? Number(amount) : amount;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num).replace(/\s+/g, '');
}

/**
 * Format date string to Indonesian formal date
 * Example: "2026-11-24" -> "24 November 2026"
 */
export function formatDateIndo(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return '-';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(date);
}

/**
 * Format time to Indonesian format
 * Example: "09:00:00" -> "09:00 WIB"
 */
export function formatTimeIndo(timeStr: string | null | undefined): string {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    return `${parts[0]}:${parts[1]} WIB`;
  }
  return `${timeStr} WIB`;
}

/**
 * Calculate countdown days until event date
 */
export function calculateDaysRemaining(targetDate: string | Date): {
  days: number;
  isPast: boolean;
  label: string;
} {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  
  // Set both dates to midnight Asia/Jakarta for accurate full day difference
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = targetMidnight.getTime() - nowMidnight.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { days: Math.abs(diffDays), isPast: true, label: `${Math.abs(diffDays)} hari yang lalu` };
  } else if (diffDays === 0) {
    return { days: 0, isPast: false, label: 'Hari Ini' };
  } else {
    return { days: diffDays, isPast: false, label: `${diffDays} hari lagi` };
  }
}
