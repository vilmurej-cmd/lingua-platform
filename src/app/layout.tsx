import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
