'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface ChatResponse {
  response: string;
  correction?: string;
  encouragement?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'tutor';
  text: string;
  correction?: string;
  encouragement?: string;
}

interface PracticeChatProps {
  targetLanguage: string;
  onSend: (message: string) => Promise<ChatResponse>;
}

export default function PracticeChat({
  targetLanguage,
  onSend,
}: PracticeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(0);

  const makeId = () => `msg-${++idCounter.current}`;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    const userMsg: ChatMessage = { id: makeId(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const result = await onSend(text);
      const tutorMsg: ChatMessage = {
        id: makeId(),
        role: 'tutor',
        text: result.response,
        correction: result.correction,
        encouragement: result.encouragement,
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: makeId(),
        role: 'tutor',
        text: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm flex flex-col h-[500px]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-lingua-border-light flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-lingua-blue/10 flex items-center justify-center">
          <Sparkles size={16} className="text-lingua-blue" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">
            Language Tutor
          </h3>
          <p className="text-xs text-text-muted">
            Practice {targetLanguage} with me
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
        role="log"
        aria-label="Practice conversation"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-text-muted">
              Start practicing! Try writing something in {targetLanguage}.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-lingua-blue text-white rounded-br-md'
                  : 'bg-gray-50 text-text-primary border border-lingua-border-light rounded-bl-md'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>

              {/* Correction */}
              {msg.correction && (
                <div className="mt-2 pt-2 border-t border-lingua-amber/20">
                  <p className="text-xs font-medium text-lingua-amber mb-0.5">
                    Correction
                  </p>
                  <p className="text-sm text-lingua-amber/90">
                    {msg.correction}
                  </p>
                </div>
              )}

              {/* Encouragement */}
              {msg.encouragement && (
                <p className="mt-2 text-xs text-lingua-emerald font-medium">
                  {msg.encouragement}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-lingua-border-light rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2 text-text-muted">
                <Loader2 size={14} className="animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-lingua-border-light">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Write in ${targetLanguage}...`}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent disabled:opacity-50"
            aria-label={`Message input for ${targetLanguage} practice`}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl text-white transition-all disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            }}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
