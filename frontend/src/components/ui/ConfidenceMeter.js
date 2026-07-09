import React from 'react';
import { cn } from '../../lib/cn';

export function ConfidenceMeter({ value = 0, label, size = 'md', className }) {
  const clamped = Math.max(0, Math.min(100, value));
  const tier = clamped >= 90 ? 'high' : clamped >= 75 ? 'medium' : 'low';
  const colors = {
    high: 'text-brand-gold',
    medium: 'text-brand-blue',
    low: 'text-ink-muted',
  };
  const tierLabels = {
    high: 'High confidence',
    medium: 'Moderate confidence',
    low: 'Exploratory',
  };
  const dim = size === 'lg' ? 120 : size === 'sm' ? 56 : 84;
  const stroke = size === 'lg' ? 8 : size === 'sm' ? 5 : 6;
  const r = dim / 2 - stroke;
  const c = 2 * Math.PI * r;
  const dash = c * (clamped / 100);

  return (
    <div className={cn('flex items-center gap-4', className)} data-testid="confidence-meter">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            fill="none"
            stroke="#2A3441"
            strokeWidth={stroke}
          />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            fill="none"
            stroke={tier === 'high' ? '#D4AF37' : tier === 'medium' ? '#2563EB' : '#94A3B8'}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${c}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 800ms ease-out' }}
          />
        </svg>
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center',
            colors[tier],
          )}
        >
          <span className="font-display text-xl tracking-tight">{clamped}</span>
          <span className="text-[9px] uppercase tracking-widest text-ink-muted">of 100</span>
        </div>
      </div>
      {(label || tierLabels[tier]) && (
        <div>
          <div className={cn('text-sm font-medium', colors[tier])}>{label || tierLabels[tier]}</div>
          <div className="text-xs text-ink-muted mt-0.5">AI valuation confidence</div>
        </div>
      )}
    </div>
  );
}
