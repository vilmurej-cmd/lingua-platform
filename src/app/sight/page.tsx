import { Metadata } from 'next';
import Link from 'next/link';
import {
  ScanLine,
  Mountain,
  Landmark,
  Lock,
  Shapes,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';

export const metadata: Metadata = {
  title: 'LINGUA Sight — Visual Language Decoded',
  description:
    'Decode ancient scripts, interpret cave art, read inscriptions, break codes, explore quipu, and illuminate sacred texts.',
};

const features = [
  {
    icon: ScanLine,
    href: '/sight/decode',
    name: 'Script Decoder',
    description: 'Upload or describe any visual text — from undeciphered tablets to foreign signage — and let AI identify, analyze, and translate it.',
    color: '#3B82F6',
  },
  {
    icon: Mountain,
    href: '/sight/caves',
    name: 'Cave Art Interpreter',
    description: 'The world\'s oldest visual language. Explore humanity\'s first marks and what they might mean.',
    color: '#F59E0B',
  },
  {
    icon: Landmark,
    href: '/sight/inscriptions',
    name: 'Inscription Reader',
    description: 'Point, read, understand. Identify and translate inscriptions on monuments, artifacts, coins, and buildings.',
    color: '#14B8A6',
  },
  {
    icon: Lock,
    href: '/sight/codes',
    name: 'Code Breaker',
    description: 'Historical codes and ciphers. From the Rosetta Stone to the Enigma machine to unsolved mysteries.',
    color: '#FB7185',
  },
  {
    icon: Shapes,
    href: '/sight/quipu',
    name: 'Quipu Explorer',
    description: 'The Inca\'s knotted wisdom. An entire empire\'s information technology encoded in colored strings and knots.',
    color: '#8B5CF6',
  },
  {
    icon: BookOpen,
    href: '/sight/sacred',
    name: 'Sacred Texts',
    description: 'Texts that shaped civilizations. Approach the world\'s most influential manuscripts with reverence and scholarship.',
    color: '#10B981',
  },
];

export default function SightPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-blue mb-4">
            LINGUA Sight
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight mb-8">
            See the World&apos;s{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">
              Hidden Languages
            </span>
          </h1>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-lingua-border-light p-8 text-text-secondary leading-relaxed text-base space-y-4">
            <p>
              Before there were alphabets, there were marks on cave walls. Before there were books, there were knots on strings and notches on bones. Before there were screens, there were inscriptions carved into stone that have outlasted every empire that made them.
            </p>
            <p>
              Humans have been encoding meaning into visual form for at least 40,000 years. LINGUA Sight decodes all of it — from Paleolithic handprints to undeciphered scripts to the text on a menu in a language you don&apos;t speak.
            </p>
            <p className="font-medium text-text-primary">
              If it was meant to be read, LINGUA will help you read it.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group bg-white rounded-2xl border border-lingua-border-light shadow-sm p-8 transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}10` }}
                  >
                    <Icon size={24} style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-text-primary mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                    style={{ color: feature.color }}
                  >
                    Explore <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <blockquote>
            <p className="font-serif text-2xl sm:text-3xl font-bold leading-snug bg-gradient-connect bg-clip-text text-transparent bg-gradient-connect-wide">
              &ldquo;The human impulse to leave a mark — to say &lsquo;I was here, and this mattered&rsquo; — is as old as consciousness itself.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
