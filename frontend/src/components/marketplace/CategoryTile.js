import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/cn';

export function CategoryTile({ category, size = 'md', className }) {
  const heights = {
    sm: 'aspect-[4/5]',
    md: 'aspect-[4/5]',
    lg: 'aspect-[3/4]',
  };
  return (
    <Link
      to={`/category/${category.id}`}
      className={cn(
        'group relative block overflow-hidden rounded-xl border border-ink-border',
        heights[size],
        className,
      )}
      data-testid={`category-tile-${category.id}`}
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1.5">
              {category.itemCount.toLocaleString()} items
            </div>
            <h3 className="font-display text-xl md:text-2xl tracking-tight text-white">
              {category.name}
            </h3>
            <p className="text-xs md:text-sm text-ink-muted mt-1 max-w-[220px] line-clamp-2">
              {category.tagline}
            </p>
          </div>
          <span className="shrink-0 h-9 w-9 rounded-full border border-white/20 bg-black/30 backdrop-blur flex items-center justify-center text-white transition-all group-hover:bg-white group-hover:text-ink-bg">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
