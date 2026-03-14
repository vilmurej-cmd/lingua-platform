'use client';

import { useState, useCallback } from 'react';
import { ArrowRightLeft, Copy, Share2, Loader2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import EmotionalAnnotation from './EmotionalAnnotation';
import CulturalNote from './CulturalNote';
import IntentNote from './IntentNote';

interface TranslationResult {
  translatedText: string;
  annotations?: { text: string; emotion: string; color: string }[];
  culturalContext?: string;
  culturalImportance?: 'high' | 'medium' | 'low';
  intentNote?: string | null;
  literal?: string;
}

interface TranslationPanelProps {
  onTranslate: (
    text: string,
    sourceLang: string,
    targetLang: string,
    options?: Record<string, unknown>
  ) => void;
  result?: TranslationResult;
  isLoading: boolean;
}

export default function TranslationPanel({
  onTranslate,
  result,
  isLoading,
}: TranslationPanelProps) {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [inputText, setInputText] = useState('');
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showCultural, setShowCultural] = useState(true);
  const [showIntent, setShowIntent] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleSwap = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  }, [sourceLang, targetLang]);

  const handleTranslate = useCallback(() => {
    if (!inputText.trim()) return;
    onTranslate(inputText, sourceLang, targetLang);
  }, [inputText, sourceLang, targetLang, onTranslate]);

  const handleCopy = useCallback(async () => {
    if (!result?.translatedText) return;
    try {
      await navigator.clipboard.writeText(result.translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [result?.translatedText]);

  const handleShare = useCallback(async () => {
    if (!result?.translatedText) return;
    if (navigator.share) {
      try {
        await navigator.share({ text: result.translatedText });
      } catch {
        // share cancelled
      }
    }
  }, [result?.translatedText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-0 items-start">
        {/* Source panel */}
        <div className="bg-white border border-lingua-border rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <LanguageSelector
              value={sourceLang}
              onChange={setSourceLang}
              label="From"
            />
          </div>
          <textarea
            className="w-full h-48 resize-none bg-transparent text-text-primary text-lg leading-relaxed placeholder:text-text-muted focus:outline-none"
            placeholder="Type, speak, or paste anything..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Source text"
          />
          <div className="flex items-center justify-between pt-4 border-t border-lingua-border-light">
            <span className="text-xs text-text-muted">
              {inputText.length} characters
            </span>
            <button
              type="button"
              onClick={handleTranslate}
              disabled={!inputText.trim() || isLoading}
              className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Translating
                </span>
              ) : (
                'Translate'
              )}
            </button>
          </div>
        </div>

        {/* Center bridge + swap */}
        <div className="flex lg:flex-col items-center justify-center gap-2 py-2 lg:px-4">
          <button
            type="button"
            onClick={handleSwap}
            className="p-3 bg-white border border-lingua-border rounded-full shadow-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
            aria-label="Swap languages"
          >
            <ArrowRightLeft size={18} className="text-lingua-blue lg:rotate-90" />
          </button>
          {/* Spectrum bridge line — desktop only */}
          <div
            className="hidden lg:block w-[2px] h-32 rounded-full"
            style={{
              background:
                'linear-gradient(180deg, #3B82F6, #8B5CF6, #FB7185, #F59E0B, #14B8A6)',
            }}
          />
        </div>

        {/* Target panel */}
        <div className="bg-white border border-lingua-border rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <LanguageSelector
              value={targetLang}
              onChange={setTargetLang}
              label="To"
            />
          </div>
          <div
            className="w-full h-48 text-text-primary text-lg leading-relaxed overflow-y-auto"
            aria-live="polite"
            aria-label="Translation output"
            role="region"
          >
            {isLoading ? (
              <div className="flex items-center gap-3 text-text-muted">
                <Loader2 size={20} className="animate-spin" />
                <span>Translating...</span>
              </div>
            ) : result?.translatedText ? (
              <p>{result.translatedText}</p>
            ) : (
              <p className="text-text-muted">Translation will appear here...</p>
            )}
          </div>
          {result?.translatedText && (
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-lingua-border-light">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                aria-label="Copy translation"
              >
                <Copy size={14} />
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                aria-label="Share translation"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Extra context below */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Toggle bar */}
          <div className="flex flex-wrap gap-2">
            {result.annotations && result.annotations.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAnnotations(!showAnnotations)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                  showAnnotations
                    ? 'bg-lingua-blue/10 border-lingua-blue/30 text-lingua-blue'
                    : 'bg-gray-50 border-lingua-border-light text-text-muted'
                }`}
              >
                Emotional Tone
              </button>
            )}
            {result.culturalContext && (
              <button
                type="button"
                onClick={() => setShowCultural(!showCultural)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                  showCultural
                    ? 'bg-lingua-amber/10 border-lingua-amber/30 text-lingua-amber'
                    : 'bg-gray-50 border-lingua-border-light text-text-muted'
                }`}
              >
                Cultural Context
              </button>
            )}
            {result.intentNote && (
              <button
                type="button"
                onClick={() => setShowIntent(!showIntent)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                  showIntent
                    ? 'bg-lingua-violet/10 border-lingua-violet/30 text-lingua-violet'
                    : 'bg-gray-50 border-lingua-border-light text-text-muted'
                }`}
              >
                Intent
              </button>
            )}
          </div>

          {showAnnotations && result.annotations && result.annotations.length > 0 && (
            <EmotionalAnnotation annotations={result.annotations} />
          )}
          {showCultural && result.culturalContext && (
            <CulturalNote
              context={result.culturalContext}
              importance={result.culturalImportance || 'medium'}
            />
          )}
          {showIntent && (
            <IntentNote
              intentNote={result.intentNote ?? null}
              literal={result.literal}
            />
          )}
        </div>
      )}
    </div>
  );
}
