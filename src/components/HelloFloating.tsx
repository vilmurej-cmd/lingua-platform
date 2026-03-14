'use client';

const words = [
  'Hello', 'Hola', '\u3053\u3093\u306B\u3061\u306F', '\u0645\u0631\u062D\u0628\u0627',
  'Bonjour', '\uC548\uB155\uD558\uC138\uC694', 'Ol\u00E1', '\u041F\u0440\u0438\u0432\u0435\u0442',
  '\u4F60\u597D', 'Ciao', 'Hallo', 'Merhaba', 'Sawubona', '\u0393\u03B5\u03B9\u03B1 \u03C3\u03BF\u03C5',
  '\u05E9\u05DC\u05D5\u05DD', 'Xin ch\u00E0o', 'Habari', 'Namaste',
  '\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35', 'Salut',
];

const colors = [
  '#3B82F6', '#8B5CF6', '#F59E0B', '#FB7185', '#14B8A6',
  '#10B981', '#F97316', '#06B6D4', '#3B82F6', '#8B5CF6',
  '#F59E0B', '#FB7185', '#14B8A6', '#10B981', '#F97316',
  '#06B6D4', '#3B82F6', '#8B5CF6', '#F59E0B', '#14B8A6',
];

// Deterministic positions so no hydration mismatch
const positions = [
  { left: '3%', top: '10%', size: 16, delay: 0, duration: 5, opacity: 0.4 },
  { left: '12%', top: '55%', size: 20, delay: 1.2, duration: 6, opacity: 0.35 },
  { left: '20%', top: '20%', size: 14, delay: 0.5, duration: 7, opacity: 0.5 },
  { left: '28%', top: '65%', size: 18, delay: 2, duration: 5.5, opacity: 0.3 },
  { left: '35%', top: '15%', size: 22, delay: 0.8, duration: 6.5, opacity: 0.45 },
  { left: '42%', top: '50%', size: 15, delay: 1.5, duration: 5, opacity: 0.4 },
  { left: '48%', top: '30%', size: 24, delay: 0.3, duration: 7, opacity: 0.5 },
  { left: '55%', top: '70%', size: 16, delay: 2.5, duration: 6, opacity: 0.35 },
  { left: '60%', top: '10%', size: 20, delay: 1, duration: 5.5, opacity: 0.7 },
  { left: '66%', top: '45%', size: 14, delay: 0.7, duration: 6.5, opacity: 0.3 },
  { left: '72%', top: '60%', size: 18, delay: 1.8, duration: 5, opacity: 0.45 },
  { left: '78%', top: '25%', size: 22, delay: 0.4, duration: 7, opacity: 0.4 },
  { left: '83%', top: '55%', size: 15, delay: 2.2, duration: 6, opacity: 0.5 },
  { left: '88%', top: '15%', size: 16, delay: 1.3, duration: 5.5, opacity: 0.35 },
  { left: '92%', top: '40%', size: 20, delay: 0.6, duration: 6.5, opacity: 0.45 },
  { left: '7%', top: '40%', size: 17, delay: 1.9, duration: 5, opacity: 0.3 },
  { left: '25%', top: '45%', size: 14, delay: 2.8, duration: 7, opacity: 0.5 },
  { left: '52%', top: '5%', size: 19, delay: 0.9, duration: 6, opacity: 0.4 },
  { left: '75%', top: '75%', size: 16, delay: 1.6, duration: 5.5, opacity: 0.35 },
  { left: '95%', top: '70%', size: 21, delay: 2.4, duration: 6.5, opacity: 0.45 },
];

export default function HelloFloating() {
  return (
    <div
      className="relative w-full h-24 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {words.map((word, i) => {
        const pos = positions[i];
        return (
          <span
            key={i}
            className="absolute font-sans font-medium animate-float"
            style={{
              left: pos.left,
              top: pos.top,
              fontSize: `${pos.size}px`,
              color: colors[i],
              opacity: pos.opacity,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
