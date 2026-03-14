'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, Search, Globe } from 'lucide-react';
import { languages, searchLanguages, type Language } from '@/lib/languages';

interface LanguageSelectorProps {
  value: string;
  onChange: (code: string) => void;
  label?: string;
  placeholder?: string;
}

const COMMON_CODES = ['en', 'es', 'zh', 'fr', 'de', 'ja', 'ko', 'ar', 'pt', 'hi', 'ru', 'it'];
const RECENT_KEY = 'lingua-recent-languages';
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

export default function LanguageSelector({
  value,
  onChange,
  label,
  placeholder = 'Select language...',
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [recentCodes, setRecentCodes] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useRef(`lang-listbox-${Math.random().toString(36).slice(2, 8)}`).current;

  useEffect(() => {
    setRecentCodes(getRecentLanguages());
  }, []);

  const selectedLang = useMemo(
    () => languages.find((l) => l.code === value),
    [value]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    return searchLanguages(query);
  }, [query]);

  const commonLangs = useMemo(
    () => languages.filter((l) => COMMON_CODES.includes(l.code)),
    []
  );

  const recentLangs = useMemo(
    () =>
      recentCodes
        .map((code) => languages.find((l) => l.code === code))
        .filter(Boolean) as Language[],
    [recentCodes]
  );

  const allSorted = useMemo(
    () => [...languages].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  // Build flat list for keyboard navigation
  const displayList = useMemo(() => {
    if (query.trim()) return filtered;
    const items: Language[] = [];
    const seen = new Set<string>();
    for (const l of recentLangs) {
      if (!seen.has(l.code)) { items.push(l); seen.add(l.code); }
    }
    for (const l of commonLangs) {
      if (!seen.has(l.code)) { items.push(l); seen.add(l.code); }
    }
    for (const l of allSorted) {
      if (!seen.has(l.code)) { items.push(l); seen.add(l.code); }
    }
    return items;
  }, [query, filtered, recentLangs, commonLangs, allSorted]);

  const select = useCallback(
    (code: string) => {
      onChange(code);
      saveRecentLanguage(code);
      setRecentCodes(getRecentLanguages());
      setOpen(false);
      setQuery('');
      setHighlightIndex(-1);
    },
    [onChange]
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
        setHighlightIndex(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightIndex] as HTMLElement | undefined;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, displayList.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < displayList.length) {
          select(displayList[highlightIndex].code);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        setQuery('');
        setHighlightIndex(-1);
        break;
      case 'Home':
        e.preventDefault();
        setHighlightIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightIndex(displayList.length - 1);
        break;
    }
  };

  const renderOption = (lang: Language, index: number) => {
    const isHighlighted = index === highlightIndex;
    const isSelected = lang.code === value;
    return (
      <li
        key={`${lang.code}-${index}`}
        id={`${listboxId}-option-${index}`}
        role="option"
        aria-selected={isSelected}
        className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors ${
          isHighlighted ? 'bg-blue-50' : ''
        } ${isSelected ? 'font-semibold text-lingua-blue' : 'text-text-primary'}`}
        onClick={() => select(lang.code)}
        onMouseEnter={() => setHighlightIndex(index)}
      >
        <span className="flex-1 flex items-center gap-2">
          <span>{lang.name}</span>
          {lang.nativeName !== lang.name && (
            <span className="text-text-muted text-xs">{lang.nativeName}</span>
          )}
        </span>
        {lang.rtl && (
          <span className="text-[10px] font-medium text-lingua-violet bg-lingua-violet/10 px-1.5 py-0.5 rounded">
            RTL
          </span>
        )}
      </li>
    );
  };

  // Build sections for non-search view
  const renderSections = () => {
    if (query.trim()) {
      if (filtered.length === 0) {
        return (
          <li className="px-4 py-6 text-center text-sm text-text-muted" role="presentation">
            No languages found
          </li>
        );
      }
      let idx = 0;
      return filtered.map((l) => renderOption(l, idx++));
    }

    const elements: React.ReactNode[] = [];
    let idx = 0;

    if (recentLangs.length > 0) {
      elements.push(
        <li key="sec-recent" role="presentation" className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Recently Used
        </li>
      );
      for (const l of recentLangs) elements.push(renderOption(l, idx++));
    }

    elements.push(
      <li key="sec-common" role="presentation" className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
        Common
      </li>
    );
    const commonSeen = new Set(recentCodes);
    for (const l of commonLangs) {
      if (!commonSeen.has(l.code)) elements.push(renderOption(l, idx++));
      else idx++;
    }

    elements.push(
      <li key="sec-all" role="presentation" className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
        All Languages A-Z
      </li>
    );
    const allSeen = new Set([...recentCodes, ...COMMON_CODES]);
    for (const l of allSorted) {
      if (!allSeen.has(l.code)) elements.push(renderOption(l, idx++));
      else idx++;
    }

    return elements;
  };

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={
          open && highlightIndex >= 0
            ? `${listboxId}-option-${highlightIndex}`
            : undefined
        }
        className="w-full flex items-center gap-2 px-4 py-3 bg-white border border-lingua-border rounded-xl text-sm text-left transition-all hover:border-lingua-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
        onClick={() => setOpen(!open)}
      >
        <Globe size={16} className="text-text-muted flex-shrink-0" />
        <span className={`flex-1 truncate ${!selectedLang ? 'text-text-muted' : 'text-text-primary'}`}>
          {selectedLang ? `${selectedLang.name} — ${selectedLang.nativeName}` : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-text-muted flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-40 mt-2 w-full bg-white border border-lingua-border rounded-2xl shadow-xl overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-lingua-border-light">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                ref={inputRef}
                type="text"
                role="searchbox"
                aria-label="Search languages"
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-lingua-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                placeholder="Search languages..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlightIndex(-1);
                }}
              />
            </div>
          </div>

          {/* Options */}
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Languages"
            className="max-h-72 overflow-y-auto"
          >
            {renderSections()}
          </ul>
        </div>
      )}
    </div>
  );
}
