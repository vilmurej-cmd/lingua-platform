'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';
import HelloFloating from '@/components/HelloFloating';
import StoryCard from '@/components/StoryCard';
import BridgeCard from '@/components/BridgeCard';
import ImpactStats from '@/components/ImpactStats';


const stories = [
  {
    title: 'The Mother',
    story:
      'Maria speaks only Spanish. When her son has an asthma attack at school, the nurse hands her a form in English. She signs it without understanding. The form authorizes a medication her son is allergic to. This happens thousands of times a day.',
    icon: <span aria-hidden="true">{"-->"}</span>,
    color: '#FB7185',
  },
  {
    title: 'The Student',
    story:
      'Amara is Deaf. Her university provides a sign language interpreter — for a different sign language. She sits in lectures understanding nothing, watching hands move in patterns that mean nothing to her. She is failing, and it is not her fault.',
    icon: <span aria-hidden="true">{"-->"}</span>,
    color: '#8B5CF6',
  },
  {
    title: 'The Elder',
    story:
      'Kwame speaks Twi. His grandchildren, raised in London, speak only English. He has stories, wisdom, an entire worldview to share. They have questions only he can answer. They sit together in loving silence, unable to bridge the gap.',
    icon: <span aria-hidden="true">{"-->"}</span>,
    color: '#F59E0B',
  },
];

const bridges = [
  {
    emoji: '\uD83C\uDF0A',
    name: 'LINGUA Voice',
    description:
      'Real-time spoken translation that preserves tone, emotion, and cultural nuance across 200+ languages.',
    color: '#3B82F6',
  },
  {
    emoji: '\uD83E\uDEF6',
    name: 'LINGUA Sign',
    description:
      'Bridge the gap between spoken and signed languages. Learn, translate, and connect across 300+ sign languages.',
    color: '#14B8A6',
  },
  {
    emoji: '\uD83D\uDCA1',
    name: 'LINGUA Touch',
    description:
      'Haptic and visual translation for DeafBlind users. Communication through vibration patterns and tactile feedback.',
    color: '#F59E0B',
  },
  {
    emoji: '\uD83C\uDFDB\uFE0F',
    name: 'LINGUA Ancient',
    description:
      'Unlock the wisdom of extinct and endangered languages. Preserve cultural heritage before it disappears forever.',
    color: '#FB7185',
  },
  {
    emoji: '\uD83C\uDF31',
    name: 'LINGUA Learn',
    description:
      'AI-powered language learning that adapts to you. Not just vocabulary — understand culture, context, and connection.',
    color: '#10B981',
  },
  {
    emoji: '\uD83C\uDFE5',
    name: 'LINGUA Health',
    description:
      'Medical-grade translation that saves lives. Purpose-built for hospitals, clinics, and emergency rooms.',
    color: '#F97316',
  },
  {
    emoji: '\uD83C\uDF0D',
    name: 'LINGUA Unite',
    description:
      'Real-time bilingual conversation mode. Two people, two languages, one conversation. No barriers.',
    color: '#8B5CF6',
  },
];

const impactStats = [
  { value: 7000, label: 'Living languages', color: '#3B82F6', suffix: '+' },
  { value: 300, label: 'Sign languages', color: '#14B8A6', suffix: '+' },
  {
    value: 430,
    label: 'Deaf & hard of hearing (millions)',
    color: '#F59E0B',
    suffix: 'M+',
  },
  {
    value: 2,
    label: 'With vision impairment (billions)',
    color: '#FB7185',
    suffix: '.2B+',
  },
  {
    value: 1,
    label: 'Language dies every 2 weeks',
    color: '#F97316',
    prefix: '',
  },
  {
    value: 43,
    label: 'Of all languages are endangered',
    color: '#8B5CF6',
    suffix: '%',
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] tracking-tight mb-6">
            Every Voice Deserves
            <br />
            <span className="bg-gradient-connect bg-clip-text text-transparent bg-gradient-connect-wide">
              To Be Understood
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            LINGUA does not just translate words. It translates meaning,
            emotion, and intent — so no voice is ever lost, and no connection is
            ever missed.
          </p>

          <Link
            href="/translate"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            }}
          >
            Start Understanding
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="relative z-10 mt-12 w-full max-w-4xl mx-auto">
          <HelloFloating />
        </div>
      </section>

      {/* ==================== PROBLEM ==================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary text-center max-w-4xl mx-auto mb-16 leading-tight">
            7.5 Billion People. Thousands of Languages.{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">
              Countless Missed Connections.
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stories.map((story) => (
              <StoryCard
                key={story.title}
                title={story.title}
                story={story.story}
                color={story.color}
              />
            ))}
          </div>

          <p className="text-center text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            These are not edge cases. These are{' '}
            <strong className="text-text-primary">
              billions of daily moments
            </strong>{' '}
            where connection is lost.
          </p>
        </div>
      </section>

      {/* ==================== SEVEN BRIDGES ==================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-lingua-blue mb-3">
              The Seven Bridges
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
              One Platform. Every Kind of Understanding.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {bridges.map((bridge) => (
              <BridgeCard
                key={bridge.name}
                emoji={bridge.emoji}
                name={bridge.name}
                description={bridge.description}
                color={bridge.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== IMPACT STATS ==================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              The Scale of the Problem
            </h2>
            <p className="text-text-secondary text-lg">
              Language barriers affect more people than any other form of
              exclusion.
            </p>
          </div>

          <ImpactStats stats={impactStats} />
        </div>
      </section>

      {/* ==================== QUOTE ==================== */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#0F172A' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <blockquote>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-snug bg-gradient-connect bg-clip-text text-transparent bg-gradient-connect-wide">
              &ldquo;The most painful moment in human experience is not being
              unable to speak — it is speaking and not being understood.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="medium" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Start breaking down barriers.{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">
              Today.
            </span>
          </h2>

          <Link
            href="/translate"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            }}
          >
            Start Translating
            <ArrowRight size={18} />
          </Link>

          <p className="text-text-muted text-sm mt-4">
            No account needed. Free for everyone.
          </p>
        </div>
      </section>
    </div>
  );
}
