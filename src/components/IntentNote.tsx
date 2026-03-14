import { Lightbulb } from 'lucide-react';

interface IntentNoteProps {
  intentNote: string | null;
  literal?: string;
}

export default function IntentNote({ intentNote, literal }: IntentNoteProps) {
  if (!intentNote) return null;

  return (
    <div className="bg-lingua-violet/5 border border-lingua-violet/20 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <Lightbulb
          size={18}
          className="text-lingua-violet flex-shrink-0 mt-0.5"
        />
        <div className="flex-1 space-y-3">
          {literal && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-violet/60 mb-1">
                Literal meaning
              </p>
              <p className="text-sm text-text-secondary">{literal}</p>
            </div>
          )}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-violet/60 mb-1">
              Likely intent
            </p>
            <p className="text-sm text-text-primary font-medium">
              {intentNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
