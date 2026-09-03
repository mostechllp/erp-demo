/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#f5f6f8',
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#7c8cf8',
          500: '#4f5bd5',
          600: '#3b46b8',
          700: '#2f3796',
          800: '#252c78',
          900: '#1b2059',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
        raised: '0 4px 12px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
        overlay: '0 16px 40px -8px rgba(16, 24, 40, 0.22)',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
      },
      transitionTimingFunction: {
        erp: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
