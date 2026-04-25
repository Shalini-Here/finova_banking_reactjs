// tailwind.config.js — Tailwind CSS configuration
// Scans all JSX/JS files for class names, sets Google Sans as default font
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enables class-based dark mode (toggled via ThemeContext)
  theme: {
    extend: {
      fontFamily: {
        // "Google Sans" is actually "Product Sans" on Google Fonts CDN
        sans: ['"Google Sans"', '"Product Sans"', 'sans-serif'],
      },
      colors: {
        // ── Finova Brand Colors ────────────────────────────────
        primary:   '#5B6CFF', // blue  = trust / banking
        secondary: '#8B9DFF', // lighter blue = hover states
        accent:    '#22C55E', // green = money / success
        // Light theme
        'bg-light':   '#F5F7FB',
        'card-light': '#FFFFFF',
        'text-light': '#1E293B',
        'muted':      '#64748B',
        'border':     '#E2E8F0',
        // Dark theme
        'bg-dark':    '#0F172A',
        'card-dark':  '#1E293B',
        'text-dark':  '#F1F5F9',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease forwards',
        'slide-up':   'slideUp 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 },                 to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
