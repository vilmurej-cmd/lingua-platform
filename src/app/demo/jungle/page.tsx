'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TreePine,
  Send,
  Loader2,
  Ear,
  Brain,
  BookOpen,
  Zap,
} from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';

interface JungleMessage {
  role: 'user' | 'lingua';
  text: string;
}

interface Analysis {
  phonemes: string[];
  possibleMeanings: { word: string; guess: string; confidence: number }[];
  languageFamilyGuess: string;
  phase: number;
}

const phaseDescriptions = [
  {
    phase: 1,
    name: 'First Contact',
    description: 'You have no words. Only gestures, expressions, and patience. Point at things. Mime actions. Listen carefully to every sound.',
  },
  {
    phase: 2,
    name: 'Sound Mapping',
    description: 'You are beginning to hear patterns. Certain sounds repeat. You think you might know the word for "water" or "yes." Test your theories.',
  },
  {
    phase: 3,
    name: 'Basic Exchange',
    description: 'You can name objects and express simple ideas. The elder seems to understand your attempts. Grammar patterns are emerging.',
  },
  {
    phase: 4,
    name: 'Understanding',
    description: 'A basic vocabulary is forming. You can ask simple questions and understand responses. The elder is teaching you, and you are learning.',
  },
];

export default function JunglePage() {
  const [messages, setMessages] = useState<JungleMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis>({
    phonemes: [],
    possibleMeanings: [],
    languageFamilyGuess: 'Unknown',
    phase: 1,
  });
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentPhase = phaseDescriptions.find((p) => p.phase === analysis.phase) || phaseDescriptions[0];

  async function handleSend() {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/demo/jungle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: userText,
          history: messages.slice(-20),
          currentPhase: analysis.phase,
          discoveredWords: analysis.possibleMeanings,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: 'lingua', text: data.response || data.elderResponse || '...' },
      ]);

      setAnalysis((prev) => ({
        phonemes: data.phonemes || prev.phonemes,
        possibleMeanings: data.discoveredWords || data.possibleMeanings || prev.possibleMeanings,
        languageFamilyGuess: data.languageFamilyGuess || prev.languageFamilyGuess,
        phase: data.phase || prev.phase,
      }));
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'lingua', text: 'The elder watches you quietly, waiting.' },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero / Intro */}
      {!started ? (
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <SpectrumGradient intensity="medium" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <TreePine size={48} className="text-lingua-emerald mx-auto mb-6" />
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
              The Jungle
            </h1>
            <div className="text-text-secondary text-base leading-relaxed space-y-4 text-left bg-white/80 backdrop-blur-sm rounded-2xl border border-lingua-border-light p-8 mb-8">
              <p>
                Deep in the Amazon, your research team encounters an elder from an
                uncontacted community. She speaks a language no outsider has ever
                heard. There are no interpreters, no phrase books, no shared words.
              </p>
              <p>
                You have only your eyes, your ears, your gestures, and LINGUA
                running in analysis mode on your device. LINGUA cannot translate
                what it has never seen — but it can listen, detect patterns, and
                help you build understanding from zero.
              </p>
              <p className="font-medium text-text-primary">
                Your goal: communicate. Discover words. Build a bridge from nothing.
              </p>
            </div>
            <button
              onClick={() => {
                setStarted(true);
                setMessages([
                  {
                    role: 'lingua',
                    text: 'The elder sits cross-legged near a small fire. She looks at you with cautious curiosity. She speaks: "Kah-teh noh-wah meh-suu." She gestures at the fire, then at you. What do you do?',
                  },
                ]);
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-emerald focus-visible:ring-offset-2"
              style={{ background: 'linear-gradient(135deg, #10B981, #14B8A6)' }}
            >
              Begin the Encounter
              <Zap size={18} />
            </button>
          </div>
        </section>
      ) : (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Phase indicator */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                {phaseDescriptions.map((p) => (
                  <div
                    key={p.phase}
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      p.phase <= analysis.phase ? 'bg-lingua-emerald' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-lingua-emerald">
                  Phase {currentPhase.phase}: {currentPhase.name}
                </span>
                <span className="text-xs text-text-muted">{currentPhase.description}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Panel */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
                <div className="p-4 border-b border-lingua-border-light bg-lingua-emerald/5">
                  <h2 className="font-serif text-lg font-bold text-text-primary flex items-center gap-2">
                    <TreePine size={18} className="text-lingua-emerald" />
                    The Encounter
                  </h2>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] ${
                        msg.role === 'user' ? 'ml-auto' : 'mr-auto'
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-5 py-3 ${
                          msg.role === 'user'
                            ? 'bg-lingua-blue/5 border border-lingua-blue/20 rounded-tr-md'
                            : 'bg-gray-50 border border-lingua-border-light rounded-tl-md'
                        }`}
                      >
                        <p className="text-xs font-semibold text-text-muted mb-1">
                          {msg.role === 'user' ? 'You' : 'Scene'}
                        </p>
                        <p className="text-sm text-text-primary leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Loader2 size={14} className="animate-spin" />
                      <span>The elder is responding...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-lingua-border-light">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Describe your action or gesture..."
                      className="flex-1 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-emerald focus:border-transparent"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="px-4 py-3 rounded-xl text-white transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-emerald focus-visible:ring-offset-2"
                      style={{ background: 'linear-gradient(135deg, #10B981, #14B8A6)' }}
                      aria-label="Send"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </div>

              {/* Analysis Panel */}
              <div className="space-y-4">
                {/* Phonemes */}
                <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-5">
                  <h3 className="font-serif text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                    <Ear size={14} className="text-lingua-violet" />
                    Detected Phonemes
                  </h3>
                  {analysis.phonemes.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysis.phonemes.map((p, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-lingua-violet/10 text-lingua-violet"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-text-muted">Listening...</p>
                  )}
                </div>

                {/* Language Family */}
                <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-5">
                  <h3 className="font-serif text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                    <Brain size={14} className="text-lingua-blue" />
                    Language Family Guess
                  </h3>
                  <p className="text-sm text-text-secondary">{analysis.languageFamilyGuess}</p>
                </div>

                {/* Discovered Words */}
                <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-5">
                  <h3 className="font-serif text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                    <BookOpen size={14} className="text-lingua-emerald" />
                    Vocabulary Builder
                  </h3>
                  {analysis.possibleMeanings.length > 0 ? (
                    <div className="space-y-2">
                      {analysis.possibleMeanings.map((w, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm font-semibold text-text-primary">
                              {w.word}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-lingua-emerald/10 text-lingua-emerald">
                              {Math.round(w.confidence * 100)}%
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary mt-0.5">{w.guess}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-text-muted">No words discovered yet. Start interacting!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
