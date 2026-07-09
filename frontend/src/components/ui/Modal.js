import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

export function Modal({ open, onClose, title, children, size = 'md', className }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      data-testid="modal-backdrop"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          'relative w-full bg-ink-surface border border-ink-border rounded-2xl shadow-2xl animate-soft-scale',
          sizes[size],
          className,
        )}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-ink-border">
            <h3
              id="modal-title"
              className="font-display text-lg tracking-tight"
              data-testid="modal-title"
            >
              {title}
            </h3>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-ink-muted hover:text-ink-text hover:bg-white/[0.04] transition-colors"
                aria-label="Close"
                data-testid="modal-close"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
