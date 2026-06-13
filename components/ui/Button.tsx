import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-2xl transition-all active:scale-[0.985] disabled:opacity-60 disabled:pointer-events-none";

    const variants = {
      default: "bg-white text-zinc-950 hover:bg-zinc-100 shadow-sm",
      outline: "border border-zinc-700 hover:bg-zinc-900 text-white",
      ghost: "hover:bg-zinc-900 text-zinc-300",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
