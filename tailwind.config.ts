import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#123B2C', 700: '#0E2F23' },
        leaf: { DEFAULT: '#8DC152', light: '#EAF3E1', circle: '#DCEBD4' },
        sage: { DEFAULT: '#8FAE93', light: '#DCE8DD' },
        cream: '#FBF9F3',
        blush: '#F7D9D9',
        brand: { 50: '#F0F7EB', 100: '#EAF3E1', 600: '#4F7F2E', 700: '#3D6623', 800: '#294B18' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
