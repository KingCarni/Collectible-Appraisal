import React from 'react';
import { Link } from 'react-router-dom';
import { formatUSD } from '../../lib/format';
import { Badge } from '../ui/Badge';
import { Sparkle } from 'lucide-react';
import { cn } from '../../lib/cn';

export function ItemCard({ item, className }) {
  const isHighConfidence = item.confidence >= 90;
  return (
    <Link
      to={`/item/${item.id}`}
      className={cn(
        'group block rounded-xl border border-ink-border bg-ink-surface overflow-hidden',
        'transition-all duration-250 hover:border-ink-muted/50 hover:-translate-y-0.5',
        className,
      )}
      data-testid={`item-card-${item.id}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-bg">
        <img
          src={item.thumb}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.style.opacity = '0';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge tone="muted">{item.condition}</Badge>
        </div>
        {isHighConfidence && (
          <div className="absolute top-3 right-3">
            <Badge tone="gold" icon={<Sparkle size={10} />}>
              Verified value
            </Badge>
          </div>
        )}
      </div>
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-sm tracking-tight text-ink-text truncate">
              {item.title}
            </h3>
            <p className="text-xs text-ink-muted mt-1 truncate">{item.subtitle}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display text-sm text-ink-text">{formatUSD(item.price, { compact: true })}</div>
            <div className="text-[10px] uppercase tracking-widest text-ink-muted mt-1">Ask</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
