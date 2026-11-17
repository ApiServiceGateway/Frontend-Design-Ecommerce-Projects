import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#FDF8F8',
          card: '#FFFFFF',
          container: '#F2EDED',
          dark: '#111827',
          obsidian: '#121316',
        },
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f7f2f2',
        'surface-container': '#f2eded',
        'surface-container-high': '#ece7e7',
        'surface-container-highest': '#e6e1e1',
        'color-accent-highlight': '#14CDA8',
        'brand-green': '#1ea768',
        'color-text-primary': '#111827',
        'color-text-secondary': '#4B5563',
        'color-text-muted': '#9CA3AF',
        'color-border-subtle': '#E5E7EB',
        brand: {
          primary: '#FF3F6C',
          'primary-hover': '#e0325d',
          teal: '#14CDA8',
          'teal-dark': '#006857',
          gold: '#EAB308',
        },
        content: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
        },
        border: {
          subtle: '#E5E7EB',
          dark: '#263143',
        },
      },
      fontFamily: {
        sans: ['var(--font-figtree)', 'Figtree', 'sans-serif'],
        body: ['var(--font-figtree)', 'Figtree', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
