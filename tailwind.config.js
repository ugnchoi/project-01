// tailwind.config.cjs
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: defaultTheme.fontSize,
    spacing: defaultTheme.spacing,
    screens: defaultTheme.screens,
    extend: {
      colors,
      fontWeight: { 400: '400', 500: '500', 600: '600', 700: '700' },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.font-medium': { fontWeight: theme('fontWeight.500') },
        '.font-semibold': { fontWeight: theme('fontWeight.600') },
        '.font-bold': { fontWeight: theme('fontWeight.700') },
      });
    }),
  ],
};
