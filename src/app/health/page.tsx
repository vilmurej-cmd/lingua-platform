'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  AlertTriangle,
  Send,
  Loader2,
  Printer,
  Download,
  X,
  Stethoscope,
  MessageCircle,
  Heart,
} from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import MedicalPhraseCard from '@/components/MedicalPhraseCard';
import ConversationBubble from '@/components/ConversationBubble';
import {
  medicalPhrases,
  medicalCategories,
} from '@/lib/medical-phrases';

export default function HealthPage() {
  // Phrase library state
  const [targetLang, setTargetLang] = useState('es');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Medical conversation state
  const [showConversation, setShowConversation] = useState(false);
  const [convPerson1Lang, setConvPerson1Lang] = useState('en');
  const [convPerson2Lang, setConvPerson2Lang] = useState('es');
  const [convMessages, setConvMessages] = useState<
    {
      id: string;
      message: string;
      translation: string;
      speaker: 'person1' | 'person2';
      timestamp: string;
      culturalNote?: string;
    }[]
  >([]);
  const [convInput, setConvInput] = useState('');
  const [convSpeaker, setConvSpeaker] = useState<'person1' | 'person2'>(
    'person1'
  );
  const [isConvLoading, setIsConvLoading] = useState(false);

  // Patient card state
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    patientName: '',
    allergies: '',
    medications: '',
    bloodType: '',
    emergencyContact: '',
    emergencyPhone: '',
    preferredLanguage: 'es',
    medicalConditions: '',
  });
  const [cardGenerated, setCardGenerated] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const convIdCounter = useRef(0);
  const makeId = () => `health-${++convIdCounter.current}`;

  // Auto-scroll conversation
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [convMessages]);

  // Filtered phrases
  const filteredPhrases = useMemo(() => {
    let result = medicalPhrases;

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.english.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.translations[targetLang] &&
            p.translations[targetLang].toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, searchQuery, targetLang]);

  // Conversation send
  const handleConvSend = useCallback(async () => {
    const text = convInput.trim();
    if (!text || isConvLoading) return;

    setConvInput('');
    setIsConvLoading(true);

    const sourceLang =
      convSpeaker === 'person1' ? convPerson1Lang : convPerson2Lang;
    const targetLangConv =
      convSpeaker === 'person1' ? convPerson2Lang : convPerson1Lang;
    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    try {
      const res = await fetch('/api/health/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang: targetLangConv,
          context: 'medical',
        }),
      });

      let translation: string;
      let culturalNote: string | undefined;

      if (res.ok) {
        const data = await res.json();
        translation = data.translation;
        culturalNote = data.culturalNote;

        // Flag ambiguities
        if (data.ambiguity) {
          culturalNote = `AMBIGUITY WARNING: ${data.ambiguity}${culturalNote ? ` | ${culturalNote}` : ''}`;
        }
      } else {
        translation = `[Medical translation unavailable] ${text}`;
      }

      setConvMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          message: text,
          translation,
          speaker: convSpeaker,
          timestamp: now,
          culturalNote,
        },
      ]);
    } catch {
      setConvMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          message: text,
          translation: `[Translation unavailable] ${text}`,
          speaker: convSpeaker,
          timestamp: now,
        },
      ]);
    } finally {
      setIsConvLoading(false);
    }
  }, [
    convInput,
    isConvLoading,
    convSpeaker,
    convPerson1Lang,
    convPerson2Lang,
  ]);

  const handleConvKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleConvSend();
    }
  };

  const handlePrintCard = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-cool">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 mb-6">
            <Stethoscope size={28} className="text-red-500" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            In Healthcare, Mistranslation{' '}
            <span className="text-red-500">Can Be Fatal</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            LINGUA Health provides medical-grade translation purpose-built for
            hospitals, clinics, and emergency rooms. Every phrase is verified,
            every nuance is preserved.
          </p>
        </div>
      </section>

      {/* ==================== MEDICAL PHRASE LIBRARY ==================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              Medical Phrase Library
            </h2>
            <p className="text-text-secondary">
              Critical phrases for healthcare settings, verified by medical
              interpreters.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Language selector */}
            <div className="w-full lg:w-72">
              <LanguageSelector
                value={targetLang}
                onChange={setTargetLang}
                label="Translate to"
              />
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Search phrases
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Search by phrase, category, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-lingua-border rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                  aria-label="Search medical phrases"
                />
              </div>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                activeCategory === 'All'
                  ? 'bg-lingua-blue/10 text-lingua-blue border border-lingua-blue/30'
                  : 'bg-white text-text-muted border border-lingua-border-light hover:border-lingua-blue/20'
              }`}
            >
              All
            </button>
            {medicalCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                  activeCategory === cat
                    ? 'bg-lingua-blue/10 text-lingua-blue border border-lingua-blue/30'
                    : 'bg-white text-text-muted border border-lingua-border-light hover:border-lingua-blue/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-text-muted mb-4">
            Showing {filteredPhrases.length} phrases
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>

          {/* Phrase grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPhrases.map((phrase) => (
              <MedicalPhraseCard
                key={phrase.id}
                phrase={phrase}
                targetLang={targetLang}
              />
            ))}
          </div>

          {filteredPhrases.length === 0 && (
            <p className="text-center text-text-muted py-12">
              No phrases found. Try adjusting your search or category.
            </p>
          )}
        </div>
      </section>

      {/* ==================== MEDICAL CONVERSATION ==================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lingua-orange/10 mb-4">
              <MessageCircle size={22} className="text-lingua-orange" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              Medical Conversation Mode
            </h2>
            <p className="text-text-secondary">
              Real-time bilingual communication for patient-provider
              interactions. Ambiguities are flagged prominently.
            </p>
          </div>

          {!showConversation ? (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowConversation(true)}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-orange focus-visible:ring-offset-2"
                style={{
                  background: 'linear-gradient(135deg, #F97316, #FB7185)',
                }}
              >
                <Stethoscope size={18} />
                Start Medical Conversation
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
              {/* Conversation header */}
              <div className="px-6 py-4 border-b border-lingua-border-light flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-text-muted mb-1">
                      Provider language
                    </p>
                    <LanguageSelector
                      value={convPerson1Lang}
                      onChange={setConvPerson1Lang}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-muted mb-1">
                      Patient language
                    </p>
                    <LanguageSelector
                      value={convPerson2Lang}
                      onChange={setConvPerson2Lang}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowConversation(false);
                    setConvMessages([]);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue"
                  aria-label="Close medical conversation"
                >
                  <X size={18} className="text-text-muted" />
                </button>
              </div>

              {/* Ambiguity warning banner */}
              <div className="px-6 py-2 bg-red-50 border-b border-red-100 flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />
                <p className="text-xs text-red-600">
                  Medical translation is provided as an aid, not a replacement
                  for certified interpreters. Ambiguities will be flagged.
                </p>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="h-80 overflow-y-auto px-6 py-4 flex flex-col gap-4"
                role="log"
                aria-label="Medical conversation"
                aria-live="polite"
              >
                {convMessages.length === 0 && (
                  <p className="text-center text-text-muted py-12 text-sm">
                    Start the conversation. Each message is translated for the
                    other party.
                  </p>
                )}

                {convMessages.map((msg) => (
                  <div key={msg.id}>
                    <span
                      className={`text-[11px] font-semibold block mb-1 ${
                        msg.speaker === 'person1'
                          ? 'text-lingua-blue'
                          : 'text-lingua-teal'
                      }`}
                    >
                      {msg.speaker === 'person1' ? 'Provider' : 'Patient'}
                    </span>
                    <ConversationBubble
                      message={msg.message}
                      translation={msg.translation}
                      speaker={msg.speaker}
                      culturalNote={msg.culturalNote}
                      timestamp={msg.timestamp}
                    />
                  </div>
                ))}

                {isConvLoading && (
                  <div className="flex items-center gap-2 self-center text-text-muted text-sm">
                    <Loader2 size={14} className="animate-spin" />
                    Translating...
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-lingua-border-light">
                <div className="flex items-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setConvSpeaker('person1')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                      convSpeaker === 'person1'
                        ? 'bg-lingua-blue/10 text-lingua-blue border border-lingua-blue/30'
                        : 'bg-gray-50 text-text-muted border border-lingua-border-light'
                    }`}
                  >
                    Provider
                  </button>
                  <button
                    type="button"
                    onClick={() => setConvSpeaker('person2')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-teal focus-visible:ring-offset-2 ${
                      convSpeaker === 'person2'
                        ? 'bg-lingua-teal/10 text-lingua-teal border border-lingua-teal/30'
                        : 'bg-gray-50 text-text-muted border border-lingua-border-light'
                    }`}
                  >
                    Patient
                  </button>
                </div>

                <div className="flex items-end gap-2">
                  <textarea
                    value={convInput}
                    onChange={(e) => setConvInput(e.target.value)}
                    onKeyDown={handleConvKeyDown}
                    placeholder={`Type as ${convSpeaker === 'person1' ? 'provider' : 'patient'}...`}
                    disabled={isConvLoading}
                    rows={2}
                    className="flex-1 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent disabled:opacity-50"
                    aria-label="Medical conversation input"
                  />
                  <button
                    type="button"
                    onClick={handleConvSend}
                    disabled={!convInput.trim() || isConvLoading}
                    className="p-3 rounded-xl text-white transition-all disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                    style={{
                      background: 'linear-gradient(135deg, #F97316, #FB7185)',
                    }}
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================== PATIENT CARDS ==================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lingua-rose/10 mb-4">
              <Heart size={22} className="text-lingua-rose" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              Download Your Emergency Card
            </h2>
            <p className="text-text-secondary">
              Carry your critical medical information in your preferred language.
              Show it to any healthcare provider, anywhere.
            </p>
          </div>

          {!showCardForm && !cardGenerated && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowCardForm(true)}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-rose focus-visible:ring-offset-2"
                style={{
                  background: 'linear-gradient(135deg, #FB7185, #8B5CF6)',
                }}
              >
                <Download size={18} />
                Create Emergency Card
              </button>
            </div>
          )}

          {/* Card Form */}
          <AnimatePresence>
            {showCardForm && !cardGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-lingua-border-light p-8 shadow-sm"
              >
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-6">
                  Your Medical Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="card-name"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="card-name"
                      type="text"
                      value={cardData.patientName}
                      onChange={(e) =>
                        setCardData({ ...cardData, patientName: e.target.value })
                      }
                      placeholder="Your full name"
                      className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="card-blood"
                        className="block text-sm font-medium text-text-secondary mb-1"
                      >
                        Blood Type
                      </label>
                      <select
                        id="card-blood"
                        value={cardData.bloodType}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            bloodType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Preferred Language
                      </label>
                      <LanguageSelector
                        value={cardData.preferredLanguage}
                        onChange={(val) =>
                          setCardData({
                            ...cardData,
                            preferredLanguage: val,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="card-allergies"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Allergies
                    </label>
                    <textarea
                      id="card-allergies"
                      value={cardData.allergies}
                      onChange={(e) =>
                        setCardData({ ...cardData, allergies: e.target.value })
                      }
                      placeholder="List all allergies (medications, food, environmental)..."
                      rows={2}
                      className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="card-medications"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Current Medications
                    </label>
                    <textarea
                      id="card-medications"
                      value={cardData.medications}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          medications: e.target.value,
                        })
                      }
                      placeholder="List current medications and dosages..."
                      rows={2}
                      className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="card-conditions"
                      className="block text-sm font-medium text-text-secondary mb-1"
                    >
                      Medical Conditions
                    </label>
                    <textarea
                      id="card-conditions"
                      value={cardData.medicalConditions}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          medicalConditions: e.target.value,
                        })
                      }
                      placeholder="Diabetes, asthma, heart condition, etc..."
                      rows={2}
                      className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="card-ec-name"
                        className="block text-sm font-medium text-text-secondary mb-1"
                      >
                        Emergency Contact Name
                      </label>
                      <input
                        id="card-ec-name"
                        type="text"
                        value={cardData.emergencyContact}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            emergencyContact: e.target.value,
                          })
                        }
                        placeholder="Contact name"
                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="card-ec-phone"
                        className="block text-sm font-medium text-text-secondary mb-1"
                      >
                        Emergency Contact Phone
                      </label>
                      <input
                        id="card-ec-phone"
                        type="tel"
                        value={cardData.emergencyPhone}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            emergencyPhone: e.target.value,
                          })
                        }
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowCardForm(false)}
                    className="px-6 py-3 text-sm font-medium text-text-secondary border border-lingua-border-light rounded-xl hover:bg-gray-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardGenerated(true)}
                    disabled={!cardData.patientName.trim()}
                    className="flex-1 py-3 text-base font-semibold text-white rounded-xl transition-all disabled:opacity-40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-rose focus-visible:ring-offset-2"
                    style={{
                      background: 'linear-gradient(135deg, #FB7185, #8B5CF6)',
                    }}
                  >
                    Generate Card
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generated Card */}
          <AnimatePresence>
            {cardGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {/* Print-optimized card */}
                <div
                  id="emergency-card"
                  className="bg-white rounded-2xl border-2 border-red-200 p-8 shadow-sm"
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between border-b border-red-100 pb-4 mb-6">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-red-600">
                        EMERGENCY MEDICAL CARD
                      </h3>
                      <p className="text-xs text-text-muted mt-1">
                        Generated by LINGUA Health
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-muted">Preferred Language</p>
                      <p className="text-sm font-semibold text-text-primary">
                        {cardData.preferredLanguage.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Patient info */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-0.5">
                          Patient Name
                        </p>
                        <p className="text-lg font-semibold text-text-primary">
                          {cardData.patientName}
                        </p>
                      </div>
                      {cardData.bloodType && (
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-0.5">
                            Blood Type
                          </p>
                          <p className="text-lg font-bold text-red-600">
                            {cardData.bloodType}
                          </p>
                        </div>
                      )}
                    </div>

                    {cardData.allergies && (
                      <div className="bg-red-50 rounded-xl p-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-red-600 mb-1 flex items-center gap-1">
                          <AlertTriangle size={12} />
                          Allergies
                        </p>
                        <p className="text-sm text-text-primary">
                          {cardData.allergies}
                        </p>
                      </div>
                    )}

                    {cardData.medications && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1">
                          Current Medications
                        </p>
                        <p className="text-sm text-text-primary">
                          {cardData.medications}
                        </p>
                      </div>
                    )}

                    {cardData.medicalConditions && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1">
                          Medical Conditions
                        </p>
                        <p className="text-sm text-text-primary">
                          {cardData.medicalConditions}
                        </p>
                      </div>
                    )}

                    {(cardData.emergencyContact || cardData.emergencyPhone) && (
                      <div className="border-t border-lingua-border-light pt-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1">
                          Emergency Contact
                        </p>
                        <p className="text-sm text-text-primary">
                          {cardData.emergencyContact}
                          {cardData.emergencyPhone &&
                            ` — ${cardData.emergencyPhone}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons (hidden in print) */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6 no-print">
                  <button
                    type="button"
                    onClick={handlePrintCard}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    }}
                  >
                    <Printer size={16} />
                    Print Card
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCardGenerated(false);
                      setShowCardForm(true);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-secondary border border-lingua-border-light rounded-xl hover:bg-gray-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                  >
                    Edit Information
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCardGenerated(false);
                      setShowCardForm(false);
                      setCardData({
                        patientName: '',
                        allergies: '',
                        medications: '',
                        bloodType: '',
                        emergencyContact: '',
                        emergencyPhone: '',
                        preferredLanguage: 'es',
                        medicalConditions: '',
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-muted hover:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                  >
                    Create New Card
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
