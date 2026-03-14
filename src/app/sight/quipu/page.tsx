'use client';

import { useState } from 'react';
import { Shapes } from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';
import QuipuBuilder from '@/components/QuipuBuilder';
import { quipuDigits, quipuColors, quipuFacts } from '@/lib/quipu-data';

export default function QuipuPage() {
  const [visibleFacts, setVisibleFacts] = useState(5);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-violet mb-4">
            Quipu Explorer
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
            The Inca&apos;s{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">Knotted Wisdom</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            The Inca Empire — the largest empire in pre-Columbian America — ran an
            administration covering 10 million people across 4,000 km of mountain
            terrain without a single written word. Their information technology was
            the quipu: colored strings with carefully tied knots that encoded
            numbers, names, stories, and perhaps much more than we yet understand.
          </p>
        </div>
      </section>

      {/* Interactive Builder */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <QuipuBuilder />
        </div>
      </section>

      {/* How Numbers Were Encoded */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary text-center mb-10">
            How Numbers Were Encoded
          </h2>
          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 sm:p-8">
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Quipus used a <strong>decimal positional system</strong> — the same base-10 system we
              use today. Each pendant cord represents a number, with knot clusters at different
              positions along the cord representing different decimal places: units nearest the
              bottom, then tens, hundreds, and thousands moving upward.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {Object.entries(quipuDigits).map(([digit, desc]) => (
                <div
                  key={digit}
                  className="bg-gray-50 rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-bold font-serif text-lingua-violet mb-1">{digit}</p>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    {desc.split('(')[0].trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cord Colors */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary text-center mb-3">
            Cord Colors and Meanings
          </h2>
          <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
            Color was a primary dimension of meaning in quipus. The following
            interpretations are scholarly proposals — the Inca did not leave us a key.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quipuColors.map((c) => {
              const colorMap: Record<string, string> = {
                White: '#E2E8F0',
                Red: '#EF4444',
                'Yellow/Gold': '#EAB308',
                Green: '#22C55E',
                Black: '#1E293B',
                Brown: '#92400E',
                Blue: '#3B82F6',
                'Variegated/Multicolor': 'linear-gradient(135deg, #EF4444, #EAB308, #22C55E, #3B82F6)',
              };
              const bg = colorMap[c.color] || '#94A3B8';
              const isGradient = bg.startsWith('linear');

              return (
                <div
                  key={c.color}
                  className="bg-white rounded-xl border border-lingua-border-light p-5 flex items-start gap-4 shadow-sm"
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 border border-lingua-border-light"
                    style={isGradient ? { background: bg } : { backgroundColor: bg }}
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-text-primary mb-1">{c.color}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{c.meaning}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mystery of Narrative Quipu */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary text-center mb-10">
            The Mystery of Narrative Quipu
          </h2>
          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-6 sm:p-8 space-y-4">
            <p className="text-sm text-text-secondary leading-relaxed">
              While the numerical encoding of quipus is well understood, Spanish
              chronicles consistently report that quipukamayuqs (quipu keepers)
              could also encode <strong>narrative information</strong> — histories,
              laws, poetry, and administrative messages — using quipus.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              If these accounts are accurate, quipus were not merely accounting
              tools but a <strong>true writing system</strong> — the only one in
              the Americas based on three-dimensional fiber construction rather than
              marks on a flat surface.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Modern researchers using machine learning and statistical analysis
              have found patterns in surviving quipus that are consistent with
              encoded language — including possible place names and categorical
              labels. The work is ongoing, and the stakes are immense.
            </p>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary text-center mb-10">
            Quipu Facts
          </h2>
          <div className="space-y-4">
            {quipuFacts.slice(0, visibleFacts).map((fact, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-lingua-border-light p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="text-lingua-violet font-bold font-serif text-lg flex-shrink-0">
                    {i + 1}.
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">{fact}</p>
                </div>
              </div>
            ))}
          </div>
          {visibleFacts < quipuFacts.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleFacts((v) => Math.min(v + 5, quipuFacts.length))}
                className="text-sm font-medium text-lingua-violet hover:text-lingua-violet/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-violet focus-visible:ring-offset-2 rounded px-4 py-2"
              >
                Show more facts
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Shapes size={32} className="text-lingua-violet mx-auto mb-4" />
          <blockquote>
            <p className="font-serif text-xl sm:text-2xl font-bold leading-relaxed text-gray-400">
              &ldquo;If we can decode the narrative quipu, we will recover an
              entire civilization&apos;s history, literature, and law — written not
              in ink on paper, but in colored thread tied in knots. It would be one
              of the greatest intellectual achievements in the history of
              archaeology.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
