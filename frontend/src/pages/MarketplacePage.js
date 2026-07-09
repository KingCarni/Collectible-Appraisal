import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sliders, X, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../data/mock';
import { listItems } from '../services/marketplace.service';
import { ItemCard } from '../components/marketplace/ItemCard';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/cn';

const CONDITIONS = ['all', 'PSA 9', 'PSA 8', 'PSA 7', 'BGS 8.5', 'CGC 6.0', 'CGC 4.5', 'MS-65', 'PCGS AU-53', 'Excellent', 'Very Good'];
const PRICE_BUCKETS = [
  { label: 'Any', min: undefined, max: undefined },
  { label: 'Under $5K', min: 0, max: 5000 },
  { label: '$5K – $25K', min: 5000, max: 25000 },
  { label: '$25K – $100K', min: 25000, max: 100000 },
  { label: '$100K – $500K', min: 100000, max: 500000 },
  { label: '$500K+', min: 500000, max: undefined },
];

export default function MarketplacePage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filters = useMemo(() => ({
    category: params.get('category') || undefined,
    query: params.get('q') || undefined,
    condition: params.get('condition') || 'all',
    priceBucket: Number(params.get('bucket') || 0),
    sort: params.get('sort') || 'featured',
  }), [params]);

  const priceBucket = PRICE_BUCKETS[filters.priceBucket] || PRICE_BUCKETS[0];

  useEffect(() => {
    setItems(null);
    listItems({
      category: filters.category,
      query: filters.query,
      condition: filters.condition,
      minPrice: priceBucket.min,
      maxPrice: priceBucket.max,
      sort: filters.sort,
    }).then(setItems);
  }, [filters, priceBucket.min, priceBucket.max]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value == null || value === '' || value === 'all' || value === 0 || value === '0') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams({}, { replace: true });

  const hasFilters = filters.category || filters.condition !== 'all' || filters.priceBucket || filters.query;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-12" data-testid="marketplace-page">
      <header className="flex items-end justify-between mb-10 gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Marketplace</div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tightest">
            {filters.category
              ? CATEGORIES.find((c) => c.id === filters.category)?.name || 'Browse'
              : 'Every collectible, curated.'}
          </h1>
          {items && (
            <p className="text-sm text-ink-muted mt-3">
              {items.length} {items.length === 1 ? 'item' : 'items'} available
            </p>
          )}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => update('sort', e.target.value)}
              className="appearance-none bg-ink-surface border border-ink-border rounded-lg pl-9 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue"
              data-testid="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price · Low to High</option>
              <option value="price-desc">Price · High to Low</option>
            </select>
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          </div>
        </div>
        <button
          className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-ink-border text-sm"
          onClick={() => setShowFilters(true)}
          data-testid="mobile-filters-toggle"
        >
          <Sliders size={14} /> Filters
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
        {/* Filter sidebar */}
        <aside
          className={cn(
            'md:sticky md:top-24 md:self-start',
            'fixed inset-0 z-50 md:static md:z-auto',
            showFilters ? 'block' : 'hidden md:block',
          )}
          data-testid="filters-sidebar"
        >
          {/* Mobile overlay */}
          <div className="md:hidden absolute inset-0 bg-black/70" onClick={() => setShowFilters(false)} />
          <div className="relative md:bg-transparent bg-ink-bg h-full md:h-auto p-6 md:p-0 overflow-y-auto md:overflow-visible ml-auto md:ml-0 w-4/5 md:w-auto border-l md:border-l-0 border-ink-border">
            <div className="flex items-center justify-between md:hidden mb-6">
              <div className="font-display text-lg tracking-tight">Filters</div>
              <button onClick={() => setShowFilters(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <FilterGroup title="Category">
              <button
                onClick={() => update('category', null)}
                className={cn('filter-chip', !filters.category && 'filter-chip-active')}
                data-testid="filter-category-all"
              >
                All categories
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => update('category', c.id)}
                  className={cn('filter-chip', filters.category === c.id && 'filter-chip-active')}
                  data-testid={`filter-category-${c.id}`}
                >
                  {c.name}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Price">
              {PRICE_BUCKETS.map((b, i) => (
                <button
                  key={b.label}
                  onClick={() => update('bucket', i)}
                  className={cn('filter-chip', filters.priceBucket === i && 'filter-chip-active')}
                  data-testid={`filter-price-${i}`}
                >
                  {b.label}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Condition">
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => update('condition', c)}
                  className={cn('filter-chip', filters.condition === c && 'filter-chip-active')}
                  data-testid={`filter-condition-${c.replace(/\s+/g, '-')}`}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </FilterGroup>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearAll} className="mt-2" data-testid="clear-filters">
                Clear all filters
              </Button>
            )}
          </div>
        </aside>

        {/* Results grid */}
        <section data-testid="marketplace-results">
          {items === null && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}
          {items && items.length === 0 && (
            <EmptyState
              icon={<Sliders size={18} />}
              title="No items match those filters"
              description="Try broadening the price range or clearing a filter."
              action={<Button variant="secondary" onClick={clearAll}>Clear filters</Button>}
            />
          )}
          {items && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Global chip styles */}
      <style>{`
        .filter-chip {
          display: block;
          width: 100%;
          text-align: left;
          font-size: 13px;
          padding: 8px 12px;
          border-radius: 8px;
          color: #94A3B8;
          border: 1px solid transparent;
          transition: all 200ms ease-out;
        }
        .filter-chip:hover { color: #F8FAFC; background: rgba(255,255,255,0.03); }
        .filter-chip-active { color: #F8FAFC; background: #151B23; border-color: #2A3441; }
      `}</style>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="mb-8">
      <div className="text-[11px] uppercase tracking-widest text-ink-muted font-medium mb-3">{title}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
