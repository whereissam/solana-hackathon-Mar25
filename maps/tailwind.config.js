const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#9333ea', // Purple color
      secondary: '#475569', // Slate-600 equivalent
      dark: '#0f172a', // Slate-900 equivalent
      light: '#e2e8f0', // Slate-200 equivalent
      white: '#f8fafc', // Slate-50 equivalent
      error: '#b91c1c', // Red-700 equivalent
      // Add these basic colors to fix Leaflet CSS issues
      black: '#000',
      gray: {
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
      },
      red: {
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c'
      },
      green: {
        500: '#22c55e',
        600: '#16a34a'
      },
      blue: {
        500: '#3b82f6'
      },
      yellow: {
        400: '#facc15'
      },
      purple: {
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce'
      }
    },
    extend: {
      fontSize: {
        base: ['18px', '24px'],
      },
      fontFamily: {
        sans: ['var(--font-catamaran)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
