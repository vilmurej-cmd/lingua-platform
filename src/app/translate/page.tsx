'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TranslationPanel from '@/components/TranslationPanel';
import EmotionalAnnotation from '@/components/EmotionalAnnotation';
import CulturalNote from '@/components/CulturalNote';
import IntentNote from '@/components/IntentNote';

interface TranslationResult {
  translatedText: string;
  annotations?: { text: string; emotion: string; color: string }[];
  culturalContext?: string;
  culturalImportance?: 'high' | 'medium' | 'low';
  intentNote?: string | null;
  literal?: string;
}

export default function TranslatePage() {
  const [result, setResult] = useState<TranslationResult | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmotional, setShowEmotional] = useState(true);
  const [showCultural, setShowCultural] = useState(true);
  const [showIntent, setShowIntent] = useState(true);

  const handleTranslate = useCallback(
    async (
      text: string,
      sourceLang: string,
      targetLang: string,
      options?: Record<string, unknown>
    ) => {
      setIsLoading(true);
      setResult(undefined);

      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            sourceLang,
            targetLang,
            options: {
              ...options,
              showEmotional,
              showCultural,
              showIntent,
            },
          }),
        });

        if (!res.ok) throw new Error('Translation failed');

        const data: TranslationResult = await res.json();
        setResult(data);
      } catch {
        setResult({
          translatedText:
            'Translation temporarily unavailable. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [showEmotional, showCultural, showIntent]
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Universal Translator
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Type in any language. Get back not just words, but meaning, emotion,
            and cultural context.
          </p>
        </div>

        {/* Translation Panel */}
        <div className="max-w-5xl mx-auto">
          <TranslationPanel
            onTranslate={handleTranslate}
            result={result}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Tagline */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center font-serif text-xl sm:text-2xl text-text-secondary max-w-2xl mx-auto italic">
          LINGUA does not just translate your words. It translates your{' '}
          <span className="bg-gradient-connect bg-clip-text text-transparent font-semibold not-italic">
            meaning
          </span>
          .
        </p>
      </section>

      {/* Toggle Switches */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-lingua-border-light p-6 shadow-sm">
            <h2 className="font-serif text-lg font-semibold text-text-primary mb-4">
              Understanding Layers
            </h2>
            <div className="space-y-4">
              <ToggleSwitch
                label="Emotional fidelity"
                description="See the emotional tone behind each phrase"
                checked={showEmotional}
                onChange={setShowEmotional}
                color="#3B82F6"
              />
              <ToggleSwitch
                label="Cultural context"
                description="Understand cultural significance and nuance"
                checked={showCultural}
                onChange={setShowCultural}
                color="#F59E0B"
              />
              <ToggleSwitch
                label="Intent analysis"
                description="Discover what the speaker truly means"
                checked={showIntent}
                onChange={setShowIntent}
                color="#8B5CF6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Extra Annotations Display (when result and toggles active) */}
      <AnimatePresence>
        {result && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-8 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-3xl mx-auto space-y-4">
              {showEmotional &&
                result.annotations &&
                result.annotations.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wider">
                      Emotional Fidelity
                    </h3>
                    <EmotionalAnnotation annotations={result.annotations} />
                  </div>
                )}

              {showCultural && result.culturalContext && (
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wider">
                    Cultural Context
                  </h3>
                  <CulturalNote
                    context={result.culturalContext}
                    importance={result.culturalImportance || 'medium'}
                  />
                </div>
              )}

              {showIntent && result.intentNote && (
                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wider">
                    Intent Analysis
                  </h3>
                  <IntentNote
                    intentNote={result.intentNote}
                    literal={result.literal}
                  />
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- Toggle Switch Component ---- */

function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  color,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
        style={{
          backgroundColor: checked ? color : '#E2E8F0',
        }}
      >
        <span
          className="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
          style={{
            transform: checked ? 'translateX(22px)' : 'translateX(4px)',
          }}
        />
      </button>
    </div>
  );
}
