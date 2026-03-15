'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/lib/language-context';
import UniversalLanguageSelector from './UniversalLanguageSelector';

// ----- Nav Links (key-based for translation) -----

const navLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/translate', labelKey: 'nav.translate' },
  { href: '/learn', labelKey: 'nav.learn' },
  { href: '/sign', labelKey: 'nav.sign' },
  { href: '/sight', labelKey: 'nav.sight' },
  { href: '/about', labelKey: 'nav.about' },
];

const footerPlatformLinks = [
  { href: '/translate', labelKey: 'nav.translate' },
  { href: '/learn', labelKey: 'nav.learn' },
  { href: '/sign', labelKey: 'nav.sign' },
  { href: '/health', labelKey: 'nav.health' },
];

const footerExploreLinks = [
  { href: '/ancient', labelKey: 'nav.ancient' },
  { href: '/conversation', labelKey: 'nav.conversation' },
  { href: '/sight', labelKey: 'nav.sight' },
  { href: '/hardware', labelKey: 'nav.hardware' },
];

const footerLegalLinks = [
  { href: '/privacy', labelKey: 'nav.privacy' },
  { href: '/terms', labelKey: 'nav.terms' },
  { href: '/about', labelKey: 'nav.about' },
];

// ----- Inner Layout (has access to useLanguage) -----

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { t, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setMobileOpen(false);
  }, []);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Spectrum gradient accent line */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, #3B82F6, #8B5CF6, #FB7185, #F59E0B, #14B8A6, #10B981)',
        }}
      />

      <header
        className={`fixed top-[2px] left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
        onKeyDown={handleKeyDown}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 rounded"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #3B82F6, #8B5CF6, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LINGUA
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                      active
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {t(link.labelKey)}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, #3B82F6, #8B5CF6, #F59E0B)',
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Universal Language Selector */}
            <UniversalLanguageSelector />

            <Link
              href="/translate"
              className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-amber focus-visible:ring-offset-2"
              style={{
                background:
                  'linear-gradient(135deg, #F59E0B, #F97316)',
              }}
            >
              {t('hero.cta')}
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-lingua-border-light bg-white"
            >
              <ul className="flex flex-col px-6 py-4 gap-1" role="list">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-blue focus-visible:ring-offset-2 ${
                          active
                            ? 'bg-gray-50 text-text-primary'
                            : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <Link
                    href="/translate"
                    className="block text-center px-5 py-3 text-base font-semibold text-white rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-amber focus-visible:ring-offset-2"
                    style={{
                      background:
                        'linear-gradient(135deg, #F59E0B, #F97316)',
                    }}
                  >
                    {t('hero.cta')}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[66px]" />

      {/* Main content */}
      <main id="main-content" role="main" tabIndex={-1} className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
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
              &ldquo;{t('footer.mission')}&rdquo;
            </p>
          </blockquote>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <p
                className="font-serif text-lg font-bold tracking-tight mb-3"
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
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('hero.title')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                {footerPlatformLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-lingua-blue transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                {footerExploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-lingua-blue transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                {footerLegalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-lingua-blue transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Branding */}
          <div className="pt-6 border-t border-lingua-border text-center space-y-2">
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
              {t('footer.company')}
            </p>
            <p className="text-xs text-text-muted pt-2">
              Built with love for every human being
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ----- Exported ClientLayout (wraps with LanguageProvider) -----

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <InnerLayout>{children}</InnerLayout>
    </LanguageProvider>
  );
}
