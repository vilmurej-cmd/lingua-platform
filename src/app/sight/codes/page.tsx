'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Send, Loader2, CheckCircle, HelpCircle } from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';
import CipherWorkshop from '@/components/CipherWorkshop';

interface HistoricalCode {
  title: string;
  era: string;
  description: string;
  status: 'solved' | 'unsolved';
  color: string;
}

const historicalCodes: HistoricalCode[] = [
  {
    title: 'The Rosetta Stone',
    era: '196 BCE',
    description:
      'A granodiorite stele inscribed with a decree in three scripts: Egyptian hieroglyphs, Demotic, and Ancient Greek. Its discovery in 1799 during Napoleon\'s Egyptian campaign provided the key to deciphering hieroglyphs — unlocking 3,000 years of Egyptian history.',
    status: 'solved',
    color: '#10B981',
  },
  {
    title: 'The Enigma Machine',
    era: '1918-1945',
    description:
      'The German electromechanical cipher machine that produced seemingly unbreakable encrypted messages during World War II. Cracked by Polish mathematicians and later by Alan Turing\'s team at Bletchley Park, the breakthrough shortened the war by an estimated two years and saved millions of lives.',
    status: 'solved',
    color: '#3B82F6',
  },
  {
    title: 'The Beale Ciphers',
    era: 'c. 1820',
    description:
      'Three ciphertexts allegedly revealing the location of a treasure buried in Bedford County, Virginia. Only the second cipher has been solved (keyed to the Declaration of Independence), describing gold, silver, and jewels worth millions. The other two remain unbroken — if genuine.',
    status: 'unsolved',
    color: '#F59E0B',
  },
  {
    title: 'The Zodiac Cipher (Z340)',
    era: '1969',
    description:
      'Sent by the Zodiac Killer to the San Francisco Chronicle, the Z340 cipher resisted all attempts at decryption for 51 years. In 2020, a team of codebreakers finally cracked it, revealing a taunting message. The Z13 cipher (the killer\'s name) remains unsolved.',
    status: 'solved',
    color: '#FB7185',
  },
  {
    title: 'Navajo Code Talkers',
    era: '1942-1945',
    description:
      'The US Marine Corps recruited Navajo speakers to transmit tactical messages in the Pacific Theater. The Navajo language — unwritten, with no common linguistic relatives, and spoken by fewer than 30 non-Navajo — proved an unbreakable code. Japan never cracked it.',
    status: 'solved',
    color: '#8B5CF6',
  },
  {
    title: 'The Dorabella Cipher',
    era: '1897',
    description:
      'A short encrypted message sent by composer Edward Elgar to his friend Dora Penny. Written in 87 characters of an unknown cipher alphabet, it has never been solved. Elgar — who had a lifelong passion for cryptography — took the solution to his grave.',
    status: 'unsolved',
    color: '#F97316',
  },
];

export default function CodesPage() {
  const [analysisInput, setAnalysisInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!analysisInput.trim()) return;
    setLoading(true);
    setAnalysisResult('');
    try {
      const res = await fetch('/api/sight/codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: analysisInput }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setAnalysisResult(
        typeof data === 'string'
          ? data
          : data.analysis || data.result || JSON.stringify(data, null, 2),
      );
    } catch {
      setAnalysisResult('The cipher analysis service is currently unavailable. Please try again later.');
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
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-rose mb-4">
            Code Breaker
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
            Codes That Changed{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">the World</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            From the Rosetta Stone to the Enigma machine, the history of codes and
            ciphers is the history of power, secrecy, and the relentless human drive
            to both conceal and reveal.
          </p>
        </div>
      </section>

      {/* Historical Codes */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary text-center mb-10">
            Historical Exhibits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalCodes.map((code) => {
              const StatusIcon = code.status === 'solved' ? CheckCircle : HelpCircle;
              return (
                <div
                  key={code.title}
                  className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="h-1 w-12 rounded-full"
                      style={{ backgroundColor: code.color }}
                    />
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: code.status === 'solved' ? '#10B98115' : '#F59E0B15',
                        color: code.status === 'solved' ? '#10B981' : '#F59E0B',
                      }}
                    >
                      <StatusIcon size={12} />
                      {code.status === 'solved' ? 'Solved' : 'Unsolved'}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-text-primary mb-1">
                    {code.title}
                  </h3>
                  <p className="text-xs text-text-muted mb-3">{code.era}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {code.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cipher Workshop */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-text-primary mb-3">
              Cipher Workshop
            </h2>
            <p className="text-text-secondary text-lg">
              Encrypt and decrypt messages using historical cipher methods.
            </p>
          </div>
          <CipherWorkshop />
        </div>
      </section>

      {/* AI Cipher Analysis */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Lock size={28} className="text-lingua-rose mx-auto mb-3" />
            <h2 className="font-serif text-3xl font-bold text-text-primary mb-3">
              AI Cipher Analysis
            </h2>
            <p className="text-text-secondary">
              Paste encrypted text and let AI attempt to identify the cipher type,
              analyze letter frequencies, and suggest a decryption.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 space-y-4">
            <div>
              <label htmlFor="cipher-input" className="block text-sm font-medium text-text-secondary mb-1.5">
                Encrypted text
              </label>
              <textarea
                id="cipher-input"
                value={analysisInput}
                onChange={(e) => setAnalysisInput(e.target.value)}
                placeholder="Paste encrypted or coded text here..."
                className="w-full h-32 px-4 py-3 text-sm font-mono bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-rose focus:border-transparent"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !analysisInput.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-rose focus-visible:ring-offset-2"
              style={{ background: 'linear-gradient(135deg, #FB7185, #8B5CF6)' }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>

            <AnimatePresence>
              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-lingua-rose/5 border border-lingua-rose/20 rounded-xl p-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-rose/60 mb-2">
                    AI Analysis
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed whitespace-pre-line font-mono">
                    {analysisResult}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
