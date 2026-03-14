'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Send,
  Loader2,
  Lightbulb,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';
import LanguageSelector from '@/components/LanguageSelector';

const levels = [
  { id: 'beginner', label: 'Beginner', description: 'Simple vocabulary and basic phrases' },
  { id: 'intermediate', label: 'Intermediate', description: 'Conversation-level fluency' },
  { id: 'advanced', label: 'Advanced', description: 'Complex grammar and nuance' },
];

interface ScenarioResult {
  title: string;
  description: string;
  dialogue: { speaker: string; original: string; translation: string }[];
  vocabulary: { word: string; meaning: string; context: string }[];
}

export default function ImmersionPage() {
  const [language, setLanguage] = useState('es');
  const [level, setLevel] = useState('beginner');
  const [motivation, setMotivation] = useState('');
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/learn/immersion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, level, motivation: motivation || undefined }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        title: 'Service Unavailable',
        description: 'The immersion service is currently unavailable. Please try again later.',
        dialogue: [],
        vocabulary: [],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-emerald mb-4">
            Immersion Learning
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
            Learn by{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">Living the Language</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Forget flashcards and fill-in-the-blanks. LINGUA drops you into real
            scenarios — ordering coffee in Tokyo, negotiating a market in Marrakech,
            making friends in Buenos Aires. You learn by doing, in context, the
            way your brain was designed to learn language.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 space-y-5">
            {/* Language */}
            <LanguageSelector
              value={language}
              onChange={setLanguage}
              label="Target Language"
            />

            {/* Level */}
            <div>
              <p className="text-sm font-medium text-text-secondary mb-2">Level</p>
              <div className="grid grid-cols-3 gap-3">
                {levels.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLevel(l.id)}
                    className={`p-3 rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-emerald focus-visible:ring-offset-2 ${
                      level === l.id
                        ? 'bg-lingua-emerald/5 border-lingua-emerald/30 text-lingua-emerald'
                        : 'bg-gray-50 border-lingua-border-light text-text-secondary hover:border-lingua-emerald/20'
                    }`}
                  >
                    <p className="text-sm font-semibold">{l.label}</p>
                    <p className="text-xs mt-0.5 opacity-70">{l.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Motivation (Dream Vocabulary) */}
            <div>
              <label htmlFor="motivation" className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-1.5">
                <Sparkles size={14} className="text-lingua-amber" />
                Dream Vocabulary (optional)
              </label>
              <input
                id="motivation"
                type="text"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Why are you learning? e.g., 'for a trip to Barcelona', 'to read manga', 'to talk to my grandmother'..."
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-emerald focus:border-transparent"
              />
              <p className="text-xs text-text-muted mt-1">
                Tell us your motivation and we will tailor the exact vocabulary you need.
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-emerald focus-visible:ring-offset-2"
              style={{ background: 'linear-gradient(135deg, #10B981, #14B8A6)' }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <GraduationCap size={16} />}
              {loading ? 'Generating Scenario...' : 'Generate Scenario'}
            </button>
          </div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 space-y-6"
              >
                {/* Scenario */}
                <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6">
                  <h3 className="font-serif text-xl font-bold text-text-primary mb-2">
                    {result.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Dialogue */}
                {result.dialogue.length > 0 && (
                  <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6">
                    <h4 className="font-serif text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <BookOpen size={18} className="text-lingua-emerald" />
                      Dialogue
                    </h4>
                    <div className="space-y-4">
                      {result.dialogue.map((line, i) => (
                        <div
                          key={i}
                          className={`rounded-xl p-4 ${
                            i % 2 === 0
                              ? 'bg-lingua-blue/5 border border-lingua-blue/10'
                              : 'bg-lingua-teal/5 border border-lingua-teal/10'
                          }`}
                        >
                          <p className="text-xs font-semibold text-text-muted mb-1">
                            {line.speaker}
                          </p>
                          <p className="font-serif text-base text-text-primary mb-1">
                            {line.original}
                          </p>
                          <p className="text-sm text-text-secondary italic">
                            {line.translation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vocabulary */}
                {result.vocabulary.length > 0 && (
                  <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6">
                    <h4 className="font-serif text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <Lightbulb size={18} className="text-lingua-amber" />
                      Key Vocabulary
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.vocabulary.map((vocab, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4">
                          <p className="font-serif font-semibold text-text-primary">{vocab.word}</p>
                          <p className="text-sm text-lingua-emerald font-medium">{vocab.meaning}</p>
                          <p className="text-xs text-text-muted mt-1">{vocab.context}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
