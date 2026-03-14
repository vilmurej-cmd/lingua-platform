'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Globe,
  AlertTriangle,
  X,
  MapPin,
  Users,
  Scroll,
  Send,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import WorldMap from '@/components/WorldMap';
import SpectrumGradient from '@/components/SpectrumGradient';
import { ancientLanguages, type AncientLanguage } from '@/lib/ancient-languages';
import { endangeredLanguages, type EndangeredLanguage } from '@/lib/endangered-languages';

const statusColors: Record<EndangeredLanguage['status'], string> = {
  vulnerable: '#F59E0B',
  endangered: '#F97316',
  critically_endangered: '#FB7185',
  dormant: '#94A3B8',
};

const statusLabels: Record<EndangeredLanguage['status'], string> = {
  vulnerable: 'Vulnerable',
  endangered: 'Endangered',
  critically_endangered: 'Critically Endangered',
  dormant: 'Dormant',
};

const confidenceColors: Record<string, string> = {
  high: '#10B981',
  moderate: '#F59E0B',
  speculative: '#FB7185',
};

export default function AncientPage() {
  const [selectedEndangered, setSelectedEndangered] = useState<EndangeredLanguage | null>(null);
  const [expandedAncient, setExpandedAncient] = useState<string | null>(null);
  const [translateText, setTranslateText] = useState('');
  const [translateLang, setTranslateLang] = useState(ancientLanguages[0].id);
  const [translateResult, setTranslateResult] = useState('');
  const [translating, setTranslating] = useState(false);

  const statusCounts = endangeredLanguages.reduce(
    (acc, lang) => {
      acc[lang.status] = (acc[lang.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const markers = endangeredLanguages.map((lang) => ({
    lat: lang.coordinates.lat,
    lng: lang.coordinates.lng,
    color: statusColors[lang.status],
    label: `${lang.name} (${statusLabels[lang.status]})`,
    onClick: () => setSelectedEndangered(lang),
  }));

  async function handleTranslate() {
    if (!translateText.trim()) return;
    setTranslating(true);
    setTranslateResult('');
    try {
      const res = await fetch('/api/ancient/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: translateText, language: translateLang }),
      });
      if (!res.ok) throw new Error('Translation failed');
      const data = await res.json();
      setTranslateResult(data.translation || data.result || JSON.stringify(data));
    } catch {
      setTranslateResult('Translation service is currently unavailable. Please try again later.');
    } finally {
      setTranslating(false);
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-rose mb-4">
            LINGUA Ancient
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight mb-6">
            Every Language Is a{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">
              Universe of Thought
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            When a language dies, an entire way of seeing the world dies with it.
            LINGUA preserves, resurrects, and celebrates the voices of human history.
          </p>
        </div>
      </section>

      {/* Endangered Languages Map */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Endangered Languages of the World
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Click any marker to learn about a language fighting for survival.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-4 sm:p-6">
            <WorldMap markers={markers} />

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-lingua-border-light">
              {(Object.keys(statusColors) as EndangeredLanguage['status'][]).map((status) => (
                <div key={status} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: statusColors[status] }}
                  />
                  <span>{statusLabels[status]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {(Object.entries(statusCounts) as [EndangeredLanguage['status'], number][]).map(
              ([status, count]) => (
                <div
                  key={status}
                  className="bg-white rounded-xl border border-lingua-border-light p-4 text-center"
                >
                  <p className="text-3xl font-bold font-serif" style={{ color: statusColors[status] }}>
                    {count}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">{statusLabels[status]}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Endangered Language Modal */}
      <AnimatePresence>
        {selectedEndangered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedEndangered(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full text-white mb-2"
                      style={{ backgroundColor: statusColors[selectedEndangered.status] }}
                    >
                      {statusLabels[selectedEndangered.status]}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-text-primary">
                      {selectedEndangered.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedEndangered(null)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin size={14} className="flex-shrink-0" />
                    <span>{selectedEndangered.region}, {selectedEndangered.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Users size={14} className="flex-shrink-0" />
                    <span>Speakers: {selectedEndangered.speakers}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Globe size={14} className="flex-shrink-0" />
                    <span>Family: {selectedEndangered.family}</span>
                  </div>
                </div>

                <div className="mt-4 bg-lingua-amber/5 border border-lingua-amber/20 rounded-xl p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-amber/70 mb-1">
                    What Makes It Unique
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedEndangered.uniqueFeature}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ancient Language Explorer */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Ancient Language Explorer
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Explore the languages that shaped civilization. Click any card to hear its voice across millennia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ancientLanguages.map((lang) => {
              const isExpanded = expandedAncient === lang.id;
              return (
                <div key={lang.id} className="flex flex-col">
                  <button
                    onClick={() => setExpandedAncient(isExpanded ? null : lang.id)}
                    className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 text-left transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-text-primary">
                          {lang.name}
                        </h3>
                        <p className="text-xs text-text-muted mt-0.5">{lang.era}</p>
                      </div>
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${confidenceColors[lang.pronunciationConfidence]}15`,
                          color: confidenceColors[lang.pronunciationConfidence],
                        }}
                      >
                        {lang.pronunciationConfidence}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                      {lang.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-lingua-blue font-medium mt-3">
                      <span>{isExpanded ? 'Hide text' : 'See demo text'}</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border border-t-0 border-lingua-border-light rounded-b-2xl p-6 space-y-4">
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                              Original
                            </p>
                            <p className="font-serif text-base leading-relaxed text-text-primary whitespace-pre-line">
                              {lang.demoText.original}
                            </p>
                          </div>
                          <div className="bg-lingua-blue/5 rounded-xl p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-blue/60 mb-2">
                              Translation
                            </p>
                            <p className="text-sm leading-relaxed text-text-primary whitespace-pre-line">
                              {lang.demoText.translation}
                            </p>
                          </div>
                          <div className="text-xs text-text-muted">
                            <p className="font-medium">{lang.demoText.source}</p>
                            <p className="mt-1 leading-relaxed">{lang.demoText.context}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Translate Ancient Text */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Scroll size={32} className="text-lingua-violet mx-auto mb-3" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Translate Ancient Text
            </h2>
            <p className="text-text-secondary">
              Enter text and select a language to receive an AI-powered translation with historical context.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 space-y-4">
            <div>
              <label htmlFor="translate-lang" className="block text-sm font-medium text-text-secondary mb-1.5">
                Language
              </label>
              <select
                id="translate-lang"
                value={translateLang}
                onChange={(e) => setTranslateLang(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-violet focus:border-transparent"
              >
                {ancientLanguages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name} ({lang.era})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="translate-text" className="block text-sm font-medium text-text-secondary mb-1.5">
                Text to translate
              </label>
              <textarea
                id="translate-text"
                value={translateText}
                onChange={(e) => setTranslateText(e.target.value)}
                placeholder="Enter text in English to translate into the selected ancient language, or paste ancient text to translate into English..."
                className="w-full h-32 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-violet focus:border-transparent"
              />
            </div>

            <button
              onClick={handleTranslate}
              disabled={translating || !translateText.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-violet focus-visible:ring-offset-2"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}
            >
              {translating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {translating ? 'Translating...' : 'Translate'}
            </button>

            {translateResult && (
              <div className="bg-lingua-violet/5 border border-lingua-violet/20 rounded-xl p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-violet/60 mb-2">
                  Result
                </p>
                <p className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
                  {translateResult}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/ancient/resurrect"
            className="group bg-white rounded-2xl border border-lingua-border-light shadow-sm p-8 transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
          >
            <BookOpen size={28} className="text-lingua-violet mb-4" />
            <h3 className="font-serif text-xl font-bold text-text-primary mb-2">
              Resurrect Dead Languages
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Hear pronunciation reconstructions and have conversations in languages that haven&apos;t been spoken for millennia.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-lingua-violet group-hover:gap-2 transition-all">
              Explore <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href="/ancient/preserve"
            className="group bg-white rounded-2xl border border-lingua-border-light shadow-sm p-8 transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
          >
            <AlertTriangle size={28} className="text-lingua-amber mb-4" />
            <h3 className="font-serif text-xl font-bold text-text-primary mb-2">
              Preservation Toolkit
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Tools and resources for communities working to save endangered languages before they are lost forever.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-lingua-amber group-hover:gap-2 transition-all">
              Explore <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* Memorial */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-connect bg-clip-text text-transparent bg-gradient-connect-wide mb-6">
            Languages We&apos;ve Lost
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Every two weeks, a language dies. With it goes a unique way of naming the stars, counting the seasons, understanding love, expressing grief, and making sense of what it means to be human. These were not just collections of words. They were entire worlds.
          </p>
          <p className="text-gray-500 text-sm mt-8">
            We remember them. We honor them. And we fight to save the ones that remain.
          </p>
        </div>
      </section>
    </div>
  );
}
