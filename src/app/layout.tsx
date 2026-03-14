import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const noto = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LINGUA — Every Voice Deserves To Be Understood",
  description:
    "LINGUA is the universal understanding platform — bridging languages, cultures, and history through AI-powered translation, learning, and preservation.",
  keywords: [
    "translation",
    "language learning",
    "endangered languages",
    "sign language",
    "ancient languages",
    "medical translation",
    "accessibility",
  ],
  openGraph: {
    title: "LINGUA — Every Voice Deserves To Be Understood",
    description:
      "The universal understanding platform — bridging languages, cultures, and history.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${jakarta.variable} ${noto.variable} antialiased bg-primary text-primary`}
      >
        {/* Skip navigation link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-lingua-blue focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:ring-offset-2 transition-all"
        >
          Skip to main content
        </a>

        {/* Navigation wrapper */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="sticky top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-lingua-border"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2 group" aria-label="LINGUA home">
                <span className="text-2xl font-serif font-bold bg-gradient-connect bg-clip-text text-transparent">
                  LINGUA
                </span>
              </a>
              <div className="hidden md:flex items-center gap-6">
                <a href="/translate" className="nav-link">Translate</a>
                <a href="/learn" className="nav-link">Learn</a>
                <a href="/sign" className="nav-link">Sign Language</a>
                <a href="/ancient" className="nav-link">Ancient</a>
                <a href="/health" className="nav-link">Health</a>
                <a href="/conversation" className="nav-link">Conversation</a>
                <a href="/sight" className="nav-link">Sight</a>
                <a href="/hardware" className="nav-link">Hardware</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main id="main-content" role="main" tabIndex={-1} className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer
          role="contentinfo"
          className="border-t border-lingua-border bg-bg-warm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-serif font-bold text-lg mb-3">LINGUA</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Every voice deserves to be understood.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Platform</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li><a href="/translate" className="hover:text-lingua-blue transition-colors">Translate</a></li>
                  <li><a href="/learn" className="hover:text-lingua-blue transition-colors">Learn</a></li>
                  <li><a href="/sign" className="hover:text-lingua-blue transition-colors">Sign Language</a></li>
                  <li><a href="/health" className="hover:text-lingua-blue transition-colors">Medical</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Explore</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li><a href="/ancient" className="hover:text-lingua-blue transition-colors">Ancient Languages</a></li>
                  <li><a href="/conversation" className="hover:text-lingua-blue transition-colors">Conversation</a></li>
                  <li><a href="/sight" className="hover:text-lingua-blue transition-colors">Sight Translation</a></li>
                  <li><a href="/demo" className="hover:text-lingua-blue transition-colors">Demo</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li><a href="/privacy" className="hover:text-lingua-blue transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-lingua-blue transition-colors">Terms of Service</a></li>
                  <li><a href="/about" className="hover:text-lingua-blue transition-colors">About</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-lingua-border text-center text-sm text-muted">
              <p>&copy; {new Date().getFullYear()} LINGUA. Built with respect for every language and culture.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
