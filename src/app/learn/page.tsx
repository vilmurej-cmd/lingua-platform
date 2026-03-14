'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Plane,
  Briefcase,
  Users,
  Sparkles,
  HeartHandshake,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import LearningDashboard from '@/components/LearningDashboard';
import PracticeChat from '@/components/PracticeChat';
import { getLanguage } from '@/lib/languages';

const LEARN_KEY = 'lingua-learn-profile';

interface LearnProfile {
  language: string;
  motivator: string;
  level: string;
  progress: number;
  streak: number;
  todayComplete: boolean;
  lastPractice: string;
}

const motivators = [
  { id: 'family', label: 'Family', icon: <Users size={24} /> },
  { id: 'travel', label: 'Travel', icon: <Plane size={24} /> },
  { id: 'career', label: 'Career', icon: <Briefcase size={24} /> },
  { id: 'community', label: 'Community', icon: <HeartHandshake size={24} /> },
  { id: 'love', label: 'Love of Language', icon: <Sparkles size={24} /> },
  {
    id: 'someone',
    label: 'For Someone I Love',
    icon: <Heart size={24} />,
  },
];

const levels = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'I know little to nothing',
  },
  {
    id: 'some',
    label: 'Some Knowledge',
    description: 'I know some basics',
  },
  {
    id: 'conversational',
    label: 'Conversational',
    description: 'I can hold a conversation',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'I want to master it',
  },
];

function loadProfile(): LearnProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(LEARN_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: LearnProfile) {
  try {
    localStorage.setItem(LEARN_KEY, JSON.stringify(profile));
  } catch {
    // localStorage unavailable
  }
}

export default function LearnPage() {
  const [profile, setProfile] = useState<LearnProfile | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  // Onboarding state
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState('es');
  const [selectedMotivator, setSelectedMotivator] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    const p = loadProfile();
    if (p) {
      // Check streak — if last practice was not yesterday or today, reset streak
      const today = new Date().toDateString();
      const yesterday = new Date(
        Date.now() - 86400000
      ).toDateString();
      if (p.lastPractice !== today && p.lastPractice !== yesterday) {
        p.streak = 0;
      }
      if (p.lastPractice !== today) {
        p.todayComplete = false;
      }
      setProfile(p);
    }
    setLoaded(true);
  }, []);

  const handleFinishOnboarding = useCallback(() => {
    const newProfile: LearnProfile = {
      language: selectedLang,
      motivator: selectedMotivator,
      level: selectedLevel,
      progress: 0,
      streak: 0,
      todayComplete: false,
      lastPractice: '',
    };
    saveProfile(newProfile);
    setProfile(newProfile);
  }, [selectedLang, selectedMotivator, selectedLevel]);

  const handleResetProfile = useCallback(() => {
    localStorage.removeItem(LEARN_KEY);
    setProfile(null);
    setStep(1);
    setSelectedLang('es');
    setSelectedMotivator('');
    setSelectedLevel('');
    setShowPractice(false);
  }, []);

  const handlePracticeSend = useCallback(
    async (message: string) => {
      const res = await fetch('/api/learn/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          targetLanguage: profile?.language || 'es',
          level: profile?.level || 'beginner',
        }),
      });

      if (!res.ok) {
        return {
          response: `Great attempt! Keep practicing your ${getLanguage(profile?.language || 'es')?.name || 'target language'}. Try forming a simple sentence.`,
          correction: undefined,
          encouragement: 'Every word you practice brings you closer to fluency.',
        };
      }

      const data = await res.json();

      // Update profile progress
      if (profile) {
        const today = new Date().toDateString();
        const updated = {
          ...profile,
          progress: Math.min(100, profile.progress + 2),
          lastPractice: today,
          todayComplete: true,
          streak:
            profile.lastPractice === today
              ? profile.streak
              : profile.streak + 1,
        };
        saveProfile(updated);
        setProfile(updated);
      }

      return data;
    },
    [profile]
  );

  const langName =
    getLanguage(profile?.language || selectedLang)?.name || 'your target language';

  // Wait for client-side load
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-gentle-pulse text-text-muted">Loading...</div>
      </div>
    );
  }

  // ==================== ONBOARDING ====================
  if (!profile) {
    return (
      <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Start Learning
            </h1>
            <p className="text-text-secondary text-lg">
              Let us personalize your experience.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-10 h-1.5 rounded-full transition-all ${
                  s <= step ? 'bg-lingua-blue' : 'bg-lingua-border-light'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Language selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-2xl border border-lingua-border-light p-8 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-text-primary mb-6">
                    What language do you want to learn?
                  </h2>
                  <LanguageSelector
                    value={selectedLang}
                    onChange={setSelectedLang}
                  />
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold text-white rounded-xl transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                    style={{
                      background:
                        'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    }}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Motivation */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-2xl border border-lingua-border-light p-8 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">
                    Why do you want to learn {langName}?
                  </h2>
                  <p className="text-sm text-text-muted mb-6">
                    This helps us personalize your experience.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {motivators.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMotivator(m.id)}
                        className={`flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                          selectedMotivator === m.id
                            ? 'bg-lingua-blue/5 border-lingua-blue/30 text-lingua-blue'
                            : 'bg-gray-50 border-lingua-border-light text-text-muted hover:border-lingua-blue/20 hover:text-text-primary'
                        }`}
                      >
                        {m.icon}
                        <span className="text-sm font-medium">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 text-sm font-medium text-text-secondary border border-lingua-border-light rounded-xl hover:bg-gray-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!selectedMotivator}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-base font-semibold text-white rounded-xl transition-all disabled:opacity-40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                      style={{
                        background:
                          'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      }}
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Level */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-2xl border border-lingua-border-light p-8 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">
                    What is your level?
                  </h2>
                  <p className="text-sm text-text-muted mb-6">
                    Be honest — we will meet you where you are.
                  </p>

                  <div className="space-y-3 mb-8">
                    {levels.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setSelectedLevel(l.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                          selectedLevel === l.id
                            ? 'bg-lingua-blue/5 border-lingua-blue/30'
                            : 'bg-gray-50 border-lingua-border-light hover:border-lingua-blue/20'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedLevel === l.id
                              ? 'border-lingua-blue'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedLevel === l.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-lingua-blue" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">
                            {l.label}
                          </p>
                          <p className="text-xs text-text-muted">
                            {l.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 text-sm font-medium text-text-secondary border border-lingua-border-light rounded-xl hover:bg-gray-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleFinishOnboarding}
                      disabled={!selectedLevel}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-base font-semibold text-white rounded-xl transition-all disabled:opacity-40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                      style={{
                        background:
                          'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      }}
                    >
                      Start Learning
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ==================== DASHBOARD ====================
  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-2">
            Learning {langName}
          </h1>
          <p className="text-text-secondary">
            Keep going. Every word brings you closer to connection.
          </p>
        </div>

        {/* Learning Dashboard */}
        <div className="mb-8">
          <LearningDashboard
            language={langName}
            progress={profile.progress}
            streak={profile.streak}
            todayComplete={profile.todayComplete}
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setShowPractice(!showPractice)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            }}
          >
            <Sparkles size={16} />
            {showPractice ? 'Hide Practice' : 'Quick Practice'}
          </button>

          <button
            type="button"
            onClick={handleResetProfile}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-secondary border border-lingua-border-light rounded-xl hover:bg-gray-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
          >
            <RefreshCw size={16} />
            Change Language
          </button>

          <Link
            href="/learn/immersion"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-lingua-violet border border-lingua-violet/30 rounded-xl hover:bg-lingua-violet/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-violet focus-visible:ring-offset-2"
          >
            Immersion Mode
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Practice Chat */}
        <AnimatePresence>
          {showPractice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <PracticeChat
                targetLanguage={langName}
                onSend={handlePracticeSend}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
