import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Eye, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { getMyListings, getDashboardMetrics } from '../services/item.service';
import { formatUSD, formatRelativeTime } from '../lib/format';

export default function SellerDashboardPage() {
  const [listings, setListings] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [tab, setTab] = useState('live');

  useEffect(() => {
    getMyListings().then(setListings);
    getDashboardMetrics().then(setMetrics);
  }, []);

  const filtered = listings.filter((l) => (tab === 'all' ? true : l.status === tab));

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-12" data-testid="dashboard-page">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Seller dashboard</div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tightest">Your storefront</h1>
        </div>
        <Button as={Link} to="/appraise" leftIcon={<PlusCircle size={14} />} data-testid="new-listing-btn">
          New listing
        </Button>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: <DollarSign size={14} />, label: 'Gross sales', value: metrics ? formatUSD(metrics.grossSales) : '—', foot: 'Last 30 days' },
          { icon: <TrendingUp size={14} />, label: 'Active listings', value: metrics?.activeListings ?? '—', foot: 'Live now' },
          { icon: <Users size={14} />, label: 'Watchers', value: metrics?.watchers ?? '—', foot: 'Across listings' },
          { icon: <Eye size={14} />, label: 'Pending offers', value: metrics?.pendingOffers ?? '—', foot: 'Awaiting response' },
        ].map((m) => (
          <div key={m.label} className="p-5 rounded-xl border border-ink-border bg-ink-surface">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 rounded-md border border-ink-border bg-ink-bg flex items-center justify-center text-ink-muted">
                {m.icon}
              </div>
            </div>
            <div className="text-[11px] uppercase tracking-widest text-ink-muted mt-4">{m.label}</div>
            <div className="font-display text-2xl tracking-tight mt-1">{m.value}</div>
            <div className="text-xs text-ink-muted mt-1">{m.foot}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-ink-border mb-6">
        {[
          { id: 'live', label: 'Live' },
          { id: 'draft', label: 'Drafts' },
          { id: 'all', label: 'All' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              'px-4 py-3 text-sm border-b-2 -mb-px transition-colors ' +
              (tab === t.id
                ? 'text-ink-text border-brand-blue'
                : 'text-ink-muted border-transparent hover:text-ink-text')
            }
            data-testid={`tab-${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Listings table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<PlusCircle size={18} />}
          title="No listings here yet"
          description="Appraise an item to get started — you can publish it to the marketplace in one tap."
          action={<Button as={Link} to="/appraise">Appraise an item</Button>}
        />
      ) : (
        <div className="rounded-xl border border-ink-border bg-ink-surface overflow-hidden">
          <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_100px_120px] gap-4 px-5 py-3 border-b border-ink-border text-[11px] uppercase tracking-widest text-ink-muted">
            <div>Image</div>
            <div>Item</div>
            <div>Price</div>
            <div>Views</div>
            <div>Watchers</div>
            <div>Status</div>
          </div>
          <ul>
            {filtered.map((l) => (
              <li key={l.id} className="border-b border-ink-border last:border-none">
                <Link to={`/item/${l.id}`} className="grid md:grid-cols-[80px_1fr_120px_100px_100px_120px] gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-lg overflow-hidden border border-ink-border bg-ink-bg">
                    <img src={l.thumb} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-ink-text truncate">{l.title}</div>
                    <div className="text-xs text-ink-muted mt-1 truncate">{l.subtitle}</div>
                    <div className="text-xs text-ink-muted mt-1 md:hidden">
                      {formatUSD(l.price)} · Listed {formatRelativeTime(l.listedAt)}
                    </div>
                  </div>
                  <div className="hidden md:block font-display text-sm">{formatUSD(l.price, { compact: true })}</div>
                  <div className="hidden md:block text-sm text-ink-muted">{l.views}</div>
                  <div className="hidden md:block text-sm text-ink-muted">{l.watchers}</div>
                  <div className="hidden md:block">
                    <Badge tone={l.status === 'live' ? 'success' : 'muted'}>{l.status}</Badge>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
