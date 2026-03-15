'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Globe, Search, X, Check } from 'lucide-react';
import { useLanguage, uiLanguages } from '@/lib/language-context';

const POPULAR_CODES = ['en', 'es', 'zh-CN', 'fr', 'de', 'ja', 'ko', 'ar', 'pt', 'hi', 'ru', 'it'];
const RECENT_KEY = 'lingua-ui-lang-recent';
const MAX_RECENT = 5;

function getRecentLanguages(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentLanguage(code: string) {
  try {
    const recent = getRecentLanguages().filter((c) => c !== code);
    recent.unshift(code);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // localStorage unavailable
  }
}

export default function UniversalLanguageSelector() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentCodes, setRecentCodes] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecentCodes(getRecentLanguages());
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const currentLangObj = useMemo(
    () => uiLanguages.find((l) => l.code === currentLanguage),
    [currentLanguage]
  );

  const popularLangs = useMemo(
    () => uiLanguages.filter((l) => POPULAR_CODES.includes(l.code)),
    []
  );

  const recentLangs = useMemo(
    () =>
      recentCodes
        .map((code) => uiLanguages.find((l) => l.code === code))
        .filter(Boolean) as typeof uiLanguages,
    [recentCodes]
  );

  const allSorted = useMemo(
    () => [...uiLanguages].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return uiLanguages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [query]);

  const selectLanguage = useCallback(
    (code: string) => {
      setLanguage(code);
      saveRecentLanguage(code);
      setRecentCodes(getRecentLanguages());
      setOpen(false);
      setQuery('');
    },
    [setLanguage]
  );

  const renderLangItem = (lang: typeof uiLanguages[0]) => {
    const isActive = lang.code === currentLanguage;
    return (
      <button
        key={lang.code}
        type="button"
        onClick={() => selectLanguage(lang.code)}
        className={`flex items-center gap-3 w-full px-4 py-3 text-sm rounded-xl transition-all ${
          isActive
            ? 'bg-blue-50 text-lingua-blue font-semibold'
            : 'text-text-primary hover:bg-gray-50'
        }`}
      >
        <span className="flex-1 text-left">
          <span>{lang.name}</span>
          {lang.nativeName !== lang.name && (
            <span className="ml-2 text-text-muted text-xs">{lang.nativeName}</span>
          )}
        </span>
        {isActive && <Check size={16} className="text-lingua-blue flex-shrink-0" />}
      </button>
    );
  };

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
        aria-label={`Change language. Current: ${currentLangObj?.name || 'English'}`}
        title="Change UI language"
      >
        <Globe size={18} />
        <span className="hidden sm:inline text-xs font-medium">
          {currentLangObj?.nativeName || 'English'}
        </span>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Select UI language"
        >
          <div
            ref={modalRef}
            className="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
            style={{ maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <div>
                <h2 className="font-serif text-lg font-bold text-text-primary">
                  {t('language.searchLanguages').replace('...', '')}
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  {uiLanguages.length} languages available
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-gray-100 transition-colors"
                aria-label={t('common.close')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 pb-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                  placeholder={t('language.searchLanguages')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Spectrum accent line */}
            <div
              className="h-[2px] mx-6"
              style={{
                background:
                  'linear-gradient(90deg, #3B82F6, #8B5CF6, #FB7185, #F59E0B, #14B8A6, #10B981)',
              }}
            />

            {/* Language list */}
            <div className="overflow-y-auto px-3 py-3" style={{ maxHeight: 'calc(80vh - 180px)' }}>
              {filtered ? (
                // Search results
                filtered.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-text-muted">
                    No languages found
                  </p>
                ) : (
                  <div className="space-y-0.5">
                    {filtered.map(renderLangItem)}
                  </div>
                )
              ) : (
                <>
                  {/* Recently Used */}
                  {recentLangs.length > 0 && (
                    <div className="mb-4">
                      <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                        {t('language.recentlyUsed')}
                      </p>
                      <div className="space-y-0.5">
                        {recentLangs.map(renderLangItem)}
                      </div>
                    </div>
                  )}

                  {/* Popular */}
                  <div className="mb-4">
                    <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                      {t('language.popular')}
                    </p>
                    <div className="space-y-0.5">
                      {popularLangs.map(renderLangItem)}
                    </div>
                  </div>

                  {/* All Languages */}
                  <div>
                    <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                      {t('language.allLanguages')}
                    </p>
                    <div className="space-y-0.5">
                      {allSorted
                        .filter((l) => !POPULAR_CODES.includes(l.code))
                        .map(renderLangItem)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
