'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

interface CulturalNoteProps {
  context: string;
  importance: 'high' | 'medium' | 'low';
}

const importanceStyles = {
  high: {
    border: 'border-lingua-amber',
    badge: 'bg-lingua-amber/10 text-lingua-amber',
    label: 'Important',
  },
  medium: {
    border: 'border-lingua-blue',
    badge: 'bg-lingua-blue/10 text-lingua-blue',
    label: 'Helpful',
  },
  low: {
    border: 'border-gray-300',
    badge: 'bg-gray-100 text-text-muted',
    label: 'Note',
  },
};

export default function CulturalNote({
  context,
  importance,
}: CulturalNoteProps) {
  const [expanded, setExpanded] = useState(false);
  const style = importanceStyles[importance];

  return (
    <div
      className={`bg-white border-l-4 ${style.border} border border-lingua-border-light rounded-2xl overflow-hidden`}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 rounded-2xl"
        aria-expanded={expanded}
      >
        <Globe size={18} className="text-text-secondary flex-shrink-0" />
        <span className="flex-1 text-sm font-medium text-text-primary">
          Cultural Note
        </span>
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}
        >
          {style.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-text-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 pt-0">
              <p className="text-sm text-text-secondary leading-relaxed">
                {context}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
