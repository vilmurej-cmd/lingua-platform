'use client';

interface SpectrumGradientProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'full';
}

const opacityMap = {
  subtle: { from: 0.03, to: 0.05 },
  medium: { from: 0.05, to: 0.1 },
  full: { from: 0.1, to: 0.2 },
};

export default function SpectrumGradient({
  className = '',
  intensity = 'subtle',
}: SpectrumGradientProps) {
  const { from, to } = opacityMap[intensity];
  const mid = (from + to) / 2;

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Blue blob */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-spectrum-shift"
        style={{
          top: '-10%',
          left: '-5%',
          background: `radial-gradient(circle, rgba(59, 130, 246, ${to}) 0%, transparent 70%)`,
          backgroundSize: '200% 200%',
        }}
      />
      {/* Violet blob */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-spectrum-shift"
        style={{
          top: '30%',
          right: '-10%',
          background: `radial-gradient(circle, rgba(139, 92, 246, ${mid}) 0%, transparent 70%)`,
          backgroundSize: '200% 200%',
          animationDelay: '2s',
        }}
      />
      {/* Amber blob */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-spectrum-shift"
        style={{
          bottom: '-5%',
          left: '30%',
          background: `radial-gradient(circle, rgba(245, 158, 11, ${from}) 0%, transparent 70%)`,
          backgroundSize: '200% 200%',
          animationDelay: '4s',
        }}
      />
      {/* Teal blob */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full animate-spectrum-shift"
        style={{
          top: '60%',
          left: '-10%',
          background: `radial-gradient(circle, rgba(20, 184, 166, ${from}) 0%, transparent 70%)`,
          backgroundSize: '200% 200%',
          animationDelay: '6s',
        }}
      />
      {/* Rose blob */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full animate-spectrum-shift"
        style={{
          top: '10%',
          right: '20%',
          background: `radial-gradient(circle, rgba(251, 113, 133, ${from}) 0%, transparent 70%)`,
          backgroundSize: '200% 200%',
          animationDelay: '3s',
        }}
      />
    </div>
  );
}
