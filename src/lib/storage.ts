/**
 * SSR-safe localStorage utilities for LINGUA.
 * All functions check for window existence before accessing localStorage.
 */

const isBrowser = typeof window !== "undefined";

// ----- Generic preference storage -----

/**
 * Save a user preference to localStorage.
 */
export function savePreference(key: string, value: string): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`lingua_pref_${key}`, value);
  } catch {
    // localStorage may be full or disabled
  }
}

/**
 * Get a user preference from localStorage.
 */
export function getPreference(key: string): string | null {
  if (!isBrowser) return null;
  try {
    return localStorage.getItem(`lingua_pref_${key}`);
  } catch {
    return null;
  }
}

/**
 * Remove a user preference.
 */
export function removePreference(key: string): void {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(`lingua_pref_${key}`);
  } catch {
    // ignore
  }
}

// ----- Saved phrases -----

export interface SavedPhrase {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  savedAt: string; // ISO date
  category?: string;
  notes?: string;
}

const PHRASES_KEY = "lingua_saved_phrases";

/**
 * Save phrases array to localStorage.
 */
export function savePhrases(phrases: SavedPhrase[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(PHRASES_KEY, JSON.stringify(phrases));
  } catch {
    // storage full or disabled
  }
}

/**
 * Get all saved phrases from localStorage.
 */
export function getPhrases(): SavedPhrase[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(PHRASES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Add a single phrase and persist.
 */
export function addPhrase(phrase: Omit<SavedPhrase, "id" | "savedAt">): SavedPhrase {
  const newPhrase: SavedPhrase = {
    ...phrase,
    id: `phrase_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
  };
  const existing = getPhrases();
  existing.unshift(newPhrase);
  savePhrases(existing);
  return newPhrase;
}

/**
 * Remove a phrase by ID.
 */
export function removePhrase(id: string): void {
  const existing = getPhrases();
  savePhrases(existing.filter((p) => p.id !== id));
}

// ----- Learning progress -----

export interface LearningProgress {
  language: string;
  level: string;
  lessonsCompleted: number;
  vocabularyLearned: number;
  streakDays: number;
  lastStudied: string; // ISO date
  scores: Record<string, number>; // lesson ID → score
}

const PROGRESS_KEY = "lingua_learning_progress";

/**
 * Save learning progress to localStorage.
 */
export function saveLearningProgress(data: Record<string, LearningProgress>): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch {
    // storage full or disabled
  }
}

/**
 * Get learning progress from localStorage.
 */
export function getLearningProgress(): Record<string, LearningProgress> {
  if (!isBrowser) return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Update progress for a specific language.
 */
export function updateLanguageProgress(
  languageCode: string,
  update: Partial<LearningProgress>
): void {
  const all = getLearningProgress();
  const defaults: LearningProgress = {
    language: languageCode,
    level: "beginner",
    lessonsCompleted: 0,
    vocabularyLearned: 0,
    streakDays: 0,
    lastStudied: new Date().toISOString(),
    scores: {},
  };
  all[languageCode] = {
    ...defaults,
    ...all[languageCode],
    ...update,
  };
  saveLearningProgress(all);
}

// ----- Recent languages -----

const RECENT_KEY = "lingua_recent_languages";
const MAX_RECENT = 10;

/**
 * Add a language to the recent list.
 */
export function addRecentLanguage(code: string): void {
  if (!isBrowser) return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const recent: string[] = raw ? JSON.parse(raw) : [];
    const filtered = recent.filter((c) => c !== code);
    filtered.unshift(code);
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify(filtered.slice(0, MAX_RECENT))
    );
  } catch {
    // ignore
  }
}

/**
 * Get recent languages.
 */
export function getRecentLanguages(): string[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ----- Theme preference -----

/**
 * Get the user's preferred direction (LTR/RTL).
 */
export function getDirection(): "ltr" | "rtl" {
  return (getPreference("direction") as "ltr" | "rtl") || "ltr";
}

/**
 * Set direction preference.
 */
export function setDirection(dir: "ltr" | "rtl"): void {
  savePreference("direction", dir);
}
