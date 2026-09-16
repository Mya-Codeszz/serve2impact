import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1F3A2E", // primary wordmark / nav text
          700: "#2A4A3A",
        },
        sage: {
          DEFAULT: "#8FAE93", // heart icon, pill backgrounds
          light: "#DCE8DD",
        },
        sun: {
          DEFAULT: "#E8C15A", // sparkles / accent CTA
        },
        cream: "#FBF9F3",
        clay: "#8B5E3C",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
    },
  },
  plugins: [],
};

export default config;
