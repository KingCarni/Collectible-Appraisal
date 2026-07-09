import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-ink-bg text-ink-text flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
