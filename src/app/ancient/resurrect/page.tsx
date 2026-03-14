'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  MessageSquare,
  Send,
  Loader2,
  MapPin,
  Clock,
  ChevronDown,
} from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';
import ConversationBubble from '@/components/ConversationBubble';
import { ancientLanguages } from '@/lib/ancient-languages';

type Mode = 'pronunciation' | 'conversation';

interface PronunciationResult {
  ipa: string;
  phoneticGuide: string;
  confidence: 'high' | 'moderate' | 'speculative';
  explanation: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  english: string;
  ancient: string;
}

const timelineLocations = [
  {
    name: 'Jerusalem',
    era: '30 CE',
    languages: ['Aramaic (everyday speech)', 'Hebrew (religious/literary)', 'Greek (trade/administration)', 'Latin (Roman military)'],
    description: 'Walking through the markets of ancient Jerusalem, you would hear Aramaic in the stalls, Hebrew chanted from the Temple, Greek spoken by merchants, and Latin barked by Roman soldiers.',
  },
  {
    name: 'Rome',
    era: '100 CE',
    languages: ['Latin (official)', 'Greek (educated class)', 'Oscan/Umbrian (remnants)', 'Aramaic/Hebrew (Jewish quarter)', 'Egyptian (slaves/traders)'],
    description: 'The streets of imperial Rome were a polyglot symphony. Latin dominated, but Greek was the language of philosophy and medicine. Immigrants brought dozens of languages from every corner of the empire.',
  },
  {
    name: 'Athens',
    era: '400 BCE',
    languages: ['Attic Greek (dominant)', 'Ionic Greek', 'Doric Greek (visitors)', 'Persian (diplomats)', 'Phoenician (traders)'],
    description: 'At the height of Athenian democracy, the agora buzzed with Attic Greek. Playwrights, philosophers, and politicians debated in a language so influential it would shape Western thought for two millennia.',
  },
  {
    name: 'Beijing',
    era: '1400 CE',
    languages: ['Mandarin Chinese (court)', 'Mongolian (legacy)', 'Jurchen/Manchu', 'Tibetan (religious)', 'Arabic/Persian (traders)'],
    description: 'The Forbidden City resonated with court Mandarin, while the surrounding markets echoed with the tongues of traders along the Silk Road.',
  },
  {
    name: 'Tenochtitlan',
    era: '1500 CE',
    languages: ['Nahuatl (dominant)', 'Otomi', 'Mixtec', 'Zapotec', 'Maya (traders)'],
    description: 'The Aztec capital, larger than any European city of its time, hummed with Nahuatl. Tribute-bearers from across Mesoamerica brought a tapestry of indigenous languages to the great marketplace of Tlatelolco.',
  },
];

const confidenceColors: Record<string, string> = {
  high: '#10B981',
  moderate: '#F59E0B',
  speculative: '#FB7185',
};

export default function ResurrectPage() {
  const [mode, setMode] = useState<Mode>('pronunciation');
  const [selectedLang, setSelectedLang] = useState(ancientLanguages[0].id);
  const [selectedEra, setSelectedEra] = useState('classical');

  // Pronunciation state
  const [pronText, setPronText] = useState('');
  const [pronResult, setPronResult] = useState<PronunciationResult | null>(null);
  const [pronLoading, setPronLoading] = useState(false);

  // Conversation state
  const [convMessages, setConvMessages] = useState<ConversationMessage[]>([]);
  const [convInput, setConvInput] = useState('');
  const [convLoading, setConvLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Timeline state
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  const selectedLanguage = ancientLanguages.find((l) => l.id === selectedLang);

  async function handlePronunciation() {
    if (!pronText.trim()) return;
    setPronLoading(true);
    setPronResult(null);
    try {
      const res = await fetch('/api/ancient/resurrect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: pronText, language: selectedLang, mode: 'pronunciation' }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setPronResult({
        ipa: data.ipa || data.pronunciation || '/.../',
        phoneticGuide: data.phoneticGuide || data.guide || 'See IPA transcription',
        confidence: data.confidence || selectedLanguage?.pronunciationConfidence || 'moderate',
        explanation: data.explanation || data.notes || 'Reconstruction based on comparative linguistics and surviving related languages.',
      });
    } catch {
      setPronResult({
        ipa: '/.../',
        phoneticGuide: 'Service unavailable',
        confidence: 'speculative',
        explanation: 'The pronunciation service is currently unavailable. Please try again later.',
      });
    } finally {
      setPronLoading(false);
    }
  }

  async function handleConversation() {
    if (!convInput.trim()) return;
    const userMsg = convInput;
    setConvInput('');
    setConvMessages((prev) => [...prev, { role: 'user', english: userMsg, ancient: '' }]);
    setConvLoading(true);
    try {
      const res = await fetch('/api/ancient/resurrect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: userMsg,
          language: selectedLang,
          era: selectedEra,
          mode: 'conversation',
          history: convMessages.slice(-10),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setConvMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          ancient: data.ancientText || data.response || '...',
          english: data.translation || data.englishText || '...',
        },
      ]);
    } catch {
      setConvMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          ancient: '...',
          english: 'Connection lost. The ancient voices are quiet for now.',
        },
      ]);
    } finally {
      setConvLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-violet mb-4">
            Language Resurrection
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
            Hear the Voices of the{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">Ancient World</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            What did a Sumerian merchant sound like haggling in the markets of Ur?
            How did an Egyptian priest intone prayers at Karnak? Through comparative
            linguistics, phonological reconstruction, and AI, we can begin to
            hear these voices again — imperfectly, humbly, but with growing clarity.
          </p>
        </div>
      </section>

      {/* Mode Tabs + Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Mode selector */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setMode('pronunciation')}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-violet ${
                  mode === 'pronunciation'
                    ? 'bg-white text-lingua-violet shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Volume2 size={16} />
                Pronunciation
              </button>
              <button
                onClick={() => setMode('conversation')}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-violet ${
                  mode === 'conversation'
                    ? 'bg-white text-lingua-violet shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <MessageSquare size={16} />
                Conversation
              </button>
            </div>
          </div>

          {/* Language selector */}
          <div className="mb-6">
            <label htmlFor="resurrect-lang" className="block text-sm font-medium text-text-secondary mb-1.5">
              Ancient Language
            </label>
            <select
              id="resurrect-lang"
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value);
                setConvMessages([]);
                setPronResult(null);
              }}
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-violet focus:border-transparent"
            >
              {ancientLanguages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name} — {lang.era} (Pronunciation confidence: {lang.pronunciationConfidence})
                </option>
              ))}
            </select>
          </div>

          {selectedLanguage && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <span><strong>Script:</strong> {selectedLanguage.script}</span>
              <span><strong>Region:</strong> {selectedLanguage.region}</span>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${confidenceColors[selectedLanguage.pronunciationConfidence]}15`,
                  color: confidenceColors[selectedLanguage.pronunciationConfidence],
                }}
              >
                {selectedLanguage.pronunciationConfidence} confidence
              </span>
            </div>
          )}

          {/* Pronunciation Mode */}
          {mode === 'pronunciation' && (
            <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 space-y-4">
              <div>
                <label htmlFor="pron-text" className="block text-sm font-medium text-text-secondary mb-1.5">
                  Enter or select text
                </label>
                <textarea
                  id="pron-text"
                  value={pronText}
                  onChange={(e) => setPronText(e.target.value)}
                  placeholder={`Enter text in ${selectedLanguage?.name || 'the ancient language'}, or use the demo text below...`}
                  className="w-full h-28 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-violet focus:border-transparent"
                />
                {selectedLanguage && (
                  <button
                    type="button"
                    onClick={() => setPronText(selectedLanguage.demoText.original)}
                    className="mt-2 text-xs text-lingua-violet hover:text-lingua-violet/80 font-medium transition-colors"
                  >
                    Use demo text: &ldquo;{selectedLanguage.demoText.original.slice(0, 50)}...&rdquo;
                  </button>
                )}
              </div>

              <button
                onClick={handlePronunciation}
                disabled={pronLoading || !pronText.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-violet focus-visible:ring-offset-2"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #FB7185)' }}
              >
                {pronLoading ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={16} />}
                {pronLoading ? 'Reconstructing...' : 'Hear It'}
              </button>

              <AnimatePresence>
                {pronResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="space-y-4 pt-4 border-t border-lingua-border-light"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-lingua-violet/5 rounded-xl p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-violet/60 mb-2">
                          IPA Transcription
                        </p>
                        <p className="font-mono text-lg text-text-primary">{pronResult.ipa}</p>
                      </div>
                      <div className="bg-lingua-blue/5 rounded-xl p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-blue/60 mb-2">
                          Phonetic Guide
                        </p>
                        <p className="text-sm text-text-primary leading-relaxed">{pronResult.phoneticGuide}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-text-secondary">Confidence:</span>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: `${confidenceColors[pronResult.confidence]}15`,
                          color: confidenceColors[pronResult.confidence],
                        }}
                      >
                        {pronResult.confidence}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                        Phonological Notes
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">{pronResult.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Conversation Mode */}
          {mode === 'conversation' && (
            <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
              <div className="p-4 border-b border-lingua-border-light">
                <label htmlFor="conv-era" className="block text-xs font-medium text-text-muted mb-1">
                  Era / Context
                </label>
                <select
                  id="conv-era"
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-lingua-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-lingua-violet focus:border-transparent"
                >
                  <option value="classical">Classical Period</option>
                  <option value="early">Early / Archaic Period</option>
                  <option value="late">Late Period / Decline</option>
                  <option value="market">Marketplace / Daily Life</option>
                  <option value="court">Royal Court / Formal</option>
                </select>
              </div>

              {/* Chat area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4 flex flex-col">
                {convMessages.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-text-muted text-sm text-center">
                      Type a message in English. The AI will respond in {selectedLanguage?.name || 'the ancient language'} with a translation.
                    </p>
                  </div>
                )}
                {convMessages.map((msg, i) => (
                  <ConversationBubble
                    key={i}
                    speaker={msg.role === 'user' ? 'person1' : 'person2'}
                    message={msg.role === 'user' ? msg.english : msg.ancient}
                    translation={msg.role === 'user' ? '' : msg.english}
                    timestamp={msg.role === 'assistant' ? selectedLanguage?.name : undefined}
                  />
                ))}
                {convLoading && (
                  <div className="self-end flex items-center gap-2 text-sm text-text-muted">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Composing in {selectedLanguage?.name}...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-lingua-border-light">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleConversation();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={convInput}
                    onChange={(e) => setConvInput(e.target.value)}
                    placeholder="Type in English..."
                    className="flex-1 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-violet focus:border-transparent"
                    disabled={convLoading}
                  />
                  <button
                    type="submit"
                    disabled={convLoading || !convInput.trim()}
                    className="px-4 py-3 rounded-xl text-white transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-violet focus-visible:ring-offset-2"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Audio Walk */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Clock size={28} className="text-lingua-amber mx-auto mb-3" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Timeline Audio Walk
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Imagine standing in these places at these moments in time. What languages would fill the air around you?
            </p>
          </div>

          <div className="space-y-4">
            {timelineLocations.map((loc) => {
              const isExpanded = expandedLocation === loc.name;
              return (
                <div key={loc.name} className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedLocation(isExpanded ? null : loc.name)}
                    className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lingua-blue"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-4">
                      <MapPin size={20} className="text-lingua-amber flex-shrink-0" />
                      <div>
                        <h3 className="font-serif text-lg font-bold text-text-primary">{loc.name}</h3>
                        <p className="text-sm text-text-muted">{loc.era}</p>
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 space-y-4">
                          <p className="text-sm text-text-secondary leading-relaxed">{loc.description}</p>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                              Languages You Would Hear
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {loc.languages.map((lang) => (
                                <span
                                  key={lang}
                                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-lingua-amber/10 text-lingua-amber"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
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
    </div>
  );
}
