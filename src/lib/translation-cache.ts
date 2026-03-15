/**
 * Translation Cache — localStorage with 7-day expiry and 5MB limit.
 * Keys are hashed for compact storage.
 */

const CACHE_PREFIX = 'lingua-tc-';
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_CACHE_SIZE = 5 * 1024 * 1024; // 5MB

/** Simple string hash (djb2). */
function hashString(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

interface CacheEntry {
  value: string;
  timestamp: number;
}

function getCacheKey(text: string, targetLang: string): string {
  return CACHE_PREFIX + hashString(`${targetLang}:${text}`);
}

function getCacheSize(): number {
  if (typeof window === 'undefined') return 0;
  let total = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        total += (localStorage.getItem(key) || '').length;
      }
    }
  } catch {
    // localStorage unavailable
  }
  return total;
}

function evictOldest(): void {
  if (typeof window === 'undefined') return;
  try {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        try {
          const entry: CacheEntry = JSON.parse(localStorage.getItem(key) || '');
          if (entry.timestamp < oldestTime) {
            oldestTime = entry.timestamp;
            oldestKey = key;
          }
        } catch {
          // Corrupt entry — remove it
          if (key) localStorage.removeItem(key);
          return;
        }
      }
    }
    if (oldestKey) localStorage.removeItem(oldestKey);
  } catch {
    // localStorage unavailable
  }
}

export function getCachedTranslation(text: string, targetLang: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const key = getCacheKey(text, targetLang);
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_EXPIRY_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.value;
  } catch {
    return null;
  }
}

export function setCachedTranslation(text: string, targetLang: string, translation: string): void {
  if (typeof window === 'undefined') return;
  try {
    // Evict entries if approaching size limit
    while (getCacheSize() > MAX_CACHE_SIZE * 0.9) {
      evictOldest();
    }

    const key = getCacheKey(text, targetLang);
    const entry: CacheEntry = {
      value: translation,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function clearTranslationCache(): void {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {
    // localStorage unavailable
  }
}
