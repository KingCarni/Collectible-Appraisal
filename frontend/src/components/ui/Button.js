import React from 'react';
import { cn } from '../../lib/cn';

const variants = {
  primary:
    'bg-brand-blue text-ink-text hover:bg-blue-600 active:scale-[0.98] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]',
  secondary:
    'bg-ink-surface border border-ink-border text-ink-text hover:border-ink-muted/60 hover:bg-[#1a2230] active:scale-[0.98]',
  ghost:
    'bg-transparent text-ink-text hover:bg-white/[0.04] active:scale-[0.98]',
  accent:
    'bg-brand-gold text-ink-bg hover:brightness-110 active:scale-[0.98] font-semibold',
  outline:
    'bg-transparent border border-ink-border text-ink-text hover:border-brand-blue/60 hover:text-white active:scale-[0.98]',
  danger:
    'bg-status-error/90 text-white hover:bg-status-error active:scale-[0.98]',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5 rounded-md',
  md: 'text-sm px-4 py-2.5 rounded-lg',
  lg: 'text-sm px-6 py-3 rounded-lg',
  xl: 'text-base px-7 py-3.5 rounded-lg',
};

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  leftIcon,
  rightIcon,
  loading = false,
  ...props
}) {
  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ink-bg disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-current border-r-transparent animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </Component>
  );
}
