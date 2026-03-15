'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark,
  Send,
  Loader2,
  Coins,
  Building2,
  GraduationCap,
  Skull,
  FlaskConical,
  Pen,
  Amphora,
} from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';

const useCases = [
  {
    icon: Amphora,
    name: 'Museum Artifacts',
    description: 'Cuneiform tablets, Greek pottery, Egyptian cartouches — understand what ancient objects actually say.',
    color: '#F59E0B',
  },
  {
    icon: Landmark,
    name: 'Monuments & Memorials',
    description: 'Latin inscriptions on government buildings, war memorials in foreign languages, UNESCO heritage sites.',
    color: '#3B82F6',
  },
  {
    icon: Skull,
    name: 'Gravestones',
    description: 'Old cemetery headstones in Hebrew, Latin, Gaelic, or other languages — uncover family history.',
    color: '#8B5CF6',
  },
  {
    icon: Coins,
    name: 'Coins & Currency',
    description: 'Ancient and foreign coins with inscriptions in Greek, Arabic, Chinese, or obscure mints.',
    color: '#10B981',
  },
  {
    icon: FlaskConical,
    name: 'Pottery & Ceramics',
    description: 'Maker\'s marks, dedication inscriptions, and ownership stamps on archaeological pottery.',
    color: '#FB7185',
  },
  {
    icon: Pen,
    name: 'Tattoos',
    description: 'Verify what a foreign-language tattoo actually says — before or after getting it.',
    color: '#14B8A6',
  },
  {
    icon: Building2,
    name: 'Building Facades',
    description: 'Cornerstones, foundation dates, Latin mottos, and decorative text on historical buildings.',
    color: '#F97316',
  },
  {
    icon: GraduationCap,
    name: 'Academic Research',
    description: 'Photographs of inscriptions from excavations, fieldwork rubbings, and archival images.',
    color: '#06B6D4',
  },
];

export default function InscriptionsPage() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleIdentify() {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/sight/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: inputText, scriptType: 'inscription' }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setResult(
        typeof data === 'string'
          ? data
          : data.analysis || data.result || JSON.stringify(data, null, 2),
      );
    } catch {
      setResult('The inscription analysis service is currently unavailable. Please try again later.');
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
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-teal mb-4">
            Inscription Reader
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
            Point. Read.{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">Understand.</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Describe an inscription you have found — on a building, monument, coin,
            gravestone, or artifact — and LINGUA will identify the language, translate
            the text, and provide historical context.
          </p>
        </div>
      </section>

      {/* Identifier Tool */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 space-y-4">
            <div>
              <label htmlFor="inscription-text" className="block text-sm font-medium text-text-secondary mb-1.5">
                Describe the inscription
              </label>
              <textarea
                id="inscription-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe what you see: the characters, their shape, where you found the inscription, the material it's written on..."
                className="w-full h-32 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-teal focus:border-transparent"
              />
            </div>

            <button
              onClick={handleIdentify}
              disabled={loading || !inputText.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-teal focus-visible:ring-offset-2"
              style={{ background: 'linear-gradient(135deg, #14B8A6, #3B82F6)' }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {loading ? 'Identifying...' : 'Identify'}
            </button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-lingua-teal/5 border border-lingua-teal/20 rounded-xl p-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-teal/60 mb-2">
                    Analysis
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
                    {result}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Where You&apos;ll Find Inscriptions
            </h2>
            <p className="text-text-secondary text-lg">
              Every inscription tells a story. Here are the places people find them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.name}
                  className="bg-white rounded-xl border border-lingua-border-light p-6 shadow-sm"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${uc.color}10` }}
                  >
                    <Icon size={20} style={{ color: uc.color }} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-text-primary mb-1.5">
                    {uc.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
