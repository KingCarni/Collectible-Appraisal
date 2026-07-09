import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-ink-border mt-24" data-testid="app-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-blue text-white">
                <Sparkles size={14} />
              </span>
              <span className="font-display text-[15px] tracking-tight text-ink-text">
                Collectible Appraisal
              </span>
            </Link>
            <p className="text-sm text-ink-muted mt-4 max-w-xs leading-relaxed">
              A curated marketplace for collectors. AI-powered valuations, verified provenance,
              and world-class photography.
            </p>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-muted font-medium mb-4">Marketplace</div>
            <ul className="space-y-2.5 text-sm text-ink-text/80">
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Browse all</Link></li>
              <li><Link to="/category/fine-art" className="hover:text-white transition-colors">Fine Art</Link></li>
              <li><Link to="/category/pokemon" className="hover:text-white transition-colors">Pokémon</Link></li>
              <li><Link to="/category/magic" className="hover:text-white transition-colors">Magic: The Gathering</Link></li>
              <li><Link to="/category/comics" className="hover:text-white transition-colors">Comics</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-muted font-medium mb-4">Sell</div>
            <ul className="space-y-2.5 text-sm text-ink-text/80">
              <li><Link to="/appraise" className="hover:text-white transition-colors">Appraise an item</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Seller dashboard</Link></li>
              <li><Link to="/collection" className="hover:text-white transition-colors">My collection</Link></li>
              <li><Link to="/saved" className="hover:text-white transition-colors">Saved items</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-muted font-medium mb-4">Company</div>
            <ul className="space-y-2.5 text-sm text-ink-text/80">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-ink-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} Collectible Appraisal. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-ink-muted">
            <a href="#" className="hover:text-ink-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-ink-text transition-colors">Terms</a>
            <a href="#" className="hover:text-ink-text transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
