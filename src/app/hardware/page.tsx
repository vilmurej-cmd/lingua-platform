'use client';

import {
  Headphones,
  Glasses,
  Watch,
  Radio,
  Hospital,
  GraduationCap,
  AlertTriangle,
  Building2,
  Satellite,
  Handshake,
} from 'lucide-react';
import SpectrumGradient from '@/components/SpectrumGradient';
import DeviceCard from '@/components/DeviceCard';
import UseCaseScenario from '@/components/UseCaseScenario';
import WaitlistCapture from '@/components/WaitlistCapture';

const devices = [
  {
    name: 'LINGUA Earpiece',
    tagline: 'The Universal Ear',
    emoji: '\uD83C\uDFA7',
    color: '#3B82F6',
    description:
      'A discreet in-ear device that translates spoken language in real-time. Hear a sentence in Mandarin — understand it in English before the speaker finishes. No phone required. No internet required for the 20 most-spoken languages.',
    features: [
      '200+ languages',
      '<500ms delay',
      '12hr battery',
      'Offline (20 languages)',
      'Noise cancellation',
      'Speaker identification',
    ],
    useCases: [
      'Business meetings across languages',
      'Travel without a phrasebook',
      'Multilingual family gatherings',
      'Conference interpretation replacement',
    ],
  },
  {
    name: 'LINGUA Glass',
    tagline: 'The Universal Eye',
    emoji: '\uD83D\uDD76\uFE0F',
    color: '#8B5CF6',
    description:
      'AR translation glasses that overlay translated text on signs, menus, documents, and faces. Recognizes sign language gestures and displays captions in real time. Navigate any city, read any menu, understand any sign.',
    features: [
      'Sign language recognition',
      'Live text overlay',
      'Real-time captions',
      'Navigation mode',
      'Prescription-compatible',
      'All-day battery',
    ],
    useCases: [
      'Reading foreign signage and menus',
      'Real-time ASL/BSL captioning',
      'Museum and heritage site interpretation',
      'Document translation on the fly',
    ],
  },
  {
    name: 'LINGUA Band',
    tagline: 'The Universal Hand',
    emoji: '\u231A',
    color: '#14B8A6',
    description:
      'A tactile wristband designed for Deaf and DeafBlind users. Translates spoken language into vibration patterns that convey meaning through haptic feedback. Captures sign language gestures via camera and translates them to speech.',
    features: [
      'Vibration language',
      'Gesture capture',
      'Emergency alerts',
      'Braille-sync display',
      'Water-resistant',
      'Companion app',
    ],
    useCases: [
      'DeafBlind communication in public',
      'Emergency notifications',
      'Workplace accessibility',
      'Independent navigation',
    ],
  },
  {
    name: 'LINGUA Station',
    tagline: 'The Universal Room',
    emoji: '\uD83D\uDCE1',
    color: '#F59E0B',
    description:
      'A room-scale translation unit for environments where everyone needs to understand everyone. Hospitals, courtrooms, classrooms, disaster relief centers. Multi-speaker, multi-language, always on.',
    features: [
      'Multi-speaker recognition',
      'Medical/legal modes',
      'Education mode',
      'Starlink compatible',
      'HIPAA compliant',
      'Portable (5kg)',
    ],
    useCases: [
      'Hospital emergency rooms',
      'Multilingual classrooms',
      'Disaster relief coordination',
      'International courtrooms',
    ],
  },
];

const scenarios = [
  {
    title: 'The Hospital',
    location: 'Emergency Room, Houston, Texas',
    scenario:
      'A Guatemalan mother brings her child in with severe abdominal pain. She speaks K\'iche\' Maya. No interpreter is available. The child is crying. Every minute matters.',
    steps: [
      {
        description: 'LINGUA Station detects K\'iche\' Maya from the mother\'s speech.',
        linguaAction: 'Language identified in 2 seconds. Medical mode activated.',
      },
      {
        description: 'Doctor asks: "Where does it hurt? How long has this been happening?"',
        linguaAction: 'Real-time translation to K\'iche\'. Medical terminology simplified for lay understanding.',
      },
      {
        description: 'Mother responds with detailed symptoms and mentions an herbal remedy she tried.',
        linguaAction: 'Translates response. Flags herbal remedy for potential drug interaction check.',
      },
      {
        description: 'Doctor needs informed consent for emergency surgery.',
        linguaAction: 'Generates consent form in K\'iche\'. Records verbal consent with timestamp.',
      },
    ],
  },
  {
    title: 'The Classroom',
    location: 'Public School, Brooklyn, New York',
    scenario:
      'A 5th-grade classroom with students speaking English, Spanish, Arabic, Bengali, and Mandarin. The teacher is explaining the American Revolution.',
    steps: [
      {
        description: 'Teacher speaks in English. Each student wears a LINGUA Earpiece.',
        linguaAction: 'Simultaneous translation to each student\'s preferred language.',
      },
      {
        description: 'Arabic-speaking student raises her hand to ask a question in Arabic.',
        linguaAction: 'Translates question to English for the teacher, and to all other languages for classmates.',
      },
      {
        description: 'Teacher gives a reading assignment from a textbook.',
        linguaAction: 'LINGUA Glass overlays translated text on each student\'s page.',
      },
    ],
  },
  {
    title: 'The Disaster',
    location: 'Earthquake Relief Camp, Turkey-Syria Border',
    scenario:
      'Survivors speak Turkish, Arabic, Kurdish, and Farsi. Aid workers speak English, French, and German. Coordination is critical. Miscommunication costs lives.',
    steps: [
      {
        description: 'Aid worker needs to triage incoming survivors.',
        linguaAction: 'LINGUA Station on Starlink. Auto-detects language of each speaker.',
      },
      {
        description: 'Kurdish-speaking man is separated from his family. He gives names and descriptions.',
        linguaAction: 'Translates and creates searchable missing persons entry across all language databases.',
      },
      {
        description: 'Medical team needs to explain treatment procedures to a Farsi-speaking woman.',
        linguaAction: 'Medical-grade translation with cultural sensitivity for end-of-life discussions.',
      },
    ],
  },
  {
    title: 'The Village',
    location: 'Remote Village, Papua New Guinea',
    scenario:
      'A linguistics team arrives at a village where the community speaks a language with no written form and fewer than 200 speakers. They have LINGUA and a Starlink dish.',
    steps: [
      {
        description: 'Team sets up LINGUA Station powered by solar and connected via Starlink.',
        linguaAction: 'Begins acoustic analysis. No known language match — entering discovery mode.',
      },
      {
        description: 'Elder speaks while pointing at objects. LINGUA listens and maps phonemes.',
        linguaAction: 'Building phonemic inventory. 47 distinct phonemes identified. Click consonants detected.',
      },
      {
        description: 'Over days, vocabulary grows. Grammar patterns emerge.',
        linguaAction: 'Auto-generating preliminary dictionary. Proposing grammatical rules for validation.',
      },
      {
        description: 'Community decides to create teaching materials for their children.',
        linguaAction: 'Generates flashcards, pronunciation exercises, and story transcriptions. All data owned by community.',
      },
    ],
  },
];

export default function HardwarePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <SpectrumGradient intensity="subtle" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lingua-amber mb-4">
            LINGUA Hardware
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight mb-6">
            The Hardware That Will{' '}
            <span className="bg-gradient-connect bg-clip-text text-transparent">
              Connect the World
            </span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Translation software is only as good as the device that delivers it.
            LINGUA is designing purpose-built hardware for every context where
            language barriers cause harm.
          </p>
        </div>
      </section>

      {/* Devices */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devices.map((device) => (
              <DeviceCard key={device.name} {...device} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Scenarios */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Where LINGUA Changes Everything
            </h2>
            <p className="text-text-secondary text-lg">
              Four scenarios. Four places where language barriers cause real harm. Four ways LINGUA helps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <UseCaseScenario key={scenario.title} {...scenario} />
            ))}
          </div>
        </div>
      </section>

      {/* Starlink Integration */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm p-8 text-center">
            <Satellite size={36} className="text-lingua-blue mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-text-primary mb-3">
              Starlink Integration
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Half the world&apos;s languages are spoken in places without reliable
              internet. LINGUA Station is designed for Starlink connectivity,
              bringing real-time translation to the most remote communities on Earth.
              Where there are people who need to be understood, LINGUA will be there.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-lingua-blue/10 text-lingua-blue">
                Satellite-first design
              </span>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-lingua-blue/10 text-lingua-blue">
                Offline core languages
              </span>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-lingua-blue/10 text-lingua-blue">
                Solar-powered option
              </span>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-lingua-blue/10 text-lingua-blue">
                Ruggedized for field use
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlists */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary text-center mb-10">
            Join the Waitlist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <WaitlistCapture productName="LINGUA Earpiece" />
            <WaitlistCapture productName="LINGUA Glass" />
            <WaitlistCapture productName="LINGUA Band" />
            <WaitlistCapture productName="LINGUA Station" />
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Handshake size={36} className="text-lingua-amber mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Hardware Partnership
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Are you a hardware manufacturer, chip designer, audio engineer, or
            accessibility technology company? LINGUA is seeking partners to bring
            these devices from concept to production. Let&apos;s build the hardware
            that connects the world.
          </p>
          <a
            href="mailto:hardware@mylingua.ai"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-amber focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
          >
            Partner With Us
          </a>
          <p className="text-gray-500 text-sm mt-4">hardware@mylingua.ai</p>
        </div>
      </section>
    </div>
  );
}
