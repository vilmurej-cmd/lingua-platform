import { Metadata } from 'next';
import { Shield, Eye, Heart, Lock, Users, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — LINGUA',
  description: 'LINGUA privacy policy. Zero conversation storage. Translations are transient.',
};

const sections = [
  {
    icon: Eye,
    title: 'Zero Conversation Storage',
    content: [
      'LINGUA does not store the content of your translations or conversations. When you translate a sentence, the input and output are processed in real time and immediately discarded. We do not build profiles from your translation history.',
      'Your words are yours. We process them to help you communicate, and then we let them go.',
    ],
  },
  {
    icon: Lock,
    title: 'Translations Are Transient',
    content: [
      'Translation data is processed in memory and is not written to persistent storage. No translation text is saved to any database, log file, or data warehouse. This applies to all LINGUA products: Voice, Sign, Sight, Ancient, Learn, and Health.',
      'If you use LINGUA\'s practice or learning features, your progress data (not your conversations) may be stored locally on your device to enable continuity. This data never leaves your device without your explicit consent.',
    ],
  },
  {
    icon: Heart,
    title: 'Medical Conversations: Extra Privacy',
    content: [
      'LINGUA Health is designed for medical translation environments. Medical conversations receive additional privacy protections:',
      'No medical translation content is stored, logged, or transmitted beyond the immediate translation session. Medical conversations are encrypted end-to-end when using LINGUA hardware. LINGUA Health is designed to be HIPAA-compatible for use in U.S. healthcare settings.',
      'We understand that medical communication is among the most sensitive uses of translation technology. We treat it accordingly.',
    ],
  },
  {
    icon: Users,
    title: 'COPPA Compliance',
    content: [
      'LINGUA does not knowingly collect personal information from children under 13 years of age. LINGUA Learn\'s educational features are designed to be used by children under parental or educator supervision.',
      'If you believe a child under 13 has provided personal information to LINGUA, please contact us immediately at privacy@mylingua.ai.',
    ],
  },
  {
    icon: Globe,
    title: 'GDPR and CCPA Compliance',
    content: [
      'For users in the European Union, United Kingdom, and European Economic Area, LINGUA complies with the General Data Protection Regulation (GDPR). For users in California, LINGUA complies with the California Consumer Privacy Act (CCPA).',
      'You have the right to: access any personal data we hold about you, request deletion of your data, request a copy of your data in a portable format, opt out of any data processing, and withdraw consent at any time.',
      'Because LINGUA does not store translation content, there is very little personal data to access or delete. We collect only what is necessary to provide the service: device type, language preferences, and anonymous usage statistics.',
    ],
  },
  {
    icon: Shield,
    title: 'Data We Do Collect',
    content: [
      'LINGUA collects minimal data to improve the service:',
      'Anonymous usage statistics (which language pairs are most used, which features are most popular). Device type and operating system version for compatibility purposes. Crash reports and error logs (which never contain translation content). Email address if you join a waitlist or contact us.',
      'We do not sell, share, or trade any user data with third parties. We do not use your data for advertising. We do not use translation data to train AI models.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-lg mb-2">
            Your voice is sacred. We treat it that way.
          </p>
          <p className="text-text-muted text-sm mb-12">Last updated: March 2026</p>

          <div className="space-y-10">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-lingua-blue/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-lingua-blue" />
                    </div>
                    <h2 className="font-serif text-xl font-bold text-text-primary">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-3 pl-[52px]">
                    {section.content.map((paragraph, i) => (
                      <p key={i} className="text-sm text-text-secondary leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 pt-8 border-t border-lingua-border-light">
            <h2 className="font-serif text-xl font-bold text-text-primary mb-4">
              Contact Us
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              If you have any questions about this privacy policy or LINGUA&apos;s
              data practices, please contact us at{' '}
              <a
                href="mailto:privacy@mylingua.ai"
                className="text-lingua-blue hover:text-lingua-blue/80 underline"
              >
                privacy@mylingua.ai
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
