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
          DEFAULT: "#123B2C", // deep green — headings, footer background
          700: "#0E2F23",
        },
        leaf: {
          DEFAULT: "#8DC152", // bright playful green — accent text, CTA button
          light: "#EAF3E1",   // soft green background wash
          circle: "#DCEBD4",  // icon circle background
        },
        sage: {
          DEFAULT: "#8FAE93",
          light: "#DCE8DD",
        },
        cream: "#FBF9F3",
        blush: "#F7D9D9", // soft accent for stat pills
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
