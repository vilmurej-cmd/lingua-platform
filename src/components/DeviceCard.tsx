'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeviceCardProps {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  emoji: string;
  color: string;
  useCases?: string[];
}

export default function DeviceCard({
  name,
  tagline,
  description,
  features,
  emoji,
  color,
  useCases,
}: DeviceCardProps) {
  const [useCaseExpanded, setUseCaseExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
      {/* Gradient accent */}
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}80, transparent)`,
        }}
      />

      <div className="p-8">
        {/* Emoji */}
        <span className="text-5xl block mb-5" role="img" aria-hidden="true">
          {emoji}
        </span>

        {/* Name */}
        <h3 className="font-serif text-2xl font-bold text-text-primary mb-1">
          {name}
        </h3>

        {/* Tagline */}
        <p className="text-sm font-medium mb-4" style={{ color }}>
          {tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          {description}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: `${color}10`,
                color,
              }}
            >
              <Check size={12} />
              {feature}
            </span>
          ))}
        </div>

        {/* Use cases (expandable) */}
        {useCases && useCases.length > 0 && (
          <div className="border-t border-lingua-border-light pt-4">
            <button
              type="button"
              onClick={() => setUseCaseExpanded(!useCaseExpanded)}
              className="flex items-center gap-2 w-full text-left text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 rounded"
              aria-expanded={useCaseExpanded}
            >
              <span>Use cases</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${useCaseExpanded ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {useCaseExpanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mt-3 space-y-2"
                  role="list"
                >
                  {useCases.map((uc) => (
                    <li
                      key={uc}
                      className="text-sm text-text-secondary pl-4 border-l-2"
                      style={{ borderLeftColor: color }}
                    >
                      {uc}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
