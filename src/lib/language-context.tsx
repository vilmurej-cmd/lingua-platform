'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { getCachedTranslation, setCachedTranslation } from './translation-cache';

// Static translation bundles
import en from '@/translations/en.json';
import es from '@/translations/es.json';
import zhCN from '@/translations/zh-CN.json';

// ----- Types -----

type TranslationMap = Record<string, string | Record<string, string>>;

interface LanguageContextValue {
  /** Current UI language code */
  currentLanguage: string;
  /** Set the UI language */
  setLanguage: (code: string) => void;
  /** Whether current language is RTL */
  isRTL: boolean;
  /** Synchronous translate from loaded bundle (returns key path if missing) */
  t: (keyPath: string) => string;
  /** Async translate arbitrary text via API (with cache) */
  translateAsync: (text: string, targetLang?: string) => Promise<string>;
  /** Whether an async translation is in flight */
  translating: boolean;
}

// ----- RTL language codes -----

const RTL_CODES = new Set([
  'ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ug', 'yi',
  'ckb', 'dv', 'khw', 'ks', 'ku-arab',
]);

// ----- Static bundles -----

const staticBundles: Record<string, TranslationMap> = {
  en,
  es,
  'zh-CN': zhCN,
};

// ----- Supported UI languages (75+) -----
// Languages beyond en/es/zh-CN will use the translateAsync API route on demand.

export interface UILanguage {
  code: string;
  name: string;
  nativeName: string;
}

export const uiLanguages: UILanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Espanol' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '\u7b80\u4f53\u4e2d\u6587' },
  { code: 'fr', name: 'French', nativeName: 'Francais' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Portugues' },
  { code: 'ru', name: 'Russian', nativeName: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439' },
  { code: 'ja', name: 'Japanese', nativeName: '\u65e5\u672c\u8a9e' },
  { code: 'ko', name: 'Korean', nativeName: '\ud55c\uad6d\uc5b4' },
  { code: 'ar', name: 'Arabic', nativeName: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' },
  { code: 'hi', name: 'Hindi', nativeName: '\u0939\u093f\u0928\u094d\u0926\u0940' },
  { code: 'bn', name: 'Bengali', nativeName: '\u09ac\u09be\u0982\u09b2\u09be' },
  { code: 'tr', name: 'Turkish', nativeName: 'Turkce' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tieng Viet' },
  { code: 'th', name: 'Thai', nativeName: '\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'uk', name: 'Ukrainian', nativeName: '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'el', name: 'Greek', nativeName: '\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac' },
  { code: 'he', name: 'Hebrew', nativeName: '\u05e2\u05d1\u05e8\u05d9\u05ea' },
  { code: 'fa', name: 'Farsi', nativeName: '\u0641\u0627\u0631\u0633\u06cc' },
  { code: 'ur', name: 'Urdu', nativeName: '\u0627\u0631\u062f\u0648' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'ta', name: 'Tamil', nativeName: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd' },
  { code: 'te', name: 'Telugu', nativeName: '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'cs', name: 'Czech', nativeName: 'Cestina' },
  { code: 'ro', name: 'Romanian', nativeName: 'Romana' },
  { code: 'bg', name: 'Bulgarian', nativeName: '\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'sr', name: 'Serbian', nativeName: '\u0421\u0440\u043f\u0441\u043a\u0438' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovencina' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenscina' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuviu' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviesu' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
  { code: 'ca', name: 'Catalan', nativeName: 'Catala' },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara' },
  { code: 'gl', name: 'Galician', nativeName: 'Galego' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'am', name: 'Amharic', nativeName: '\u12a0\u121b\u122d\u129b' },
  { code: 'my', name: 'Burmese', nativeName: '\u1019\u103c\u1014\u103a\u1019\u102c\u1005\u102c' },
  { code: 'km', name: 'Khmer', nativeName: '\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a' },
  { code: 'lo', name: 'Lao', nativeName: '\u0e9e\u0eb2\u0eaa\u0eb2\u0ea5\u0eb2\u0ea7' },
  { code: 'ne', name: 'Nepali', nativeName: '\u0928\u0947\u092a\u093e\u0932\u0940' },
  { code: 'si', name: 'Sinhala', nativeName: '\u0dc3\u0dd2\u0d82\u0dc4\u0dbd' },
  { code: 'ka', name: 'Georgian', nativeName: '\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8' },
  { code: 'hy', name: 'Armenian', nativeName: '\u0540\u0561\u0575\u0565\u0580\u0565\u0576' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azerbaycan dili' },
  { code: 'kk', name: 'Kazakh', nativeName: '\u049a\u0430\u0437\u0430\u049b \u0442\u0456\u043b\u0456' },
  { code: 'uz', name: 'Uzbek', nativeName: 'O\u02bbzbek' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yoruba' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa' },
  { code: 'pa', name: 'Punjabi', nativeName: '\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40' },
  { code: 'gu', name: 'Gujarati', nativeName: '\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0' },
  { code: 'mr', name: 'Marathi', nativeName: '\u092e\u0930\u093e\u0920\u0940' },
  { code: 'kn', name: 'Kannada', nativeName: '\u0c95\u0ca8\u0ccd\u0ca8\u0ca1' },
  { code: 'ml', name: 'Malayalam', nativeName: '\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02' },
  { code: 'or', name: 'Odia', nativeName: '\u0b13\u0b21\u0b3c\u0b3f\u0b06' },
  { code: 'mn', name: 'Mongolian', nativeName: '\u041c\u043e\u043d\u0433\u043e\u043b' },
  { code: 'ps', name: 'Pashto', nativeName: '\u067e\u069a\u062a\u0648' },
  { code: 'sd', name: 'Sindhi', nativeName: '\u0633\u0646\u068c\u064a' },
  { code: 'ug', name: 'Uyghur', nativeName: '\u0626\u06c7\u064a\u063a\u06c7\u0631\u0686\u06d5' },
  { code: 'yi', name: 'Yiddish', nativeName: '\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge' },
  { code: 'is', name: 'Icelandic', nativeName: 'Islenska' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti' },
];

// ----- Persistence -----

const LANG_STORAGE_KEY = 'lingua-ui-lang';

function getStoredLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  try {
    return localStorage.getItem(LANG_STORAGE_KEY) || 'en';
  } catch {
    return 'en';
  }
}

function storeLanguage(code: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, code);
  } catch {
    // localStorage unavailable
  }
}

// ----- Context -----

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

// ----- Dynamic translation cache in memory -----

// For languages without a static bundle, we fetch translations on demand
// and cache them in memory (also persisted via translation-cache.ts).
const dynamicBundles: Record<string, TranslationMap> = {};

// ----- Provider -----

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translating, setTranslating] = useState(false);
  const [, setForceUpdate] = useState(0);

  // Load stored language on mount
  useEffect(() => {
    const stored = getStoredLanguage();
    if (stored !== 'en') {
      setCurrentLanguage(stored);
    }
  }, []);

  // Update document direction for RTL
  const isRTL = RTL_CODES.has(currentLanguage);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    if (isRTL) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [currentLanguage, isRTL]);

  const setLanguage = useCallback((code: string) => {
    setCurrentLanguage(code);
    storeLanguage(code);
  }, []);

  // Synchronous translation from loaded bundles
  const t = useCallback(
    (keyPath: string): string => {
      // Try current language bundle
      const bundle = staticBundles[currentLanguage] || dynamicBundles[currentLanguage];
      if (bundle) {
        const val = resolveKeyPath(bundle, keyPath);
        if (val) return val;
      }

      // Fallback to English
      const enBundle = staticBundles['en'];
      if (enBundle) {
        const val = resolveKeyPath(enBundle, keyPath);
        if (val) return val;
      }

      // Return the key path itself
      return keyPath;
    },
    [currentLanguage]
  );

  // Async translation via API
  const translateAsync = useCallback(
    async (text: string, targetLang?: string): Promise<string> => {
      const lang = targetLang || currentLanguage;
      if (lang === 'en') return text;

      // Check cache first
      const cached = getCachedTranslation(text, lang);
      if (cached) return cached;

      setTranslating(true);
      try {
        const res = await fetch('/api/translate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLanguage: lang }),
        });

        if (!res.ok) return text;

        const data = await res.json();
        const translation = data.translation || text;

        // Cache the result
        setCachedTranslation(text, lang, translation);

        return translation;
      } catch {
        return text;
      } finally {
        setTranslating(false);
      }
    },
    [currentLanguage]
  );

  // When language changes to one without a static bundle, translate the English bundle
  useEffect(() => {
    if (currentLanguage === 'en') return;
    if (staticBundles[currentLanguage]) return;
    if (dynamicBundles[currentLanguage]) return;

    // Translate the entire English bundle
    let cancelled = false;
    const translateBundle = async () => {
      setTranslating(true);
      try {
        const enBundle = staticBundles['en'];
        const translated: TranslationMap = {};

        for (const [section, values] of Object.entries(enBundle)) {
          if (typeof values === 'string') {
            translated[section] = await translateSingle(values, currentLanguage);
          } else {
            const sectionMap: Record<string, string> = {};
            for (const [key, val] of Object.entries(values)) {
              if (cancelled) return;
              sectionMap[key] = await translateSingle(val, currentLanguage);
            }
            translated[section] = sectionMap;
          }
        }

        if (!cancelled) {
          dynamicBundles[currentLanguage] = translated;
          setForceUpdate((n) => n + 1);
        }
      } finally {
        if (!cancelled) setTranslating(false);
      }
    };

    translateBundle();
    return () => { cancelled = true; };
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, isRTL, t, translateAsync, translating }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ----- Helpers -----

function resolveKeyPath(bundle: TranslationMap, keyPath: string): string | null {
  const parts = keyPath.split('.');
  if (parts.length === 1) {
    const val = bundle[parts[0]];
    return typeof val === 'string' ? val : null;
  }
  if (parts.length === 2) {
    const section = bundle[parts[0]];
    if (typeof section === 'object' && section !== null) {
      const val = section[parts[1]];
      return typeof val === 'string' ? val : null;
    }
  }
  return null;
}

async function translateSingle(text: string, targetLang: string): Promise<string> {
  const cached = getCachedTranslation(text, targetLang);
  if (cached) return cached;

  try {
    const res = await fetch('/api/translate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLanguage: targetLang }),
    });
    if (!res.ok) return text;
    const data = await res.json();
    const translation = data.translation || text;
    setCachedTranslation(text, targetLang, translation);
    return translation;
  } catch {
    return text;
  }
}
