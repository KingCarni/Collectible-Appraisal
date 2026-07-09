import React from 'react';
import { cn } from '../../lib/cn';

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-24 px-6',
        className,
      )}
      data-testid="empty-state"
    >
      {icon && (
        <div className="mb-6 h-14 w-14 rounded-full border border-ink-border bg-ink-surface flex items-center justify-center text-ink-muted">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl tracking-tight text-ink-text mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-ink-muted max-w-md leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
