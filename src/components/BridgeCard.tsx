interface BridgeCardProps {
  emoji: string;
  name: string;
  description: string;
  color: string;
}

export default function BridgeCard({
  emoji,
  name,
  description,
  color,
}: BridgeCardProps) {
  return (
    <div
      className="relative bg-white rounded-2xl p-6 border border-lingua-border-light transition-all hover:shadow-[0_0_24px_-4px] group"
      style={
        {
          '--glow-color': `${color}40`,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget.style.boxShadow = `0 0 24px -4px ${color}50`);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Gradient border accent */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color}20, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <span className="text-[32px] block mb-4" role="img" aria-hidden="true">
          {emoji}
        </span>
        <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
          {name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
