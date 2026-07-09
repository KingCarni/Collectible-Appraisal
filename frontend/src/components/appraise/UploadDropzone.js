import React, { useCallback, useRef, useState } from 'react';
import { UploadCloud, X, ImagePlus } from 'lucide-react';
import { cn } from '../../lib/cn';

export function UploadDropzone({ files, onChange, className }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (list) => {
      const arr = Array.from(list || [])
        .filter((f) => f.type.startsWith('image/'))
        .slice(0, 6);
      onChange?.([...(files || []), ...arr].slice(0, 6));
    },
    [files, onChange],
  );

  const removeAt = (i) => {
    const next = files.filter((_, idx) => idx !== i);
    onChange?.(next);
  };

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          'group border-2 border-dashed rounded-xl px-8 py-14 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200',
          dragging
            ? 'border-brand-blue bg-brand-blue/5'
            : 'border-ink-border bg-ink-bg hover:border-ink-muted/60 hover:bg-ink-surface',
        )}
        data-testid="upload-dropzone"
      >
        <div className="h-14 w-14 rounded-full bg-ink-surface border border-ink-border flex items-center justify-center text-ink-muted group-hover:text-ink-text transition-colors mb-5">
          <UploadCloud size={22} strokeWidth={1.5} />
        </div>
        <div className="font-display text-lg tracking-tight text-ink-text">
          Drop photos here, or <span className="text-brand-blue">browse</span>
        </div>
        <p className="text-sm text-ink-muted mt-2 max-w-sm">
          Add up to 6 photos. Well-lit front and back shots produce the most confident valuations.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-ink-muted">
          <span className="px-2 py-1 rounded-full border border-ink-border">JPG</span>
          <span className="px-2 py-1 rounded-full border border-ink-border">PNG</span>
          <span className="px-2 py-1 rounded-full border border-ink-border">HEIC</span>
          <span className="px-2 py-1 rounded-full border border-ink-border">Up to 20 MB</span>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          data-testid="upload-input"
        />
      </div>

      {files && files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-5" data-testid="upload-thumbnails">
          {files.map((file, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-lg overflow-hidden border border-ink-border bg-ink-surface"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove"
                data-testid={`remove-upload-${i}`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {files.length < 6 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border border-dashed border-ink-border flex flex-col items-center justify-center text-ink-muted hover:border-ink-muted hover:text-ink-text transition-colors"
              data-testid="upload-more"
            >
              <ImagePlus size={16} />
              <span className="text-[10px] mt-1 uppercase tracking-widest">Add</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
