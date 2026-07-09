import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Sparkles, Gavel, ShieldCheck, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CategoryTile } from '../components/marketplace/CategoryTile';
import { ItemCard } from '../components/marketplace/ItemCard';
import { CATEGORIES } from '../data/mock';
import { getFeaturedItems } from '../services/item.service';
import { getRecentSales } from '../services/marketplace.service';
import { formatUSD } from '../lib/format';

export default function LandingPage() {
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    getFeaturedItems(6).then(setFeatured);
    getRecentSales().then(setRecent);
  }, []);

  return (
    <div data-testid="landing-page">
      {/* HERO */}
      <section className="relative overflow-hidden gallery-grid-bg noise-overlay">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pt-20 md:pt-28 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 animate-fade-up">
              <Badge tone="gold" className="mb-6" icon={<Sparkles size={10} />}>
                AI valuations · trusted by 40,000 collectors
              </Badge>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[1.02] text-ink-text">
                Discover. Value. <br />
                <span className="text-ink-muted">Collect. Sell.</span>
              </h1>
              <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-xl">
                Snap a photo of any collectible. Our AI curator returns a market
                valuation with comparable sales in seconds — then lets you list it
                for sale, right here.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button as={Link} to="/appraise" size="xl" rightIcon={<ArrowRight size={16} />} data-testid="hero-cta-appraise">
                  Appraise your item
                </Button>
                <Button as={Link} to="/marketplace" size="xl" variant="secondary" data-testid="hero-cta-browse">
                  Browse marketplace
                </Button>
              </div>
              <div className="mt-12 flex items-center gap-8 text-sm text-ink-muted">
                <div>
                  <div className="font-display text-xl text-ink-text">$4.2B+</div>
                  <div className="text-xs uppercase tracking-widest mt-1">Valuations delivered</div>
                </div>
                <div className="h-8 w-px bg-ink-border" />
                <div>
                  <div className="font-display text-xl text-ink-text">98.4%</div>
                  <div className="text-xs uppercase tracking-widest mt-1">Confidence accuracy</div>
                </div>
                <div className="h-8 w-px bg-ink-border" />
                <div>
                  <div className="font-display text-xl text-ink-text">6</div>
                  <div className="text-xs uppercase tracking-widest mt-1">Verified categories</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative animate-fade-in">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:ml-auto lg:mr-0 rounded-2xl overflow-hidden border border-ink-border">
                <img
                  src="https://images.unsplash.com/photo-1611931960487-4932667079f1?q=85&w=1200&auto=format&fit=crop"
                  alt="Featured collectible — 1st Edition Charizard"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge tone="gold" icon={<Sparkles size={10} />}>Verified value · 94%</Badge>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">Live valuation</div>
                      <div className="font-display text-2xl tracking-tight text-white">$22K — $28K</div>
                      <div className="text-xs text-white/70 mt-1">Charizard · 1st Ed. Shadowless · PSA 9</div>
                    </div>
                    <Link to="/item/itm-001" className="h-10 w-10 rounded-full border border-white/25 bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-white hover:text-ink-bg transition-colors">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating value chip */}
              <div className="hidden md:flex absolute -left-6 top-14 bg-ink-surface/95 backdrop-blur border border-ink-border rounded-xl px-4 py-3 shadow-2xl items-center gap-3 animate-fade-up">
                <div className="h-9 w-9 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue flex items-center justify-center">
                  <Camera size={14} />
                </div>
                <div>
                  <div className="text-xs text-ink-muted">Photos analyzed</div>
                  <div className="font-display text-sm text-ink-text">6 · Front, back, edges</div>
                </div>
              </div>

              <div className="hidden md:flex absolute -right-4 bottom-16 bg-ink-surface/95 backdrop-blur border border-ink-border rounded-xl px-4 py-3 shadow-2xl items-center gap-3 animate-fade-up">
                <div className="h-9 w-9 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center">
                  <Gavel size={14} />
                </div>
                <div>
                  <div className="text-xs text-ink-muted">3 comparables</div>
                  <div className="font-display text-sm text-ink-text">PWCC · Heritage · eBay</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-20" data-testid="categories-section">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Curated categories</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">Six worlds. One marketplace.</h2>
          </div>
          <Link to="/marketplace" className="hidden md:inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-text transition-colors">
            Explore all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((c) => (
            <CategoryTile key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-ink-border bg-ink-surface/40" data-testid="how-it-works">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-20">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">How it works</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">From photograph to sale in under a minute.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {[
              {
                icon: <Camera size={16} />,
                step: '01',
                title: 'Photograph',
                copy: 'Snap 3–6 photos. Well-lit, front and back. That is all we need.',
              },
              {
                icon: <Sparkles size={16} />,
                step: '02',
                title: 'Valuate',
                copy: 'Our AI curator returns a value range, confidence score, and three comparable sales.',
              },
              {
                icon: <Gavel size={16} />,
                step: '03',
                title: 'List for sale',
                copy: 'Publish to the marketplace in a single tap — we handle photography, buyers, and payments.',
              },
            ].map((s) => (
              <div key={s.step} className="p-8 rounded-xl border border-ink-border bg-ink-bg/60">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg border border-ink-border bg-ink-surface flex items-center justify-center text-ink-text">
                    {s.icon}
                  </div>
                  <div className="font-display text-xs tracking-widest text-ink-muted">{s.step}</div>
                </div>
                <h3 className="font-display text-lg tracking-tight mt-6">{s.title}</h3>
                <p className="text-sm text-ink-muted mt-2 leading-relaxed">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ITEMS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-20" data-testid="featured-items">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">On the marketplace</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">Featured this week</h2>
          </div>
          <Link to="/marketplace" className="text-sm text-ink-muted hover:text-ink-text transition-colors inline-flex items-center gap-2">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {featured.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-20" data-testid="trust-section">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Trust & authenticity</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Every valuation shows its work.
            </h2>
            <p className="text-lg text-ink-muted mt-6 leading-relaxed max-w-xl">
              Our AI never pretends certainty. You will always see the comparable
              sales that anchor a valuation, a candid confidence score, and precisely
              what could improve it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge tone="blue" icon={<ShieldCheck size={11} />}>PSA · CGC · BGS integrated</Badge>
              <Badge tone="blue" icon={<ShieldCheck size={11} />}>Escrow-backed sales</Badge>
              <Badge tone="blue" icon={<ShieldCheck size={11} />}>Human curator review on request</Badge>
            </div>
          </div>
          <div className="rounded-xl border border-ink-border bg-ink-surface p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-ink-border pb-4">
              <div className="text-[11px] uppercase tracking-widest text-ink-muted">Recently sold</div>
              <div className="flex items-center gap-1 text-xs text-brand-gold">
                <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" />
                <span className="text-ink-muted ml-1">4.98 · Verified</span>
              </div>
            </div>
            <ul className="divide-y divide-ink-border">
              {recent.map((r) => (
                <li key={r.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm text-ink-text truncate">{r.title}</div>
                    <div className="text-xs text-ink-muted mt-0.5">
                      {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="font-display text-sm text-brand-gold shrink-0">
                    {formatUSD(r.price, { compact: true })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pb-20" data-testid="closing-cta">
        <div className="relative rounded-2xl border border-ink-border overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-bg via-ink-bg/80 to-transparent" />
          <div className="relative px-8 md:px-16 py-20 md:py-24 max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl tracking-tightest leading-[1.05]">
              You may already own something extraordinary.
            </h2>
            <p className="text-lg text-ink-muted mt-6 max-w-xl">
              Find out in seconds. No sign-up required to get your first valuation.
            </p>
            <Button as={Link} to="/appraise" size="xl" className="mt-10" rightIcon={<ArrowRight size={16} />}>
              Start free appraisal
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
