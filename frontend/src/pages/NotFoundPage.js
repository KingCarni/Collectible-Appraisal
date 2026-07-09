import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center" data-testid="not-found-page">
      <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-3">404</div>
      <h1 className="font-display text-4xl md:text-6xl tracking-tightest">Page not found</h1>
      <p className="text-ink-muted mt-4 max-w-md">
        The page you were looking for does not exist, or has been moved to a private collection.
      </p>
      <Button as={Link} to="/" className="mt-8">
        Return home
      </Button>
    </div>
  );
}
