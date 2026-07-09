import React from 'react';
import { Link } from 'react-router-dom';
import { Frame, Bookmark, ClipboardList } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export function MyCollectionPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16" data-testid="collection-page">
      <div className="mb-12">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">My collection</div>
        <h1 className="font-display text-4xl md:text-5xl tracking-tightest">Your archive</h1>
        <p className="text-ink-muted mt-3 max-w-lg">
          Every item you have appraised or saved. Track values over time, private to you.
        </p>
      </div>
      <div className="rounded-2xl border border-ink-border bg-ink-surface">
        <EmptyState
          icon={<Frame size={18} />}
          title="Your collection is empty"
          description="Appraise an item to add it to your private archive. We'll track its estimated value over time."
          action={<Button as={Link} to="/appraise">Appraise your first item</Button>}
        />
      </div>
    </div>
  );
}

export function SavedItemsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16" data-testid="saved-page">
      <div className="mb-12">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Saved</div>
        <h1 className="font-display text-4xl md:text-5xl tracking-tightest">Watchlist</h1>
        <p className="text-ink-muted mt-3 max-w-lg">
          Items you have saved from the marketplace. We will notify you if the price changes.
        </p>
      </div>
      <div className="rounded-2xl border border-ink-border bg-ink-surface">
        <EmptyState
          icon={<Bookmark size={18} />}
          title="Nothing saved yet"
          description="Tap the heart on any marketplace item to add it here."
          action={<Button as={Link} to="/marketplace" variant="secondary">Browse marketplace</Button>}
        />
      </div>
    </div>
  );
}

export function AdminReviewPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16" data-testid="admin-page">
      <div className="mb-12">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Curator queue</div>
        <h1 className="font-display text-4xl md:text-5xl tracking-tightest">Human review</h1>
        <p className="text-ink-muted mt-3 max-w-lg">
          Items flagged for human curator review — either by AI low-confidence or by seller request.
        </p>
      </div>
      <div className="rounded-2xl border border-ink-border bg-ink-surface">
        <EmptyState
          icon={<ClipboardList size={18} />}
          title="Inbox zero"
          description="No items currently awaiting curator review. New items appear here in real time."
        />
      </div>
    </div>
  );
}
