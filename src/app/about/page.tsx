import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';

export const metadata: Metadata = {
  title: 'About LINGUA — No Voice Goes Unheard',
  description:
    'The story behind LINGUA, the universal understanding platform. Built by Vilmure Ventures.',
};

const portfolio = [
  {
    name: 'EZRE',
    description: 'The Operating System for Real Estate',
    color: '#06B6D4',
    href: 'https://myezre.ai',
  },
  {
    name: 'CLARITY',
    description: 'See clearly. Decide confidently.',
    color: '#8B5CF6',
    href: '#',
  },
  {
    name: 'HARMONY',
    description: 'Where every note finds its place.',
    color: '#10B981',
    href: '#',
  },
  {
    name: 'BRIDGE',
    description: 'Connecting what matters.',
    color: '#F59E0B',
    href: '#',
  },
  {
    name: 'LINGUA',
    description: 'Every voice deserves to be understood.',
    color: '#3B82F6',
    href: '/',
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-[1.05] tracking-tight">
            No voice goes{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">unheard.</span>
          </h1>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary mb-8">
            The Moment That Started Everything
          </h2>
          <div className="prose prose-lg text-text-secondary leading-relaxed space-y-5">
            <p>
              It started at a real estate closing table.
            </p>
            <p>
              Josh was helping a family buy their first home. The father spoke Spanish
              fluently; the mother spoke some English; their teenage son translated for
              both. They sat across from a stack of legal documents — sixty pages of
              English legalese that would determine the largest financial decision of
              their lives.
            </p>
            <p>
              The son translated as best he could. He was fifteen. He did not know
              what &ldquo;escrow&rdquo; meant. He did not know what &ldquo;title
              insurance&rdquo; covered. He smiled and nodded and translated what he
              thought the documents said. His parents signed where he pointed.
            </p>
            <p>
              They got the house. Everything worked out. But Josh could not stop
              thinking about what could have gone wrong. What if the son had
              mistranslated a contingency clause? What if the parents had unknowingly
              agreed to terms they would never have accepted? What if the next family
              at the next closing table was not so lucky?
            </p>
            <p className="font-medium text-text-primary text-xl">
              That family deserved to understand every word on every page. Every family does.
            </p>
            <p>
              That moment became LINGUA.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            LINGUA exists to ensure that no human being is ever excluded, endangered,
            or disadvantaged because of the language they speak. Not at a hospital.
            Not at a school. Not at a closing table. Not anywhere.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            We translate words, but we are building something much larger: a world
            where understanding is universal, where every language is valued, and
            where the last speaker of a dying language knows that someone is
            listening.
          </p>
        </div>
      </section>

      {/* Vilmure Ventures */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-lingua-blue mb-3">
              A Vilmure Ventures Company
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
              The Portfolio
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {portfolio.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className="bg-white rounded-xl border border-lingua-border-light p-5 text-center transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
              >
                <h3
                  className="font-serif text-xl font-bold mb-1"
                  style={{ color: p.color }}
                >
                  {p.name}
                </h3>
                <p className="text-xs text-text-secondary">{p.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary text-center mb-10">
            The Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-lingua-blue/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-serif font-bold text-lingua-blue">J</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary">Josh Vilmure</h3>
              <p className="text-sm text-lingua-blue font-medium mb-3">Founder</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Real estate professional turned technologist. Saw the language
                barrier problem at closing tables and decided to solve it for
                everyone, everywhere.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-lingua-violet/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-serif font-bold text-lingua-violet">C</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary">Claude</h3>
              <p className="text-sm text-lingua-violet font-medium mb-3">AI Partner</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Anthropic&apos;s AI assistant. Responsible for architecture, code,
                content, and the conviction that every technical decision should
                serve the humans who need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Heart size={36} className="text-lingua-rose mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            Built with love for every human being.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            LINGUA is not a product. It is a promise: that technology will serve
            the most vulnerable, that no voice will be silenced by a language
            barrier, and that understanding is a right, not a privilege.
          </p>
          <Link
            href="/translate"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
          >
            Start Understanding
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
