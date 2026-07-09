import React from 'react';
import { cn } from '../../lib/cn';

export const Input = React.forwardRef(function Input(
  { className, leftIcon, rightIcon, ...props },
  ref,
) {
  return (
    <div className="relative">
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full bg-ink-bg border border-ink-border rounded-lg px-4 py-2.5 text-sm text-ink-text placeholder-ink-muted/70',
          'focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all duration-200',
          leftIcon && 'pl-10',
          rightIcon && 'pr-10',
          className,
        )}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted">
          {rightIcon}
        </span>
      )}
    </div>
  );
});

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'w-full bg-ink-bg border border-ink-border rounded-lg px-4 py-3 text-sm text-ink-text placeholder-ink-muted/70',
        'focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all duration-200 resize-none',
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'w-full bg-ink-bg border border-ink-border rounded-lg px-3 py-2.5 text-sm text-ink-text',
        'focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all duration-200 appearance-none',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn(
        'block text-xs uppercase tracking-widest text-ink-muted mb-2 font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
