import Link from 'next/link';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/ancient', label: 'Ancient' },
  { href: '/health', label: 'Health' },
  { href: '/hardware', label: 'Hardware' },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-lingua-border-light">
      {/* Spectrum gradient line */}
      <div
        className="h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, #3B82F6, #8B5CF6, #FB7185, #F59E0B, #14B8A6, #10B981)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Quote */}
        <blockquote className="text-center mb-12">
          <p className="font-serif text-xl md:text-2xl italic text-text-primary leading-relaxed max-w-3xl mx-auto">
            &ldquo;No voice goes unheard. No dream goes unrealized. No being
            goes forgotten.&rdquo;
          </p>
        </blockquote>

        {/* Links */}
        <nav aria-label="Footer navigation" className="mb-10">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8" role="list">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Branding */}
        <div className="text-center space-y-2">
          <p
            className="font-serif text-lg font-bold tracking-tight"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #3B82F6, #8B5CF6, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LINGUA
          </p>
          <p className="text-sm text-text-secondary">
            A Vilmure Ventures Company
          </p>
          <p className="text-xs text-text-muted pt-2">
            Built with love for every human being
          </p>
        </div>
      </div>
    </footer>
  );
}
