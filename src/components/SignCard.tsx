import { Hand } from 'lucide-react';

interface SignCardProps {
  word: string;
  description: string;
  handshape: string;
  movement: string;
  culturalNote?: string;
}

export default function SignCard({
  word,
  description,
  handshape,
  movement,
  culturalNote,
}: SignCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-lingua-teal/10 flex items-center justify-center">
          <Hand size={20} className="text-lingua-teal" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-text-primary">
          {word}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {description}
      </p>

      {/* Details */}
      <div className="space-y-3">
        <div className="bg-lingua-teal/5 rounded-xl px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-teal/70 mb-1">
            Handshape
          </p>
          <p className="text-sm text-text-primary">{handshape}</p>
        </div>

        <div className="bg-lingua-teal/5 rounded-xl px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-teal/70 mb-1">
            Movement
          </p>
          <p className="text-sm text-text-primary">{movement}</p>
        </div>

        {culturalNote && (
          <div className="bg-lingua-amber/5 rounded-xl px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-amber/70 mb-1">
              Cultural Note
            </p>
            <p className="text-sm text-text-secondary">{culturalNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
