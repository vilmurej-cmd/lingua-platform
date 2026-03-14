'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Send, Loader2, Eye, HelpCircle, CheckCircle } from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';
import { scriptsDatabase, getScriptsByStatus, type HistoricalScript } from '@/lib/scripts-database';

const statusColors: Record<HistoricalScript['status'], string> = {
  deciphered: '#10B981',
  partial: '#F59E0B',
  undeciphered: '#FB7185',
};

const statusLabels: Record<HistoricalScript['status'], string> = {
  deciphered: 'Deciphered',
  partial: 'Partially Deciphered',
  undeciphered: 'Undeciphered',
};

const statusIcons: Record<HistoricalScript['status'], typeof CheckCircle> = {
  deciphered: CheckCircle,
  partial: Eye,
  undeciphered: HelpCircle,
};

export default function DecodePage() {
  const [inputText, setInputText] = useState('');
  const [selectedScript, setSelectedScript] = useState('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [expandedScript, setExpandedScript] = useState<string | null>(null);

  const deciphered = getScriptsByStatus('deciphered');
  const partial = getScriptsByStatus('partial');
  const undeciphered = getScriptsByStatus('undeciphered');

  async function handleAnalyze() {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/sight/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, scriptHint: selectedScript || undefined }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setResult(
        typeof data === 'string'
          ? data
          : data.analysis || data.result || JSON.stringify(data, null, 2),
      );
    } catch {
      setResult('The script analysis service is currently unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  function renderGroup(title: string, scripts: HistoricalScript[], status: HistoricalScript['status']) {
    const Icon = statusIcons[status];
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Icon size={18} style={{ color: statusColors[status] }} />
          <h3 className="font-serif text-xl font-bold text-text-primary">{title}</h3>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${statusColors[status]}15`,
              color: statusColors[status],
            }}
          >
            {scripts.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scripts.map((script) => {
            const isExpanded = expandedScript === script.id;
            return (
              <div
                key={script.id}
                className="bg-white rounded-xl border border-lingua-border-light shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedScript(isExpanded ? null : script.id)}
                  className="w-full p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lingua-blue"
                  aria-expanded={isExpanded}
                >
                  <h4 className="font-serif text-base font-bold text-text-primary mb-1">
                    {script.name}
                  </h4>
                  <p className="text-xs text-text-muted mb-2">{script.era} &middot; {script.region}</p>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {script.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-text-muted">
                    <span>{script.symbolCount} symbols</span>
                    <span>{script.corpusSize}</span>
                  </div>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3 border-t border-lingua-border-light pt-4">
                        {script.deciphermentStory && (
                          <div className="bg-lingua-emerald/5 rounded-lg p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-lingua-emerald/60 mb-1">
                              Decipherment Story
                            </p>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {script.deciphermentStory}
                            </p>
                          </div>
                        )}
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
                            What We Know
                          </p>
                          <p className="text-xs text-text-secondary leading-relaxed">{script.knownInfo}</p>
                        </div>
                        {script.unknownInfo && (
                          <div className="bg-lingua-rose/5 rounded-lg p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-lingua-rose/60 mb-1">
                              What Remains Unknown
                            </p>
                            <p className="text-xs text-text-secondary leading-relaxed">{script.unknownInfo}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-blue mb-4">
            Script Decoder
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
            Decode Any{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">Visual Script</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Describe or paste text from a visual script. LINGUA will identify the writing system,
            provide historical context, and attempt translation where possible.
          </p>
        </div>
      </section>

      {/* Decoder Tool */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 space-y-4">
            <div>
              <label htmlFor="decode-text" className="block text-sm font-medium text-text-secondary mb-1.5">
                Describe or paste the text you want decoded
              </label>
              <textarea
                id="decode-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe what you see: symbols, shapes, patterns, or paste transliterated text..."
                className="w-full h-32 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="script-hint" className="block text-sm font-medium text-text-secondary mb-1.5">
                Known script type (optional)
              </label>
              <select
                id="script-hint"
                value={selectedScript}
                onChange={(e) => setSelectedScript(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
              >
                <option value="">Auto-detect</option>
                {scriptsDatabase.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({statusLabels[s.status]})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !inputText.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ScanLine size={16} />}
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-lingua-blue/5 border border-lingua-blue/20 rounded-xl p-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-blue/60 mb-2">
                    Analysis Result
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

      {/* Script Gallery */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Historical Scripts Database
            </h2>
            <p className="text-text-secondary text-lg">
              The writing systems that recorded human civilization.
            </p>
          </div>
          {renderGroup('Deciphered', deciphered, 'deciphered')}
          {renderGroup('Partially Deciphered', partial, 'partial')}
          {renderGroup('Undeciphered', undeciphered, 'undeciphered')}
        </div>
      </section>
    </div>
  );
}
