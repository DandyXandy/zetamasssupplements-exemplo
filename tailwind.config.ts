import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        tinta: {
          DEFAULT: '#0A0B09',
          800: '#121309',
        },
        carbon: {
          DEFAULT: '#16180F',
          700: '#1E2115',
          600: '#2A2E1E',
        },
        lima: {
          DEFAULT: '#62C33E',
          light: '#8FDB6C',
          dark: '#3F8A26',
        },
        oro: {
          DEFAULT: '#C9A24B',
          light: '#E1C077',
        },
        hueso: '#F4EFE4',
        mostaza: '#F5B914',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'sans-serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'lima-gradient': 'linear-gradient(135deg, #3F8A26 0%, #62C33E 55%, #8FDB6C 100%)',
        'tinta-fade': 'linear-gradient(180deg, transparent 0%, #0A0B09 100%)',
        'tinta-fade-top': 'linear-gradient(0deg, transparent 0%, #0A0B09 100%)',
      },
      letterSpacing: {
        widest2: '0.18em',
      },
    },
  },
  plugins: [],
};

export default config;
