import React from 'react';
import { cn } from '../../lib/cn';

export function SkeletonCard({ className }) {
  return (
    <div className={cn('rounded-xl border border-ink-border bg-ink-surface overflow-hidden', className)}>
      <div
        className="aspect-[4/5] w-full"
        style={{
          background:
            'linear-gradient(90deg, #151B23 0%, #1c2532 40%, #151B23 80%)',
          backgroundSize: '400px 100%',
        }}
      />
      <div className="p-4 space-y-2">
        <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
        <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
      </div>
    </div>
  );
}
