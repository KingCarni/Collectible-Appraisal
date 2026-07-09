import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Sparkles, Info, TrendingUp, ExternalLink, PlusCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { formatUSD } from '../lib/format';
import { findCategory } from '../data/mock';

export default function ValuationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [valuation, setValuation] = useState(null);

  useEffect(() => {
    // Read from sessionStorage (stubbed persistence)
    const raw = sessionStorage.getItem('lastValuation');
    if (raw) {
      try {
        const v = JSON.parse(raw);
        if (v.id === id) setValuation(v);
      } catch (_) {
        // ignore parse errors
      }
    }
    // Fallback demo valuation
    if (!sessionStorage.getItem('lastValuation')) {
      setValuation({
        id,
        title: 'Charizard — 1st Edition Shadowless Holo',
        category: 'pokemon',
        estimatedLow: 22400,
        estimatedMid: 25600,
        estimatedHigh: 28800,
        confidence: 92,
        rationale:
          'Our valuation is anchored to three recent verified sales of comparable grade and provenance, adjusted for current market momentum in this category (+4% over the last 90 days).',
        improvementSuggestions: [
          'Add a photo of the back or reverse side',
          'Upload a close-up of any grading label',
          'Note the provenance or original purchase details',
        ],
        comparableSales: [
          { title: 'Charizard 1st Ed. Holo PSA 9', price: 23800, source: 'PWCC Auction', date: '2025-11-14' },
          { title: 'Charizard 1st Ed. Holo PSA 8', price: 14200, source: 'Heritage Auctions', date: '2025-12-01' },
          { title: 'Charizard 1st Ed. Holo PSA 10', price: 62500, source: 'eBay Verified', date: '2026-01-03' },
        ],
        images: [],
      });
    }
  }, [id]);

  if (!valuation) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="animate-pulse h-64 rounded-2xl bg-ink-surface" />
      </div>
    );
  }

  const category = findCategory(valuation.category);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-12" data-testid="valuation-page">
      {/* Hero valuation reveal */}
      <div className="animate-fade-up rounded-2xl border border-ink-border bg-ink-surface overflow-hidden">
        <div className="relative p-8 md:p-12">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(1000px_400px_at_20%_-40%,rgba(37,99,235,0.25),transparent_60%),radial-gradient(600px_300px_at_90%_-20%,rgba(212,175,55,0.12),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Badge tone="gold" icon={<Sparkles size={10} />}>AI-verified valuation</Badge>
              <Badge tone="muted">{category?.name || valuation.category}</Badge>
            </div>
            <h1 className="font-display text-3xl md:text-5xl tracking-tightest leading-[1.02]" data-testid="valuation-title">
              {valuation.title}
            </h1>

            <div className="grid md:grid-cols-3 gap-8 mt-10">
              <div className="md:col-span-2">
                <div className="text-[11px] uppercase tracking-widest text-ink-muted">Estimated market value</div>
                <div className="mt-3 flex items-baseline gap-4 flex-wrap">
                  <div className="font-display text-5xl md:text-6xl tracking-tightest" data-testid="valuation-mid">
                    {formatUSD(valuation.estimatedMid)}
                  </div>
                  <div className="text-ink-muted text-sm">
                    Range · <span className="text-ink-text">{formatUSD(valuation.estimatedLow)}</span> — <span className="text-ink-text">{formatUSD(valuation.estimatedHigh)}</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-ink-muted">
                  <TrendingUp size={12} className="text-status-success" />
                  Category momentum: <span className="text-status-success">+4.2%</span> last 90 days
                </div>
              </div>
              <div className="flex md:justify-end">
                <ConfidenceMeter value={valuation.confidence} size="lg" />
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button as={Link} to="/marketplace" size="xl" rightIcon={<ArrowRight size={14} />} data-testid="list-for-sale-cta">
                List for sale on marketplace
              </Button>
              <Button variant="secondary" size="xl" leftIcon={<PlusCircle size={14} />}>
                Save to my collection
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rationale + improve */}
      <div className="grid md:grid-cols-5 gap-6 mt-12">
        <div className="md:col-span-3 p-8 rounded-2xl border border-ink-border bg-ink-surface">
          <div className="flex items-center gap-2 text-brand-blue">
            <Info size={14} />
            <div className="text-[11px] uppercase tracking-widest font-medium">Why this estimate</div>
          </div>
          <p className="text-base text-ink-text/90 mt-4 leading-relaxed">
            {valuation.rationale}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-ink-bg/60 border border-ink-border">
              <div className="text-xs text-ink-muted mb-1">Comparables used</div>
              <div className="font-display text-xl">{valuation.comparableSales.length}</div>
            </div>
            <div className="p-4 rounded-lg bg-ink-bg/60 border border-ink-border">
              <div className="text-xs text-ink-muted mb-1">Data recency</div>
              <div className="font-display text-xl">≤ 90 days</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 p-8 rounded-2xl border border-ink-border bg-ink-surface">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted font-medium mb-4">
            Improve confidence
          </div>
          <ul className="space-y-3 text-sm">
            {valuation.improvementSuggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
                <span className="text-ink-text/90 leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
          <button
            className="mt-6 inline-flex items-center gap-2 text-xs text-brand-blue hover:underline"
            onClick={() => navigate('/appraise')}
            data-testid="re-appraise"
          >
            <RefreshCw size={12} /> Add more photos and re-appraise
          </button>
        </div>
      </div>

      {/* Comparables */}
      <section className="mt-14" data-testid="comparables-section">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Verified comparable sales</div>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">The three sales that anchor this value.</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {valuation.comparableSales.map((c, i) => (
            <div key={i} className="p-6 rounded-xl border border-ink-border bg-ink-surface">
              <div className="text-xs text-ink-muted">
                {new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="font-display text-lg tracking-tight mt-2 leading-snug">{c.title}</div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-muted">Sale price</div>
                  <div className="font-display text-2xl mt-1">{formatUSD(c.price, { compact: true })}</div>
                </div>
                <a
                  href="#"
                  className="text-xs text-ink-muted hover:text-ink-text inline-flex items-center gap-1 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  {c.source} <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center mt-16 pb-4">
        <p className="text-sm text-ink-muted max-w-md mx-auto">
          Ready to sell? List your item on the marketplace in a single tap — we handle
          photography, buyers, and payments.
        </p>
        <Button as={Link} to="/marketplace" size="xl" className="mt-6" rightIcon={<ArrowRight size={14} />}>
          Go to marketplace
        </Button>
      </div>
    </div>
  );
}
