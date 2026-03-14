'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, MessageCircle, Users, Lightbulb } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import ConversationBubble from '@/components/ConversationBubble';

interface Message {
  id: string;
  message: string;
  translation: string;
  speaker: 'person1' | 'person2';
  emotionDot?: string;
  culturalNote?: string;
  timestamp: string;
}

interface ConversationResponse {
  translation: string;
  emotionDot?: string;
  culturalNote?: string;
}

type PageState = 'setup' | 'conversation';

export default function ConversationPage() {
  const [pageState, setPageState] = useState<PageState>('setup');

  // Setup state
  const [person1Name, setPerson1Name] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person1Lang, setPerson1Lang] = useState('en');
  const [person2Lang, setPerson2Lang] = useState('es');

  // Conversation state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState<'person1' | 'person2'>('person1');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const idCounter = useRef(0);

  const makeId = () => `conv-${++idCounter.current}`;

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleStartConversation = useCallback(() => {
    if (!person1Name.trim() || !person2Name.trim()) return;
    setPageState('conversation');
  }, [person1Name, person2Name]);

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || isTranslating) return;

    setInputText('');
    setIsTranslating(true);

    const sourceLang = activeSpeaker === 'person1' ? person1Lang : person2Lang;
    const targetLang = activeSpeaker === 'person1' ? person2Lang : person1Lang;
    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    try {
      const res = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang,
          speaker: activeSpeaker,
        }),
      });

      let data: ConversationResponse;
      if (res.ok) {
        data = await res.json();
      } else {
        data = { translation: `[Translation unavailable] ${text}` };
      }

      const newMessage: Message = {
        id: makeId(),
        message: text,
        translation: data.translation,
        speaker: activeSpeaker,
        emotionDot: data.emotionDot,
        culturalNote: data.culturalNote,
        timestamp: now,
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch {
      const fallbackMessage: Message = {
        id: makeId(),
        message: text,
        translation: `[Translation unavailable] ${text}`,
        speaker: activeSpeaker,
        timestamp: now,
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTranslating(false);
      inputRef.current?.focus();
    }
  }, [inputText, isTranslating, activeSpeaker, person1Lang, person2Lang]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEndConversation = useCallback(() => {
    setShowSummary(true);
  }, []);

  const handleReset = useCallback(() => {
    setPageState('setup');
    setMessages([]);
    setShowSummary(false);
    setInputText('');
    setPerson1Name('');
    setPerson2Name('');
    setPerson1Lang('en');
    setPerson2Lang('es');
  }, []);

  const activeName =
    activeSpeaker === 'person1'
      ? person1Name || 'Person 1'
      : person2Name || 'Person 2';

  // ==================== SETUP ====================
  if (pageState === 'setup') {
    return (
      <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-lingua-violet/10 mb-6">
              <Users size={28} className="text-lingua-violet" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Bilingual Conversation
            </h1>
            <p className="text-text-secondary text-lg">
              Two people. Two languages. One seamless conversation.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-lingua-border-light p-8 shadow-sm space-y-8">
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Who is talking?
            </h2>

            {/* Person 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: '#3B82F6' }}
                />
                <label
                  htmlFor="person1-name"
                  className="text-sm font-semibold text-text-primary"
                >
                  Person 1
                </label>
              </div>
              <input
                id="person1-name"
                type="text"
                placeholder="Name (e.g., Maria)"
                value={person1Name}
                onChange={(e) => setPerson1Name(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
              />
              <LanguageSelector
                value={person1Lang}
                onChange={setPerson1Lang}
                label="Speaks"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-lingua-border-light" />
              <MessageCircle size={20} className="text-text-muted" />
              <div className="flex-1 h-px bg-lingua-border-light" />
            </div>

            {/* Person 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: '#14B8A6' }}
                />
                <label
                  htmlFor="person2-name"
                  className="text-sm font-semibold text-text-primary"
                >
                  Person 2
                </label>
              </div>
              <input
                id="person2-name"
                type="text"
                placeholder="Name (e.g., James)"
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
              />
              <LanguageSelector
                value={person2Lang}
                onChange={setPerson2Lang}
                label="Speaks"
              />
            </div>

            {/* Start button */}
            <button
              type="button"
              onClick={handleStartConversation}
              disabled={!person1Name.trim() || !person2Name.trim()}
              className="w-full py-3.5 text-base font-semibold text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              }}
            >
              Start Conversation
            </button>
          </div>

          {/* Tip */}
          <div className="mt-6 flex items-start gap-3 bg-lingua-amber/5 border border-lingua-amber/20 rounded-2xl p-5">
            <Lightbulb
              size={18}
              className="text-lingua-amber flex-shrink-0 mt-0.5"
            />
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Tip:</strong> Hold the phone
              between you, or use two devices. Each person types in their own
              language and instantly sees the translation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SUMMARY ====================
  if (showSummary) {
    return (
      <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Conversation Summary
            </h1>
            <p className="text-text-secondary">
              {person1Name} &amp; {person2Name} &mdash; {messages.length}{' '}
              exchanges
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.speaker === 'person2' ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor:
                        msg.speaker === 'person1' ? '#3B82F6' : '#14B8A6',
                    }}
                  >
                    {msg.speaker === 'person1'
                      ? person1Name.charAt(0).toUpperCase()
                      : person2Name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-text-muted mb-0.5">
                      {msg.speaker === 'person1' ? person1Name : person2Name}
                    </p>
                    <p className="text-sm text-text-primary">{msg.message}</p>
                    <p className="text-xs text-text-muted italic mt-0.5">
                      {msg.translation}
                    </p>
                  </div>
                </div>
              ))}

              {messages.length === 0 && (
                <p className="text-center text-text-muted py-8">
                  No messages were exchanged.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              }}
            >
              Start New Conversation
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== CONVERSATION ====================
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-lingua-border-light bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue"
            aria-label="Go back to setup"
          >
            <ArrowLeft size={18} className="text-text-secondary" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: '#3B82F6' }}
              />
              <span className="text-sm font-semibold text-text-primary">
                {person1Name}
              </span>
              <span className="text-text-muted text-xs">&</span>
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: '#14B8A6' }}
              />
              <span className="text-sm font-semibold text-text-primary">
                {person2Name}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleEndConversation}
          className="px-4 py-2 text-xs font-semibold text-lingua-rose border border-lingua-rose/30 rounded-lg hover:bg-lingua-rose/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-rose focus-visible:ring-offset-2"
        >
          End Conversation
        </button>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 flex flex-col gap-4"
        role="log"
        aria-label="Conversation messages"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-text-muted text-center text-sm max-w-xs">
              Start typing below. Each message will be translated instantly for
              the other person.
            </p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              {/* Speaker label */}
              <span
                className={`text-[11px] font-semibold mb-1 ${
                  msg.speaker === 'person1' ? 'self-start' : 'self-end'
                }`}
                style={{
                  color:
                    msg.speaker === 'person1' ? '#3B82F6' : '#14B8A6',
                }}
              >
                {msg.speaker === 'person1' ? person1Name : person2Name}
              </span>
              <ConversationBubble
                message={msg.message}
                translation={msg.translation}
                speaker={msg.speaker}
                emotionDot={msg.emotionDot}
                culturalNote={msg.culturalNote}
                timestamp={msg.timestamp}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {isTranslating && (
          <div className="flex items-center gap-2 self-center text-text-muted text-sm py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lingua-blue animate-gentle-pulse" />
            Translating...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-lingua-border-light bg-white px-4 sm:px-6 py-4">
        {/* Speaker toggle */}
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => setActiveSpeaker('person1')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
              activeSpeaker === 'person1'
                ? 'bg-lingua-blue/10 text-lingua-blue border border-lingua-blue/30'
                : 'bg-gray-50 text-text-muted border border-lingua-border-light'
            }`}
          >
            Send as {person1Name || 'Person 1'}
          </button>
          <button
            type="button"
            onClick={() => setActiveSpeaker('person2')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-teal focus-visible:ring-offset-2 ${
              activeSpeaker === 'person2'
                ? 'bg-lingua-teal/10 text-lingua-teal border border-lingua-teal/30'
                : 'bg-gray-50 text-text-muted border border-lingua-border-light'
            }`}
          >
            Send as {person2Name || 'Person 2'}
          </button>
        </div>

        {/* Text input + send */}
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Type in ${activeSpeaker === 'person1' ? person1Name + "'s" : person2Name + "'s"} language...`}
            disabled={isTranslating}
            rows={2}
            className="flex-1 px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent disabled:opacity-50"
            aria-label={`Message as ${activeName}`}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputText.trim() || isTranslating}
            className="p-3 rounded-xl text-white transition-all disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            }}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
