'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/translate', label: 'Translate' },
  { href: '/learn', label: 'Learn' },
  { href: '/sign', label: 'Sign' },
  { href: '/sight', label: 'Sight' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
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
    <>
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
                    {link.label}
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
          <div className="flex items-center gap-3">
            <Link
              href="/translate"
              className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-amber focus-visible:ring-offset-2"
              style={{
                background:
                  'linear-gradient(135deg, #F59E0B, #F97316)',
              }}
            >
              Start
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
                        {link.label}
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
                    Start
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
