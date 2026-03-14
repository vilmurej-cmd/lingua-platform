'use client';

import { useState } from 'react';
import { AlertTriangle, ChevronDown, Globe, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MedicalPhrase } from '@/lib/medical-phrases';

interface MedicalPhraseCardProps {
  phrase: MedicalPhrase;
  targetLang: string;
}

export default function MedicalPhraseCard({
  phrase,
  targetLang,
}: MedicalPhraseCardProps) {
  const [noteExpanded, setNoteExpanded] = useState(false);

  const translation = phrase.translations[targetLang];
  const pronunciation = phrase.pronunciationGuide?.[targetLang];

  return (
    <div
      className={`bg-white rounded-2xl border p-6 shadow-sm ${
        phrase.critical
          ? 'border-red-200 ring-1 ring-red-100'
          : 'border-lingua-border-light'
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          {/* Category pill */}
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-text-muted bg-gray-100 px-2.5 py-0.5 rounded-full mb-2">
            {phrase.category}
          </span>

          {/* English phrase */}
          <p className="text-lg font-semibold text-text-primary leading-snug">
            {phrase.english}
          </p>
        </div>

        {/* Critical badge */}
        {phrase.critical && (
          <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full flex-shrink-0">
            <AlertTriangle size={12} />
            Critical
          </span>
        )}
      </div>

      {/* Translation */}
      {translation ? (
        <div className="bg-lingua-blue/5 rounded-xl px-4 py-3 mb-3">
          <p className="text-base text-lingua-blue font-medium">{translation}</p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl px-4 py-3 mb-3">
          <p className="text-sm text-text-muted italic">
            Translation not available for this language
          </p>
        </div>
      )}

      {/* Pronunciation guide */}
      {pronunciation && (
        <div className="flex items-center gap-2 mb-3">
          <Volume2 size={14} className="text-text-muted flex-shrink-0" />
          <p className="text-sm text-text-secondary italic">{pronunciation}</p>
        </div>
      )}

      {/* Cultural note */}
      {phrase.culturalNote && (
        <div className="border-t border-lingua-border-light pt-3">
          <button
            type="button"
            onClick={() => setNoteExpanded(!noteExpanded)}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 rounded"
            aria-expanded={noteExpanded}
          >
            <Globe size={14} />
            <span>Cultural context</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${noteExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {noteExpanded && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm text-text-secondary leading-relaxed mt-2 overflow-hidden"
              >
                {phrase.culturalNote}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
