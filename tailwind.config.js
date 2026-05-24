/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        black: '#000000',
        gray: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
          600: '#4B5563',
        }
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
        luxury: ['Sora', 'sans-serif'],
        professional: ['Sora', 'sans-serif'],
        elegant: ['Sora', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0em',
        wide: '0.025em',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.6',
        relaxed: '1.75',
        loose: '2',
      },
    },
  },
  plugins: [],
}
