'use client';

import { useState } from 'react';
import { AlertTriangle, BookOpen } from 'lucide-react';
import type { SacredText } from '@/lib/sacred-texts';

interface SacredTextViewerProps {
  text: SacredText;
}

export default function SacredTextViewer({ text }: SacredTextViewerProps) {
  const [selectedPassage, setSelectedPassage] = useState(0);
  const passage = text.passages[selectedPassage];

  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
      {/* Respect note banner */}
      <div className="bg-lingua-amber/5 border-b border-lingua-amber/20 px-6 py-3 flex items-start gap-3">
        <AlertTriangle size={16} className="text-lingua-amber flex-shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-relaxed">
          {text.respectNote}
        </p>
      </div>

      {/* Header */}
      <div className="px-6 py-5 border-b border-lingua-border-light">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-lingua-violet/10 flex items-center justify-center flex-shrink-0">
            <BookOpen size={20} className="text-lingua-violet" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-text-primary">
              {text.name}
            </h3>
            <p className="text-sm text-text-secondary mt-0.5">
              {text.tradition} &middot; {text.era} &middot; {text.language}
            </p>
          </div>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mt-3">
          {text.description}
        </p>
      </div>

      {/* Passage selector */}
      {text.passages.length > 1 && (
        <div className="px-6 py-3 border-b border-lingua-border-light overflow-x-auto">
          <div className="flex gap-2" role="tablist" aria-label="Passages">
            {text.passages.map((p, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={selectedPassage === i}
                onClick={() => setSelectedPassage(i)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-violet focus-visible:ring-offset-2 ${
                  selectedPassage === i
                    ? 'bg-lingua-violet/10 text-lingua-violet'
                    : 'text-text-secondary hover:bg-gray-50'
                }`}
              >
                {p.title.length > 40 ? p.title.slice(0, 40) + '...' : p.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Side-by-side viewer */}
      {passage && (
        <div className="p-6">
          <h4 className="font-serif text-base font-semibold text-text-primary mb-4">
            {passage.title}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original */}
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-3">
                Original
              </p>
              <p className="font-serif text-lg leading-relaxed text-text-primary">
                {passage.original}
              </p>
            </div>

            {/* Translation */}
            <div className="bg-lingua-blue/5 rounded-xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-blue/60 mb-3">
                Translation
              </p>
              <p className="font-sans text-base leading-relaxed text-text-primary">
                {passage.translation}
              </p>
            </div>
          </div>

          {/* Commentary */}
          <div className="mt-6 bg-lingua-violet/5 rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-violet/60 mb-2">
              Commentary
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {passage.commentary}
            </p>
          </div>
        </div>
      )}

      {/* Significance */}
      <div className="px-6 pb-6">
        <div className="bg-lingua-emerald/5 border border-lingua-emerald/20 rounded-xl p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-emerald/60 mb-2">
            Significance
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {text.significance}
          </p>
        </div>
      </div>
    </div>
  );
}
