import React from 'react';
import { cn } from '../../lib/cn';

const tones = {
  neutral: 'bg-ink-surface border-ink-border text-ink-text',
  gold: 'bg-brand-gold/10 border-brand-gold/30 text-brand-gold',
  blue: 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue',
  success: 'bg-status-success/10 border-status-success/30 text-status-success',
  warning: 'bg-status-warning/10 border-status-warning/30 text-status-warning',
  error: 'bg-status-error/10 border-status-error/30 text-status-error',
  muted: 'bg-white/[0.03] border-white/[0.06] text-ink-muted',
};

export function Badge({ tone = 'neutral', className, children, icon, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border tracking-wide',
        tones[tone],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
