import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Sparkles, Menu, X, User } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';

const navLinks = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/appraise', label: 'Appraise' },
  { to: '/category/fine-art', label: 'Fine Art' },
  { to: '/category/pokemon', label: 'Pokémon' },
  { to: '/category/comics', label: 'Comics' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/marketplace?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-40 bg-ink-bg/80 backdrop-blur-xl border-b border-ink-border/80"
      data-testid="app-header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="h-16 flex items-center gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" data-testid="brand-logo">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-blue text-white">
              <Sparkles size={14} />
            </span>
            <span className="font-display text-[15px] tracking-tight text-ink-text">
              Collectible Appraisal
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-1.5 text-sm rounded-md transition-colors',
                    isActive
                      ? 'text-ink-text bg-white/[0.04]'
                      : 'text-ink-muted hover:text-ink-text hover:bg-white/[0.03]',
                  )
                }
                data-testid={`nav-${l.label.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Search */}
          <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-md ml-auto" data-testid="header-search-form">
            <div className="relative w-full">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collectibles, artists, sets…"
                className="w-full bg-ink-surface border border-ink-border rounded-lg pl-9 pr-3 py-2 text-sm placeholder-ink-muted/70 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all"
                data-testid="header-search-input"
              />
            </div>
          </form>

          <div className="ml-auto md:ml-0 flex items-center gap-2">
            <Link
              to="/signin"
              className="hidden md:inline-flex text-sm text-ink-muted hover:text-ink-text px-3 py-1.5 rounded-md transition-colors"
              data-testid="signin-link"
            >
              Sign in
            </Link>
            <Button as={Link} to="/appraise" size="md" className="hidden md:inline-flex" data-testid="cta-appraise">
              Appraise an item
            </Button>
            <button
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:text-ink-text hover:bg-white/[0.04] transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              data-testid="mobile-menu-toggle"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden py-4 border-t border-ink-border animate-fade-in" data-testid="mobile-menu">
            <form onSubmit={onSearch} className="md:hidden mb-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search collectibles…"
                  className="w-full bg-ink-surface border border-ink-border rounded-lg pl-9 pr-3 py-2 text-sm placeholder-ink-muted/70 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>
            </form>
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2.5 text-sm rounded-md',
                      isActive ? 'text-ink-text bg-white/[0.04]' : 'text-ink-muted',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-ink-muted flex items-center gap-2"
              >
                <User size={14} /> Seller Dashboard
              </Link>
              <div className="pt-3 mt-2 border-t border-ink-border flex gap-2">
                <Button as={Link} to="/signin" variant="secondary" size="md" className="flex-1" onClick={() => setOpen(false)}>
                  Sign in
                </Button>
                <Button as={Link} to="/appraise" size="md" className="flex-1" onClick={() => setOpen(false)}>
                  Appraise
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
