'use client';

import { useState, useMemo } from 'react';
import { quipuDigits, quipuColors, quipuFacts } from '@/lib/quipu-data';

const cordColorOptions = [
  { name: 'White', hex: '#E2E8F0' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Green', hex: '#22C55E' },
  { name: 'Brown', hex: '#92400E' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Black', hex: '#1E293B' },
];

function getDigits(num: number): { place: string; digit: number; label: string }[] {
  const clamped = Math.max(0, Math.min(9999, num));
  const result: { place: string; digit: number; label: string }[] = [];
  if (clamped >= 1000) result.push({ place: 'Thousands', digit: Math.floor(clamped / 1000), label: 'Top cluster' });
  if (clamped >= 100) result.push({ place: 'Hundreds', digit: Math.floor((clamped % 1000) / 100), label: 'Upper cluster' });
  if (clamped >= 10) result.push({ place: 'Tens', digit: Math.floor((clamped % 100) / 10), label: 'Middle cluster' });
  result.push({ place: 'Ones', digit: clamped % 10, label: 'Bottom cluster' });
  return result;
}

export default function QuipuBuilder() {
  const [number, setNumber] = useState(42);
  const [cordColor, setCordColor] = useState('#92400E');
  const [factIndex, setFactIndex] = useState(0);

  const digits = useMemo(() => getDigits(number), [number]);
  const colorInfo = useMemo(
    () => quipuColors.find((c) => {
      const name = cordColorOptions.find((o) => o.hex === cordColor)?.name || '';
      return c.color.toLowerCase().startsWith(name.toLowerCase());
    }),
    [cordColor]
  );

  // SVG dimensions
  const svgHeight = 300;
  const cordX = 160;
  const clusterSpacing = svgHeight / (digits.length + 1);

  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
      <div className="p-6 border-b border-lingua-border-light">
        <h3 className="font-serif text-xl font-semibold text-text-primary mb-1">
          Quipu Builder
        </h3>
        <p className="text-sm text-text-secondary">
          Explore the Inca number encoding system. Enter a number and see how it would be represented on a quipu cord.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Number input */}
          <div>
            <label
              htmlFor="quipu-number"
              className="block text-sm font-medium text-text-secondary mb-1.5"
            >
              Number (0-9999)
            </label>
            <input
              id="quipu-number"
              type="number"
              min={0}
              max={9999}
              value={number}
              onChange={(e) => setNumber(Math.max(0, Math.min(9999, Number(e.target.value) || 0)))}
              className="w-full px-4 py-3 text-lg font-mono bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
            />
          </div>

          {/* Color selector */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">
              Cord color
            </p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Cord color">
              {cordColorOptions.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  role="radio"
                  aria-checked={cordColor === c.hex}
                  aria-label={c.name}
                  onClick={() => setCordColor(c.hex)}
                  className={`w-8 h-8 rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                    cordColor === c.hex ? 'border-lingua-blue scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            {colorInfo && (
              <p className="text-xs text-text-muted mt-2">{colorInfo.meaning}</p>
            )}
          </div>

          {/* Digit breakdown */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-secondary">
              Knot encoding
            </p>
            {digits.map((d) => (
              <div
                key={d.place}
                className="bg-gray-50 rounded-xl px-4 py-2.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    {d.place}
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    {d.digit}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  {quipuDigits[d.digit]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4 flex justify-center" aria-label={`Quipu representation of ${number}`} role="img">
            <svg width="320" height={svgHeight} viewBox={`0 0 320 ${svgHeight}`}>
              {/* Primary cord (horizontal) */}
              <line x1="20" y1="20" x2="300" y2="20" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />

              {/* Pendant cord (vertical) */}
              <line x1={cordX} y1="20" x2={cordX} y2={svgHeight - 20} stroke={cordColor} strokeWidth="3" strokeLinecap="round" />

              {/* Knot clusters */}
              {digits.map((d, i) => {
                const y = (i + 1) * clusterSpacing;
                const knots = d.digit;
                if (knots === 0) {
                  // Empty space marker
                  return (
                    <g key={d.place}>
                      <text x={cordX + 20} y={y + 4} fontSize="10" fill="#94A3B8" fontFamily="system-ui">
                        ({d.place}: 0)
                      </text>
                    </g>
                  );
                }
                // Draw knots as bumps on the cord
                const knotElements = [];
                for (let k = 0; k < knots; k++) {
                  const ky = y - ((knots - 1) * 6) / 2 + k * 6;
                  knotElements.push(
                    <ellipse
                      key={k}
                      cx={cordX}
                      cy={ky}
                      rx="6"
                      ry="3"
                      fill={cordColor}
                      stroke={cordColor}
                      strokeWidth="1"
                      opacity="0.8"
                    />
                  );
                }
                return (
                  <g key={d.place}>
                    {knotElements}
                    <text x={cordX + 20} y={y + 4} fontSize="10" fill="#64748B" fontFamily="system-ui">
                      {d.place}: {d.digit}
                    </text>
                  </g>
                );
              })}

              {/* Label */}
              <text x={cordX} y={svgHeight - 5} textAnchor="middle" fontSize="11" fill="#94A3B8" fontFamily="system-ui">
                = {number}
              </text>
            </svg>
          </div>

          {/* Fun fact */}
          <div className="bg-lingua-amber/5 border border-lingua-amber/20 rounded-xl p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-lingua-amber/70 mb-1.5">
              Did you know?
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {quipuFacts[factIndex]}
            </p>
            <button
              type="button"
              onClick={() => setFactIndex((i) => (i + 1) % quipuFacts.length)}
              className="mt-2 text-xs font-medium text-lingua-amber hover:text-lingua-amber/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-amber focus-visible:ring-offset-2 rounded"
            >
              Next fact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
