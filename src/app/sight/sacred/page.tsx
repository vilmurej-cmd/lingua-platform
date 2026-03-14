'use client';

import { useState } from 'react';
import { BookOpen, AlertTriangle } from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';
import SacredTextViewer from '@/components/SacredTextViewer';
import { sacredTexts } from '@/lib/sacred-texts';

export default function SacredPage() {
  const [selectedId, setSelectedId] = useState(sacredTexts[0].id);
  const selectedText = sacredTexts.find((t) => t.id === selectedId) || sacredTexts[0];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-emerald mb-4">
            Sacred Text Illumination
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
            Texts That Shaped{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">Civilizations</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            These manuscripts and inscriptions are among the most important
            documents in human history. They shaped religions, inspired empires,
            and preserved the thoughts of minds separated from us by millennia.
          </p>
        </div>
      </section>

      {/* Respect Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-lingua-amber/5 border border-lingua-amber/20 rounded-2xl p-6 flex items-start gap-4">
            <AlertTriangle size={24} className="text-lingua-amber flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-serif text-base font-semibold text-text-primary mb-1">
                A Note on Respect
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                These texts are sacred to living traditions. LINGUA presents them
                with reverence, not just scholarship. We acknowledge that academic
                analysis, however careful, cannot capture the full significance these
                texts hold for the communities that cherish them. Multiple
                interpretive perspectives exist for every passage, and we encourage
                readers to seek understanding from within each tradition as well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Text Selector + Viewer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Selector Tabs */}
          <div className="flex flex-wrap gap-3 mb-8" role="tablist" aria-label="Sacred texts">
            {sacredTexts.map((text) => (
              <button
                key={text.id}
                role="tab"
                aria-selected={selectedId === text.id}
                onClick={() => setSelectedId(text.id)}
                className={`px-5 py-3 text-sm font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-emerald focus-visible:ring-offset-2 ${
                  selectedId === text.id
                    ? 'bg-lingua-emerald/10 text-lingua-emerald border border-lingua-emerald/30 shadow-sm'
                    : 'bg-white text-text-secondary border border-lingua-border-light hover:border-lingua-emerald/30 hover:bg-lingua-emerald/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={14} />
                  {text.name}
                </span>
              </button>
            ))}
          </div>

          {/* Viewer */}
          <SacredTextViewer text={selectedText} />
        </div>
      </section>

      {/* Multiple Perspectives */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-text-primary mb-6">
            Multiple Perspectives
          </h2>
          <p className="text-text-secondary leading-relaxed text-base">
            Every sacred text exists within a living tradition of interpretation.
            The commentaries presented here represent scholarly perspectives, but
            they are not the only or final word. Jewish, Christian, Hindu, and other
            traditions each bring centuries of interpretive wisdom to these texts.
            We encourage readers to explore these rich traditions alongside our
            linguistic and historical analysis.
          </p>
        </div>
      </section>
    </div>
  );
}
