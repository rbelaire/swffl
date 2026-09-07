import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette — navy & white.
        navy: {
          DEFAULT: "#0a1930",
          950: "#060f1f",
          900: "#0a1930",
          800: "#0f2444",
          700: "#153058",
          600: "#1d3f70",
          500: "#2a5490",
        },
        paper: "#f7f8fa",
        // Restrained championship accent (used sparingly for trophies/titles).
        gold: {
          DEFAULT: "#c8a24a",
          soft: "#e4cf94",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,25,48,0.06), 0 8px 24px -12px rgba(10,25,48,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
