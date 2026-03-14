'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  caesarEncrypt,
  caesarDecrypt,
  vigenereEncrypt,
  vigenereDecrypt,
  frequencyAnalysis,
  englishFrequency,
} from '@/lib/cipher-tools';

type CipherTab = 'caesar' | 'substitution' | 'vigenere' | 'frequency';

const tabs: { key: CipherTab; label: string }[] = [
  { key: 'caesar', label: 'Caesar Cipher' },
  { key: 'substitution', label: 'Substitution' },
  { key: 'vigenere', label: 'Vigen\u00E8re' },
  { key: 'frequency', label: 'Frequency Analysis' },
];

const explanations: Record<CipherTab, string> = {
  caesar:
    'The Caesar cipher shifts each letter by a fixed number of positions in the alphabet. Named after Julius Caesar, who used it with a shift of 3 to communicate with his generals.',
  substitution:
    'A substitution cipher replaces each letter with a different letter according to a fixed mapping. The key is a rearranged alphabet showing which letter replaces which.',
  vigenere:
    'The Vigen\u00E8re cipher uses a keyword to determine a different shift for each letter, making it much harder to crack than a simple Caesar cipher. It was considered unbreakable for 300 years.',
  frequency:
    'Frequency analysis counts how often each letter appears. In English, "E" is most common (~12.7%), followed by "T" (~9.1%). This technique can break simple substitution ciphers.',
};

export default function CipherWorkshop() {
  const [activeTab, setActiveTab] = useState<CipherTab>('caesar');
  const [input, setInput] = useState('The quick brown fox jumps over the lazy dog');
  const [caesarShift, setCaesarShift] = useState(3);
  const [caesarMode, setCaesarMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [vigenereKey, setVigenereKey] = useState('secret');
  const [vigenereMode, setVigenereMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [subKey] = useState('QWERTYUIOPASDFGHJKLZXCVBNM');

  // Caesar output
  const caesarOutput = useMemo(() => {
    if (!input) return '';
    return caesarMode === 'encrypt'
      ? caesarEncrypt(input, caesarShift)
      : caesarDecrypt(input, caesarShift);
  }, [input, caesarShift, caesarMode]);

  // Substitution output
  const subOutput = useMemo(() => {
    if (!input) return '';
    try {
      const lowerKey = subKey.toLowerCase();
      return input
        .split('')
        .map((char) => {
          if (char >= 'A' && char <= 'Z')
            return lowerKey[char.charCodeAt(0) - 65].toUpperCase();
          if (char >= 'a' && char <= 'z')
            return lowerKey[char.charCodeAt(0) - 97];
          return char;
        })
        .join('');
    } catch {
      return 'Invalid key';
    }
  }, [input, subKey]);

  // Vigenere output
  const vigenereOutput = useMemo(() => {
    if (!input || !vigenereKey) return '';
    try {
      return vigenereMode === 'encrypt'
        ? vigenereEncrypt(input, vigenereKey)
        : vigenereDecrypt(input, vigenereKey);
    } catch {
      return 'Invalid key (must contain at least one letter)';
    }
  }, [input, vigenereKey, vigenereMode]);

  // Frequency analysis
  const freq = useMemo(() => frequencyAnalysis(input), [input]);
  const maxFreq = useMemo(
    () => Math.max(...Object.values(freq), ...Object.values(englishFrequency), 1),
    [freq]
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent, tab: CipherTab) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveTab(tab);
      }
    },
    []
  );

  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Cipher types"
        className="flex border-b border-lingua-border-light overflow-x-auto"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls={`panel-${tab.key}`}
            id={`tab-${tab.key}`}
            tabIndex={activeTab === tab.key ? 0 : -1}
            onClick={() => setActiveTab(tab.key)}
            onKeyDown={(e) => handleTabKeyDown(e, tab.key)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lingua-blue ${
              activeTab === tab.key
                ? 'text-lingua-blue border-b-2 border-lingua-blue bg-lingua-blue/5'
                : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Explanation */}
        <p className="text-sm text-text-secondary leading-relaxed mb-6 bg-gray-50 rounded-xl px-4 py-3">
          {explanations[activeTab]}
        </p>

        {/* Input */}
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Input text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-24 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent mb-4"
          aria-label="Input text for cipher"
        />

        {/* Tab panels */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {/* Caesar */}
          {activeTab === 'caesar' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Shift: {caesarShift}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={caesarShift}
                    onChange={(e) => setCaesarShift(Number(e.target.value))}
                    className="w-full accent-lingua-blue"
                    aria-label={`Caesar shift amount: ${caesarShift}`}
                  />
                </div>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setCaesarMode('encrypt')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue ${
                      caesarMode === 'encrypt'
                        ? 'bg-white text-lingua-blue shadow-sm'
                        : 'text-text-muted'
                    }`}
                  >
                    Encrypt
                  </button>
                  <button
                    type="button"
                    onClick={() => setCaesarMode('decrypt')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue ${
                      caesarMode === 'decrypt'
                        ? 'bg-white text-lingua-blue shadow-sm'
                        : 'text-text-muted'
                    }`}
                  >
                    Decrypt
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Output
                </label>
                <div className="w-full px-4 py-3 text-sm bg-lingua-blue/5 border border-lingua-blue/20 rounded-xl font-mono break-all min-h-[3rem]">
                  {caesarOutput}
                </div>
              </div>
            </div>
          )}

          {/* Substitution */}
          {activeTab === 'substitution' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Key mapping
                </label>
                <div className="grid grid-cols-13 gap-1 text-center text-xs font-mono">
                  {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => (
                    <div key={letter} className="space-y-0.5">
                      <div className="text-text-muted">{letter}</div>
                      <div className="text-lingua-violet font-bold">
                        {subKey[i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Output
                </label>
                <div className="w-full px-4 py-3 text-sm bg-lingua-violet/5 border border-lingua-violet/20 rounded-xl font-mono break-all min-h-[3rem]">
                  {subOutput}
                </div>
              </div>
            </div>
          )}

          {/* Vigenere */}
          {activeTab === 'vigenere' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Keyword
                  </label>
                  <input
                    type="text"
                    value={vigenereKey}
                    onChange={(e) => setVigenereKey(e.target.value)}
                    placeholder="Enter keyword..."
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                    aria-label="Vigenere keyword"
                  />
                </div>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setVigenereMode('encrypt')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue ${
                      vigenereMode === 'encrypt'
                        ? 'bg-white text-lingua-blue shadow-sm'
                        : 'text-text-muted'
                    }`}
                  >
                    Encrypt
                  </button>
                  <button
                    type="button"
                    onClick={() => setVigenereMode('decrypt')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue ${
                      vigenereMode === 'decrypt'
                        ? 'bg-white text-lingua-blue shadow-sm'
                        : 'text-text-muted'
                    }`}
                  >
                    Decrypt
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Output
                </label>
                <div className="w-full px-4 py-3 text-sm bg-lingua-emerald/5 border border-lingua-emerald/20 rounded-xl font-mono break-all min-h-[3rem]">
                  {vigenereOutput}
                </div>
              </div>
            </div>
          )}

          {/* Frequency Analysis */}
          {activeTab === 'frequency' && (
            <div className="space-y-4">
              <p className="text-xs text-text-muted">
                Blue bars = your input text. Gray bars = standard English frequency.
              </p>
              <div className="overflow-x-auto">
                <div className="flex items-end gap-[3px] h-40 min-w-[520px]">
                  {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => {
                    const inputPct = freq[letter] || 0;
                    const engPct = englishFrequency[letter] || 0;
                    return (
                      <div
                        key={letter}
                        className="flex-1 flex flex-col items-center gap-0.5"
                      >
                        <div className="flex items-end gap-[1px] h-28 w-full">
                          {/* Input bar */}
                          <div
                            className="flex-1 bg-lingua-blue rounded-t-sm transition-all"
                            style={{
                              height: `${(inputPct / maxFreq) * 100}%`,
                              minHeight: inputPct > 0 ? '2px' : '0px',
                            }}
                            title={`${letter.toUpperCase()}: ${inputPct.toFixed(1)}%`}
                          />
                          {/* English reference bar */}
                          <div
                            className="flex-1 bg-gray-300 rounded-t-sm"
                            style={{
                              height: `${(engPct / maxFreq) * 100}%`,
                              minHeight: '2px',
                            }}
                            title={`English ${letter.toUpperCase()}: ${engPct.toFixed(1)}%`}
                          />
                        </div>
                        <span className="text-[10px] text-text-muted font-mono">
                          {letter.toUpperCase()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
