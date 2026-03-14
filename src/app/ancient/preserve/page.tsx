import { Metadata } from 'next';
import {
  Mic,
  BookOpen,
  Search,
  Archive,
  GraduationCap,
  Shield,
  Heart,
  ArrowRight,
} from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';

export const metadata: Metadata = {
  title: 'Preservation Toolkit — LINGUA Ancient',
  description:
    'Community-owned tools for recording, documenting, and revitalizing endangered languages.',
};

const features = [
  {
    icon: Mic,
    name: 'Field Recording Interface',
    description:
      'Record native speakers with professional-grade tools designed for linguistic fieldwork. Automatic phonemic transcription, speaker metadata, and session management — all running locally with no data leaving the device until the community decides.',
    color: '#3B82F6',
  },
  {
    icon: BookOpen,
    name: 'Grammar Builder',
    description:
      'AI-suggested grammatical patterns identified from recorded speech. Build a formal grammar collaboratively — the AI proposes rules from observed patterns, and community linguists confirm, correct, or refine them. Every rule links back to the source recording.',
    color: '#8B5CF6',
  },
  {
    icon: Search,
    name: 'Community Dictionary',
    description:
      'A searchable, community-owned dictionary that grows from field recordings and community contributions. Each entry includes audio pronunciation, example sentences, cultural context, and usage notes — tagged and verified by community elders.',
    color: '#14B8A6',
  },
  {
    icon: Archive,
    name: 'Story Archive',
    description:
      'Preserve oral traditions, songs, ceremonies, and everyday conversations. Stories are transcribed, translated, and annotated with cultural context. Elders can record directly, and community members can add context and cross-references over time.',
    color: '#F59E0B',
  },
  {
    icon: GraduationCap,
    name: 'Teaching Materials Generator',
    description:
      'Automatically generate flashcards, exercises, pronunciation drills, and lesson plans from recorded language data. Create materials for children, adult learners, and heritage speakers — each path respecting the community\'s pedagogy preferences.',
    color: '#10B981',
  },
  {
    icon: Shield,
    name: 'Data Sovereignty',
    description:
      'All data is owned by the community. Always. LINGUA provides the tools, but the community controls access, storage, and distribution. Data can be exported at any time. No language data is used to train AI models without explicit, ongoing community consent.',
    color: '#FB7185',
  },
];

export default function PreservePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-emerald mb-4">
            Preservation Toolkit
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] mb-6">
            Saving Languages{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">
              Before They&apos;re Lost
            </span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            When the last speaker of a language dies, a library burns. LINGUA provides tools
            to help communities document, teach, and revitalize their languages on their own terms.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-8 transition-all hover:shadow-md"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${feature.color}10` }}
                  >
                    <Icon size={24} style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-text-primary mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-text-muted">
                    Coming Soon
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary text-center mb-10">
            Our Principles
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'Nothing About Us Without Us',
                text: 'Language communities lead every decision about their data. LINGUA is a tool, not an authority.',
              },
              {
                title: 'Documentation Is Not Enough',
                text: 'Recording a language in a database is not saving it. Revitalization means living speakers, active use, and intergenerational transmission.',
              },
              {
                title: 'Technology Serves Culture',
                text: 'AI and digital tools serve the community\'s goals. If the community wants recordings for elders only, that\'s the design. If they want public teaching resources, we build that instead.',
              },
              {
                title: 'Respect Over Research',
                text: 'Academic interest does not override community wishes. Sacred or restricted knowledge is never exposed without explicit permission.',
              },
            ].map((principle) => (
              <div key={principle.title} className="bg-white rounded-xl border border-lingua-border-light p-6">
                <h3 className="font-serif text-lg font-bold text-text-primary mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Heart size={32} className="text-lingua-rose mx-auto mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Represent an Indigenous Language Community?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            If you are a member, elder, teacher, or advocate of an indigenous or
            endangered language community, we would be honored to hear from you.
            LINGUA&apos;s preservation tools are free and will always be free for
            community language revitalization.
          </p>
          <a
            href="mailto:preserve@mylingua.ai"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            style={{ background: 'linear-gradient(135deg, #10B981, #14B8A6)' }}
          >
            Contact Us
            <ArrowRight size={18} />
          </a>
          <p className="text-gray-500 text-sm mt-4">preserve@mylingua.ai</p>
        </div>
      </section>
    </div>
  );
}
