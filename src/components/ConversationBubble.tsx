'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';

interface ConversationBubbleProps {
  message: string;
  translation: string;
  speaker: 'person1' | 'person2';
  emotionDot?: string;
  culturalNote?: string;
  timestamp?: string;
}

export default function ConversationBubble({
  message,
  translation,
  speaker,
  emotionDot,
  culturalNote,
  timestamp,
}: ConversationBubbleProps) {
  const [noteExpanded, setNoteExpanded] = useState(false);
  const isPerson1 = speaker === 'person1';

  return (
    <div
      className={`flex flex-col max-w-[85%] md:max-w-[70%] ${
        isPerson1 ? 'self-start items-start' : 'self-end items-end'
      }`}
    >
      <div
        className={`relative rounded-2xl px-5 py-4 shadow-sm ${
          isPerson1
            ? 'bg-lingua-blue/5 border border-lingua-blue/20 rounded-tl-md'
            : 'bg-lingua-teal/5 border border-lingua-teal/20 rounded-tr-md'
        }`}
      >
        {/* Emotion dot */}
        {emotionDot && (
          <span
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
            style={{ backgroundColor: emotionDot }}
            aria-label="Emotion indicator"
          />
        )}

        {/* Original text */}
        <p className="text-xs text-text-muted leading-relaxed mb-1.5">
          {message}
        </p>

        {/* Translation */}
        <p className="text-sm text-text-primary font-medium leading-relaxed">
          {translation}
        </p>
      </div>

      {/* Cultural note */}
      {culturalNote && (
        <div className={`mt-1.5 ${isPerson1 ? 'ml-2' : 'mr-2'}`}>
          <button
            type="button"
            onClick={() => setNoteExpanded(!noteExpanded)}
            className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 rounded"
            aria-expanded={noteExpanded}
          >
            <Globe size={10} />
            <span>Cultural context</span>
            <ChevronDown
              size={10}
              className={`transition-transform ${noteExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {noteExpanded && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-[11px] text-text-secondary leading-relaxed mt-1 overflow-hidden"
              >
                {culturalNote}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Timestamp */}
      {timestamp && (
        <span className={`text-[10px] text-text-muted mt-1 ${isPerson1 ? 'ml-2' : 'mr-2'}`}>
          {timestamp}
        </span>
      )}
    </div>
  );
}
