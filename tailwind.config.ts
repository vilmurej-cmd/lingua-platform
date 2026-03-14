import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lingua: {
          blue: "#3B82F6",
          teal: "#14B8A6",
          amber: "#F59E0B",
          rose: "#FB7185",
          violet: "#8B5CF6",
          emerald: "#10B981",
          orange: "#F97316",
          cyan: "#06B6D4",
          border: "#E2E8F0",
          "border-light": "#F1F5F9",
        },
        bg: {
          primary: "#FAFBFC",
          warm: "#FFF7ED",
          cool: "#EFF6FF",
          card: "#FFFFFF",
          dark: "#0F172A",
        },
        text: {
          primary: "#1E293B",
          secondary: "#475569",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-playfair)",
          "Playfair Display",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-jakarta)",
          "Plus Jakarta Sans",
          "var(--font-noto)",
          "Noto Sans",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "gentle-pulse": "gentlePulse 3s ease-in-out infinite",
        "spectrum-shift": "spectrumShift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        wave: "wave 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        gentlePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        spectrumShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%, 100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
