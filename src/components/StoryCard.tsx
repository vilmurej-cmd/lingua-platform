import React from 'react';

interface StoryCardProps {
  title: string;
  story: string;
  icon?: React.ReactNode;
  color?: string;
}

export default function StoryCard({
  title,
  story,
  icon,
  color = '#3B82F6',
}: StoryCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-lingua-border-light p-8 transition-shadow hover:shadow-lg group"
      style={{ borderLeftWidth: '4px', borderLeftColor: color }}
    >
      {icon && (
        <div className="mb-4 text-2xl" style={{ color }}>
          {icon}
        </div>
      )}
      <h3 className="font-serif text-xl font-semibold text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">{story}</p>
    </div>
  );
}
