import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';

export function StepIndicator({ steps, current }) {
  return (
    <ol className="flex items-center gap-3 md:gap-4" data-testid="step-indicator">
      {steps.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo';
        return (
          <li key={s} className="flex items-center gap-3 md:gap-4 min-w-0">
            <div
              className={cn(
                'h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-medium border transition-colors',
                state === 'done' && 'bg-brand-blue text-white border-brand-blue',
                state === 'current' && 'bg-ink-surface text-ink-text border-brand-blue',
                state === 'todo' && 'bg-ink-surface text-ink-muted border-ink-border',
              )}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {state === 'done' ? <Check size={12} strokeWidth={2.5} /> : i + 1}
            </div>
            <span
              className={cn(
                'text-xs md:text-sm whitespace-nowrap hidden sm:inline',
                state === 'current' ? 'text-ink-text' : 'text-ink-muted',
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="h-px w-6 md:w-10 bg-ink-border shrink-0" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
