'use client';

import { useState } from 'react';

interface Annotation {
  text: string;
  emotion: string;
  color: string;
}

interface EmotionalAnnotationProps {
  annotations: Annotation[];
}

export default function EmotionalAnnotation({
  annotations,
}: EmotionalAnnotationProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!annotations.length) return null;

  const uniqueEmotions = Array.from(
    new Map(annotations.map((a) => [a.emotion, a.color])).entries()
  );

  return (
    <div className="bg-white border border-lingua-border-light rounded-2xl p-5">
      {/* Annotated text */}
      <div className="flex flex-wrap gap-1 text-base leading-relaxed" role="group" aria-label="Emotional annotations">
        {annotations.map((ann, i) => (
          <span
            key={i}
            className="relative inline-block cursor-default"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
            tabIndex={0}
            role="note"
            aria-label={`"${ann.text}" — ${ann.emotion}`}
          >
            <span
              className="pb-0.5"
              style={{ borderBottom: `3px solid ${ann.color}` }}
            >
              {ann.text}
            </span>

            {/* Tooltip */}
            {hoveredIndex === i && (
              <span
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-medium text-white rounded-lg whitespace-nowrap shadow-lg z-10"
                style={{ backgroundColor: ann.color }}
                role="tooltip"
              >
                {ann.emotion}
                <span
                  className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: `4px solid ${ann.color}`,
                  }}
                />
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 pt-3 border-t border-lingua-border-light">
        {uniqueEmotions.map(([emotion, color]) => (
          <span key={emotion} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            {emotion}
          </span>
        ))}
      </div>
    </div>
  );
}
