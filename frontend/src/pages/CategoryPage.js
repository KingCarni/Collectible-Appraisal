import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { findCategory, itemsByCategory, RECENT_SALES } from '../data/mock';
import { ItemCard } from '../components/marketplace/ItemCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatUSD } from '../lib/format';

export default function CategoryPage() {
  const { id } = useParams();
  const category = findCategory(id);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(itemsByCategory(id));
  }, [id]);

  if (!category) return <Navigate to="/marketplace" replace />;

  return (
    <div data-testid={`category-page-${id}`}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-border">
        <img
          src={category.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-bg via-ink-bg/70 to-ink-bg/40" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-24 md:py-32">
          <div className="max-w-2xl">
            <Badge tone="muted" className="mb-6">{category.itemCount.toLocaleString()} listings</Badge>
            <h1 className="font-display text-5xl md:text-7xl tracking-tightest leading-[1.02]">
              {category.name}
            </h1>
            <p className="text-lg text-ink-muted mt-6 leading-relaxed">{category.description}</p>
            <div className="mt-8 flex gap-3">
              <Button as={Link} to={`/marketplace?category=${category.id}`} size="lg" rightIcon={<ArrowRight size={14} />}>
                Browse all
              </Button>
              <Button as={Link} to="/appraise" variant="secondary" size="lg">
                Appraise yours
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl tracking-tight">Featured in {category.name}</h2>
          <Link to={`/marketplace?category=${category.id}`} className="text-sm text-ink-muted hover:text-ink-text transition-colors inline-flex items-center gap-2">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Recent sales strip */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16 border-t border-ink-border">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Recent verified sales</div>
        <h3 className="font-display text-2xl tracking-tight mb-8">What has been changing hands.</h3>
        <div className="rounded-xl border border-ink-border bg-ink-surface divide-y divide-ink-border">
          {RECENT_SALES.map((s) => (
            <div key={s.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-ink-text">{s.title}</div>
                <div className="text-xs text-ink-muted mt-0.5">
                  {new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <div className="font-display text-lg text-brand-gold">{formatUSD(s.price, { compact: true })}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
