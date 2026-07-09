import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ShieldCheck, Heart, Share2, Sparkles, TrendingUp, Info, Award,
} from 'lucide-react';
import { getItem, getRelatedItems, buyNow, makeOffer } from '../services/marketplace.service';
import { formatUSD, formatRelativeTime } from '../lib/format';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, Label } from '../components/ui/Input';
import { ItemCard } from '../components/marketplace/ItemCard';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [offerOpen, setOfferOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setItem(null);
    setActiveImg(0);
    getItem(id).then(setItem);
    getRelatedItems(id).then(setRelated);
  }, [id]);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16">
        <div className="animate-pulse h-96 rounded-2xl bg-ink-surface" />
      </div>
    );
  }

  const submitOffer = async () => {
    setProcessing(true);
    // TODO: real Stripe/escrow integration
    const res = await makeOffer({ itemId: item.id, amount: Number(offerAmount) });
    setProcessing(false);
    setOfferOpen(false);
    setConfirmation({
      title: 'Offer submitted',
      body: `Your offer of ${formatUSD(res.amount)} has been sent to ${item.seller.name}. You will be notified when they respond.`,
    });
  };

  const submitBuy = async () => {
    setProcessing(true);
    // TODO: real Stripe checkout redirect
    const res = await buyNow({ itemId: item.id });
    setProcessing(false);
    setBuyOpen(false);
    setConfirmation({
      title: 'Purchase confirmed',
      body: `Order ${res.orderId} placed. Escrow will hold funds until authentication is complete.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-8" data-testid="item-detail-page">
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-text mb-6 transition-colors"
        data-testid="back-button"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-ink-border bg-ink-surface">
            <img
              src={item.images[activeImg]}
              alt={item.title}
              className="h-full w-full object-cover animate-fade-in"
              data-testid="item-image-active"
            />
            <div className="absolute top-4 left-4 flex gap-1.5">
              {item.confidence >= 90 && (
                <Badge tone="gold" icon={<Sparkles size={10} />}>Verified value · {item.confidence}%</Badge>
              )}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setSaved((v) => !v)}
                className="h-10 w-10 rounded-full bg-black/40 backdrop-blur border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                aria-label="Save"
                data-testid="save-item"
              >
                <Heart size={14} fill={saved ? 'currentColor' : 'transparent'} />
              </button>
              <button className="h-10 w-10 rounded-full bg-black/40 backdrop-blur border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-colors" aria-label="Share" data-testid="share-item">
                <Share2 size={14} />
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-6 gap-3">
            {item.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={
                  'aspect-square rounded-lg overflow-hidden border transition-all ' +
                  (i === activeImg ? 'border-brand-blue' : 'border-ink-border hover:border-ink-muted')
                }
                aria-label={`View image ${i + 1}`}
                data-testid={`thumbnail-${i}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <Link to={`/category/${item.category}`} className="uppercase tracking-widest hover:text-ink-text transition-colors">
              {item.category.replace('-', ' ')}
            </Link>
            <span>·</span>
            <span>Listed {formatRelativeTime(item.listedAt)}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl tracking-tightest mt-3 leading-tight" data-testid="item-title">
            {item.title}
          </h1>
          <p className="text-ink-muted text-base mt-2">{item.subtitle}</p>

          <div className="mt-8 flex items-end justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-ink-muted">Ask price</div>
              <div className="font-display text-4xl tracking-tight mt-1" data-testid="item-price">
                {formatUSD(item.price)}
              </div>
              <div className="text-xs text-ink-muted mt-1">
                Est. range · {formatUSD(item.priceLow)} — {formatUSD(item.priceHigh)}
              </div>
            </div>
            <ConfidenceMeter value={item.confidence} size="sm" />
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Button size="xl" onClick={() => setBuyOpen(true)} data-testid="buy-now-btn">
              Buy now
            </Button>
            <Button size="xl" variant="secondary" onClick={() => setOfferOpen(true)} data-testid="make-offer-btn">
              Make an offer
            </Button>
          </div>

          {/* Seller card */}
          <div className="mt-8 p-5 rounded-xl border border-ink-border bg-ink-surface">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-medium text-sm">{item.seller.name}</div>
                  {item.seller.verified && (
                    <Badge tone="blue" icon={<ShieldCheck size={10} />}>Verified</Badge>
                  )}
                </div>
                <div className="text-xs text-ink-muted mt-1">
                  Rating {item.seller.rating.toFixed(2)} · Escrow protected
                </div>
              </div>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>

          {/* Provenance */}
          <div className="mt-6">
            <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-3">Provenance</div>
            <ul className="space-y-2 text-sm text-ink-text/90">
              {item.provenance.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Award size={14} className="text-brand-gold shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI valuation note */}
          <div className="mt-8 p-5 rounded-xl border border-brand-blue/25 bg-brand-blue/[0.04]">
            <div className="flex items-center gap-2 text-brand-blue">
              <Info size={14} />
              <div className="text-[11px] uppercase tracking-widest font-medium">Why this valuation</div>
            </div>
            <p className="text-sm text-ink-text/90 mt-2 leading-relaxed">
              Anchored to 3 recent verified comparable sales and adjusted for grade, current
              category momentum, and time-of-year seasonality.
            </p>
            <button className="text-xs text-brand-blue mt-3 inline-flex items-center gap-1 hover:underline">
              <TrendingUp size={12} /> View full valuation report
            </button>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24" data-testid="related-items">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl tracking-tight">More from this category</h2>
            <Link to={`/category/${item.category}`} className="text-sm text-ink-muted hover:text-ink-text transition-colors">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((r) => (
              <ItemCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}

      {/* Buy modal */}
      <Modal open={buyOpen} onClose={() => setBuyOpen(false)} title="Confirm purchase" size="md">
        <p className="text-sm text-ink-muted">
          You are about to purchase <span className="text-ink-text">{item.title}</span> for{' '}
          <span className="text-ink-text font-medium">{formatUSD(item.price)}</span>.
        </p>
        <div className="mt-5 rounded-lg border border-ink-border bg-ink-bg p-4 text-sm">
          <div className="flex justify-between py-1"><span className="text-ink-muted">Item</span><span>{formatUSD(item.price)}</span></div>
          <div className="flex justify-between py-1"><span className="text-ink-muted">Escrow fee</span><span>{formatUSD(Math.round(item.price * 0.02))}</span></div>
          <div className="flex justify-between py-1"><span className="text-ink-muted">Insured shipping</span><span>{formatUSD(150)}</span></div>
          <div className="mt-2 pt-2 border-t border-ink-border flex justify-between font-display"><span>Total</span><span>{formatUSD(item.price + Math.round(item.price * 0.02) + 150)}</span></div>
        </div>
        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setBuyOpen(false)}>Cancel</Button>
          <Button loading={processing} onClick={submitBuy} data-testid="confirm-buy">Confirm & pay</Button>
        </div>
      </Modal>

      {/* Offer modal */}
      <Modal open={offerOpen} onClose={() => setOfferOpen(false)} title="Make an offer" size="md">
        <p className="text-sm text-ink-muted mb-5">
          Offers below 80% of the ask price are rarely accepted.
        </p>
        <Label>Your offer (USD)</Label>
        <Input
          type="number"
          value={offerAmount}
          onChange={(e) => setOfferAmount(e.target.value)}
          placeholder={formatUSD(Math.round(item.price * 0.9))}
          data-testid="offer-input"
        />
        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setOfferOpen(false)}>Cancel</Button>
          <Button loading={processing} disabled={!offerAmount} onClick={submitOffer} data-testid="confirm-offer">
            Submit offer
          </Button>
        </div>
      </Modal>

      {/* Confirmation modal */}
      <Modal open={!!confirmation} onClose={() => setConfirmation(null)} title={confirmation?.title || ''}>
        <p className="text-sm text-ink-muted">{confirmation?.body}</p>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setConfirmation(null)}>Done</Button>
        </div>
      </Modal>
    </div>
  );
}
