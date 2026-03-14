'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Library,
  Languages,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { signLanguages, type SignLanguage } from '@/lib/sign-languages';
import SignCard from '@/components/SignCard';

type TabId = 'learn' | 'dictionary' | 'translator';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'learn', label: 'Learn Signs', icon: <BookOpen size={16} /> },
  { id: 'dictionary', label: 'Sign Dictionary', icon: <Library size={16} /> },
  {
    id: 'translator',
    label: 'Sign Translator',
    icon: <Languages size={16} />,
  },
];

const categories = [
  'All',
  'Greetings',
  'Family',
  'Emotions',
  'Questions',
  'Medical',
  'Emergency',
  'Everyday',
];

const LEARNED_KEY = 'lingua-learned-signs';

function getLearnedSigns(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = localStorage.getItem(LEARNED_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveLearnedSigns(signs: Set<string>) {
  try {
    localStorage.setItem(LEARNED_KEY, JSON.stringify([...signs]));
  } catch {
    // localStorage unavailable
  }
}

export default function SignPage() {
  const [activeTab, setActiveTab] = useState<TabId>('learn');
  const [selectedLang, setSelectedLang] = useState('ASL');
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareLangs, setCompareLangs] = useState<string[]>(['ASL', 'BSL']);
  const [translatorInput, setTranslatorInput] = useState('');
  const [translatorTarget, setTranslatorTarget] = useState('ASL');
  const [translatorResult, setTranslatorResult] = useState<
    { word: string; description: string; handshape: string; movement: string; culturalNote?: string }[] | null
  >(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [learnedSigns, setLearnedSigns] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLearnedSigns(getLearnedSigns());
  }, []);

  const currentSignLang: SignLanguage | undefined = useMemo(
    () => signLanguages.find((sl) => sl.code === selectedLang),
    [selectedLang]
  );

  const filteredVocab = useMemo(() => {
    if (!currentSignLang) return [];
    if (category === 'All') return currentSignLang.vocabulary;
    // Simple keyword filter on word/description for category
    const cat = category.toLowerCase();
    return currentSignLang.vocabulary.filter(
      (s) =>
        s.word.toLowerCase().includes(cat) ||
        s.description.toLowerCase().includes(cat) ||
        (s.culturalNote && s.culturalNote.toLowerCase().includes(cat))
    );
  }, [currentSignLang, category]);

  const dictionaryResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const lang = signLanguages.find((sl) => sl.code === selectedLang);
    if (!lang) return [];
    return lang.vocabulary.filter(
      (s) =>
        s.word.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [searchQuery, selectedLang]);

  const compareResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return compareLangs
      .map((code) => {
        const lang = signLanguages.find((sl) => sl.code === code);
        if (!lang) return null;
        const signs = lang.vocabulary.filter(
          (s) =>
            s.word.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q)
        );
        return { lang, signs };
      })
      .filter(Boolean) as { lang: SignLanguage; signs: typeof dictionaryResults }[];
  }, [searchQuery, compareLangs, dictionaryResults]);

  const toggleLearned = useCallback(
    (signKey: string) => {
      const updated = new Set(learnedSigns);
      if (updated.has(signKey)) {
        updated.delete(signKey);
      } else {
        updated.add(signKey);
      }
      setLearnedSigns(updated);
      saveLearnedSigns(updated);
    },
    [learnedSigns]
  );

  const handleTranslate = useCallback(async () => {
    if (!translatorInput.trim()) return;
    setIsTranslating(true);
    setTranslatorResult(null);

    try {
      const res = await fetch('/api/sign/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: translatorInput,
          targetSignLanguage: translatorTarget,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setTranslatorResult(data.signs || []);
      } else {
        // Fallback: split input into words and match from vocabulary
        const words = translatorInput.split(/\s+/);
        const lang = signLanguages.find((sl) => sl.code === translatorTarget);
        if (lang) {
          const matched = words
            .map((word) =>
              lang.vocabulary.find(
                (v) => v.word.toLowerCase() === word.toLowerCase()
              )
            )
            .filter(Boolean) as typeof lang.vocabulary;
          setTranslatorResult(
            matched.length > 0
              ? matched
              : [
                  {
                    word: translatorInput,
                    description:
                      'Full translation requires the API. Individual word lookup did not find matches.',
                    handshape: 'Fingerspell each letter',
                    movement: 'Spell out using the manual alphabet',
                  },
                ]
          );
        }
      }
    } catch {
      setTranslatorResult([
        {
          word: translatorInput,
          description: 'Translation temporarily unavailable.',
          handshape: 'N/A',
          movement: 'N/A',
        },
      ]);
    } finally {
      setIsTranslating(false);
    }
  }, [translatorInput, translatorTarget]);

  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Sign Language Hub
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Learn, explore, and translate across 300+ sign languages. Because
            communication is a human right.
          </p>
        </div>

        {/* Tab navigation */}
        <div
          role="tablist"
          aria-label="Sign language sections"
          className="flex items-center justify-center gap-1 bg-white border border-lingua-border-light rounded-2xl p-1.5 max-w-lg mx-auto mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                activeTab === tab.id
                  ? 'bg-lingua-teal/10 text-lingua-teal shadow-sm'
                  : 'text-text-muted hover:text-text-primary hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ==================== TAB 1: Learn Signs ==================== */}
        <div
          role="tabpanel"
          id="panel-learn"
          aria-labelledby="tab-learn"
          hidden={activeTab !== 'learn'}
        >
          {activeTab === 'learn' && (
            <div>
              {/* Language selector */}
              <div className="max-w-sm mx-auto mb-6">
                <label
                  htmlFor="learn-lang"
                  className="block text-sm font-medium text-text-secondary mb-1.5"
                >
                  Sign Language
                </label>
                <select
                  id="learn-lang"
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-white border border-lingua-border rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-teal focus:border-transparent"
                >
                  {signLanguages.map((sl) => (
                    <option key={sl.code} value={sl.code}>
                      {sl.name} ({sl.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-teal focus-visible:ring-offset-2 ${
                      category === cat
                        ? 'bg-lingua-teal/10 text-lingua-teal border border-lingua-teal/30'
                        : 'bg-white text-text-muted border border-lingua-border-light hover:border-lingua-teal/30 hover:text-text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="text-center mb-6">
                <p className="text-sm text-text-secondary">
                  You have learned{' '}
                  <strong className="text-lingua-teal">
                    {learnedSigns.size}
                  </strong>{' '}
                  signs
                </p>
              </div>

              {/* Sign cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(filteredVocab.length > 0
                  ? filteredVocab
                  : currentSignLang?.vocabulary || []
                ).map((sign) => {
                  const key = `${selectedLang}-${sign.word}`;
                  const learned = learnedSigns.has(key);
                  return (
                    <div key={key} className="relative">
                      <SignCard
                        word={sign.word}
                        description={sign.description}
                        handshape={sign.handshape}
                        movement={sign.movement}
                        culturalNote={sign.culturalNote}
                      />
                      <button
                        type="button"
                        onClick={() => toggleLearned(key)}
                        className={`absolute top-4 right-4 p-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-teal focus-visible:ring-offset-2 ${
                          learned
                            ? 'bg-lingua-emerald/10 text-lingua-emerald'
                            : 'bg-gray-100 text-text-muted hover:text-lingua-teal'
                        }`}
                        aria-label={
                          learned
                            ? `Mark "${sign.word}" as not learned`
                            : `Mark "${sign.word}" as learned`
                        }
                      >
                        <CheckCircle size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ==================== TAB 2: Sign Dictionary ==================== */}
        <div
          role="tabpanel"
          id="panel-dictionary"
          aria-labelledby="tab-dictionary"
          hidden={activeTab !== 'dictionary'}
        >
          {activeTab === 'dictionary' && (
            <div>
              {/* Search */}
              <div className="max-w-xl mx-auto mb-8">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    placeholder="Search for any word (e.g., Hello, Water, Friend)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 text-sm bg-white border border-lingua-border rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-teal focus:border-transparent"
                    aria-label="Search sign dictionary"
                  />
                </div>
              </div>

              {/* Language select for single lookup */}
              <div className="max-w-sm mx-auto mb-6">
                <label
                  htmlFor="dict-lang"
                  className="block text-sm font-medium text-text-secondary mb-1.5"
                >
                  Search in
                </label>
                <select
                  id="dict-lang"
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-white border border-lingua-border rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-teal focus:border-transparent"
                >
                  {signLanguages.map((sl) => (
                    <option key={sl.code} value={sl.code}>
                      {sl.name} ({sl.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {searchQuery.trim() && (
                  <motion.div
                    key={searchQuery + selectedLang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {dictionaryResults.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                        {dictionaryResults.map((sign) => (
                          <SignCard
                            key={`${selectedLang}-${sign.word}`}
                            word={sign.word}
                            description={sign.description}
                            handshape={sign.handshape}
                            movement={sign.movement}
                            culturalNote={sign.culturalNote}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-text-muted py-8">
                        No signs found for &ldquo;{searchQuery}&rdquo; in{' '}
                        {signLanguages.find((sl) => sl.code === selectedLang)
                          ?.name || selectedLang}
                        .
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Compare feature */}
              {searchQuery.trim() && (
                <div className="mt-8">
                  <h3 className="font-serif text-lg font-semibold text-text-primary mb-4 text-center">
                    Compare Across Sign Languages
                  </h3>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {signLanguages.map((sl) => (
                      <button
                        key={sl.code}
                        type="button"
                        onClick={() => {
                          setCompareLangs((prev) =>
                            prev.includes(sl.code)
                              ? prev.filter((c) => c !== sl.code)
                              : prev.length < 3
                                ? [...prev, sl.code]
                                : prev
                          );
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-teal focus-visible:ring-offset-2 ${
                          compareLangs.includes(sl.code)
                            ? 'bg-lingua-teal/10 text-lingua-teal border border-lingua-teal/30'
                            : 'bg-white text-text-muted border border-lingua-border-light hover:border-lingua-teal/30'
                        }`}
                      >
                        {sl.code}
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-xs text-text-muted mb-6">
                    Select up to 3 sign languages to compare
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {compareResults.map((cr) =>
                      cr.signs.length > 0 ? (
                        <div key={cr.lang.code}>
                          <h4 className="text-sm font-semibold text-text-primary mb-3">
                            {cr.lang.name}
                          </h4>
                          <div className="space-y-4">
                            {cr.signs.map((sign) => (
                              <SignCard
                                key={`${cr.lang.code}-${sign.word}`}
                                word={sign.word}
                                description={sign.description}
                                handshape={sign.handshape}
                                movement={sign.movement}
                                culturalNote={sign.culturalNote}
                              />
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ==================== TAB 3: Sign Translator ==================== */}
        <div
          role="tabpanel"
          id="panel-translator"
          aria-labelledby="tab-translator"
          hidden={activeTab !== 'translator'}
        >
          {activeTab === 'translator' && (
            <div className="max-w-3xl mx-auto">
              {/* Input */}
              <div className="bg-white rounded-2xl border border-lingua-border-light p-6 shadow-sm mb-6">
                <label
                  htmlFor="translator-input"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Text to translate
                </label>
                <textarea
                  id="translator-input"
                  value={translatorInput}
                  onChange={(e) => setTranslatorInput(e.target.value)}
                  placeholder="Type any phrase in any spoken language..."
                  rows={4}
                  className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-teal focus:border-transparent mb-4"
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                  <div className="flex-1 w-full">
                    <label
                      htmlFor="translator-target"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      Target sign language
                    </label>
                    <select
                      id="translator-target"
                      value={translatorTarget}
                      onChange={(e) => setTranslatorTarget(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-lingua-border rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-teal focus:border-transparent"
                    >
                      {signLanguages.map((sl) => (
                        <option key={sl.code} value={sl.code}>
                          {sl.name} ({sl.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleTranslate}
                    disabled={!translatorInput.trim() || isTranslating}
                    className="px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-teal focus-visible:ring-offset-2"
                    style={{
                      background: 'linear-gradient(135deg, #14B8A6, #3B82F6)',
                    }}
                  >
                    {isTranslating ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Translating
                      </span>
                    ) : (
                      'Translate to Sign'
                    )}
                  </button>
                </div>
              </div>

              {/* Note */}
              <div className="bg-lingua-amber/5 border border-lingua-amber/20 rounded-2xl p-5 mb-6">
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong className="text-text-primary">Important:</strong> Sign
                  languages have their own grammar, syntax, and structure. They
                  are not simply a signed version of a spoken language. This
                  translator provides signing instructions, but learning from a
                  Deaf instructor is always recommended.
                </p>
              </div>

              {/* Results */}
              <AnimatePresence>
                {translatorResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-serif text-lg font-semibold text-text-primary mb-4">
                      Step-by-step signing instructions
                    </h3>
                    <div className="space-y-4">
                      {translatorResult.map((sign, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lingua-teal/10 flex items-center justify-center text-sm font-bold text-lingua-teal">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <SignCard
                              word={sign.word}
                              description={sign.description}
                              handshape={sign.handshape}
                              movement={sign.movement}
                              culturalNote={sign.culturalNote}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
