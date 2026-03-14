import { Metadata } from 'next';
import { FileText, AlertTriangle, Heart, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — LINGUA',
  description: 'LINGUA terms of service. Translation accuracy disclaimer. Medical disclaimer.',
};

export default function TermsPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-text-muted text-sm mb-12">Last updated: March 2026</p>

          {/* Acceptance */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-lingua-blue/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-lingua-blue" />
                </div>
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Acceptance of Terms
                </h2>
              </div>
              <div className="space-y-3 pl-[52px]">
                <p className="text-sm text-text-secondary leading-relaxed">
                  By accessing or using LINGUA (&ldquo;the Service&rdquo;), you agree to
                  be bound by these Terms of Service. If you do not agree to these
                  terms, please do not use the Service.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  LINGUA is provided by Vilmure Ventures LLC (&ldquo;we,&rdquo;
                  &ldquo;us,&rdquo; &ldquo;our&rdquo;). We reserve the right to
                  update these terms at any time. Continued use of the Service
                  after changes constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>

            {/* Use of Service */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-lingua-emerald/10 flex items-center justify-center flex-shrink-0">
                  <Scale size={20} className="text-lingua-emerald" />
                </div>
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Use of the Service
                </h2>
              </div>
              <div className="space-y-3 pl-[52px]">
                <p className="text-sm text-text-secondary leading-relaxed">
                  LINGUA provides AI-powered language translation, learning,
                  preservation, and accessibility tools. The Service is intended for
                  personal, educational, and professional use.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  You agree not to: use the Service for any unlawful purpose;
                  attempt to reverse-engineer, decompile, or extract the source code
                  of LINGUA&apos;s AI models; use the Service to generate content that
                  is harmful, deceptive, or violates the rights of others; resell,
                  sublicense, or redistribute the Service without written permission.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We reserve the right to suspend or terminate access to the Service
                  for violations of these terms.
                </p>
              </div>
            </div>

            {/* Translation Accuracy */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-lingua-amber/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={20} className="text-lingua-amber" />
                </div>
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Translation Accuracy Disclaimer
                </h2>
              </div>
              <div className="space-y-3 pl-[52px]">
                <p className="text-sm text-text-secondary leading-relaxed">
                  LINGUA uses artificial intelligence to provide translations. While
                  we strive for the highest possible accuracy, <strong>no AI
                  translation system is perfect</strong>. Translations may contain
                  errors, omissions, or misinterpretations.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong>Do not rely solely on LINGUA translations for:</strong>{' '}
                  legal contracts, medical diagnoses or treatment decisions, financial
                  documents, safety-critical communications, or any situation where a
                  translation error could cause harm.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  For high-stakes situations, we recommend using LINGUA as a
                  supplement to, not a replacement for, professional human
                  interpretation services.
                </p>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-lingua-rose/10 flex items-center justify-center flex-shrink-0">
                  <Heart size={20} className="text-lingua-rose" />
                </div>
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Medical Disclaimer
                </h2>
              </div>
              <div className="space-y-3 pl-[52px]">
                <p className="text-sm text-text-secondary leading-relaxed">
                  LINGUA Health is designed to assist with medical translation but
                  <strong> is not a medical device</strong> and is not FDA-approved.
                  It should not be used as the sole means of communication in
                  life-threatening medical situations.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Medical translation through LINGUA is provided as an aid to
                  communication between healthcare providers and patients. Healthcare
                  providers retain full responsibility for clinical decisions.
                  LINGUA does not provide medical advice, diagnoses, or treatment
                  recommendations.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  In emergency situations, always prioritize established medical
                  communication protocols and certified medical interpreters when
                  available.
                </p>
              </div>
            </div>

            {/* Ancient Languages */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-lingua-violet/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-lingua-violet" />
                </div>
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Historical and Ancient Language Content
                </h2>
              </div>
              <div className="space-y-3 pl-[52px]">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Content related to ancient languages, historical scripts, cave art,
                  and sacred texts is presented for educational purposes. Translations
                  of ancient texts represent scholarly interpretations and may be
                  subject to academic debate. Pronunciation reconstructions are
                  speculative and based on current linguistic scholarship.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Sacred texts are presented with respect for the living traditions
                  they represent. LINGUA does not endorse any particular religious
                  interpretation.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-lingua-blue/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-lingua-blue" />
                </div>
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Intellectual Property
                </h2>
              </div>
              <div className="space-y-3 pl-[52px]">
                <p className="text-sm text-text-secondary leading-relaxed">
                  LINGUA, its logo, design, and proprietary technology are the
                  intellectual property of Vilmure Ventures LLC. You may not copy,
                  modify, distribute, or create derivative works based on LINGUA
                  without prior written consent.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  User-generated content (translations, learning progress,
                  community contributions) remains the property of the user.
                  Language preservation data collected through community partnerships
                  remains the property of the respective community.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-lingua-amber/10 flex items-center justify-center flex-shrink-0">
                  <Scale size={20} className="text-lingua-amber" />
                </div>
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Limitation of Liability
                </h2>
              </div>
              <div className="space-y-3 pl-[52px]">
                <p className="text-sm text-text-secondary leading-relaxed">
                  LINGUA is provided &ldquo;as is&rdquo; and &ldquo;as
                  available&rdquo; without warranties of any kind, either express or
                  implied. We do not guarantee that translations will be error-free,
                  complete, or suitable for any particular purpose.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  To the maximum extent permitted by applicable law, Vilmure Ventures
                  LLC shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages arising from or related to your
                  use of the Service.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-16 pt-8 border-t border-lingua-border-light">
            <h2 className="font-serif text-xl font-bold text-text-primary mb-4">
              Contact
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              For questions about these Terms of Service, contact us at{' '}
              <a
                href="mailto:legal@mylingua.ai"
                className="text-lingua-blue hover:text-lingua-blue/80 underline"
              >
                legal@mylingua.ai
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
