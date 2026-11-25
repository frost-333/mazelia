'use client';

import * as React from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2, LogOut } from 'lucide-react';
import { logoutAction } from '@/actions/auth-actions';

interface LogoutButtonProps {
  variant?: 'text' | 'icon';
  className?: string;
}

function LogoutSubmitButton({ variant = 'text', className = '' }: LogoutButtonProps) {
  const { pending } = useFormStatus();

  if (variant === 'icon') {
    return (
      <button
        type="submit"
        disabled={pending}
        className={`p-2 rounded-lg text-mazelia-taupe hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-wait ${className}`}
        title={pending ? 'Sedang keluar...' : 'Keluar'}
        aria-label="Keluar"
      >
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin text-red-600" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center gap-1.5 text-xs text-[#9B9185] hover:text-red-600 font-medium px-2.5 py-1.5 rounded-lg hover:bg-red-50/70 transition-all disabled:opacity-60 disabled:cursor-wait ${className}`}
    >
      {pending ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
          <span className="text-red-600">Keluar...</span>
        </>
      ) : (
        <span>Keluar</span>
      )}
    </button>
  );
}

export function LogoutButton({ variant = 'text', className = '' }: LogoutButtonProps) {
  return (
    <form action={logoutAction}>
      <LogoutSubmitButton variant={variant} className={className} />
    </form>
  );
}
