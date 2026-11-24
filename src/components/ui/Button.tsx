import * as React from 'react';
import { cn } from '@/lib/utils/formatters';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';
    
    const variants = {
      primary: 'bg-mazelia-gold hover:bg-mazelia-gold-dark text-white focus:ring-mazelia-gold shadow-sm hover:shadow-luxury-gold active:scale-[0.98]',
      secondary: 'bg-mazelia-gold-100 hover:bg-mazelia-gold-200 text-mazelia-bronze focus:ring-mazelia-gold',
      outline: 'bg-transparent border border-mazelia-border hover:border-mazelia-gold text-mazelia-charcoal hover:text-mazelia-gold-dark hover:bg-mazelia-gold-50 focus:ring-mazelia-gold',
      ghost: 'bg-transparent hover:bg-mazelia-ivory-warm text-mazelia-charcoal focus:ring-mazelia-gold',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm active:scale-[0.98]',
      dark: 'bg-mazelia-charcoal hover:bg-mazelia-charcoal-light text-white focus:ring-mazelia-charcoal shadow-sm active:scale-[0.98]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
      md: 'text-sm px-4 py-2.5 rounded-lg gap-2',
      lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
