/** @type {import('tailwindcss').Config} */
// Design tokens — single source of truth. See DESIGN.md.
// Hex values are defined ONCE here; components must not hard-code colors/px.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        base: '#FFFDF7',        // warm cream page background
        surface: '#FFFFFF',     // cards / panels
        // Text
        ink: {
          DEFAULT: '#22303A',
          muted: '#5B6B76',
        },
        // Brand
        primary: {
          DEFAULT: '#3B82F6',
          strong: '#2563EB',    // hover
          soft: '#EFF6FF',      // tint background
        },
        secondary: {
          DEFAULT: '#F59E0B',
          strong: '#D97706',
          soft: '#FFF7ED',
        },
        // Feedback (always paired with icon + text, never color-only)
        success: {
          DEFAULT: '#22C55E',
          strong: '#16A34A',
          soft: '#F0FDF4',
          ink: '#15803D',
        },
        error: {
          DEFAULT: '#EF4444',
          strong: '#DC2626',
          soft: '#FEF2F2',
          ink: '#B91C1C',
        },
        // Restrained accents (badges / scores / grade identity)
        violet: { DEFAULT: '#A855F7', soft: '#F5F0FF', ink: '#7E22CE' },
        teal: { DEFAULT: '#14B8A6', soft: '#EFFCF9', ink: '#0F766E' },
        // Neutral hairline
        line: '#ECE7DC',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Big, kid-readable question + answer sizes
        'answer': ['1.875rem', { lineHeight: '1.2', fontWeight: '700' }],
        'question-sm': ['1.75rem', { lineHeight: '1.35', fontWeight: '700' }],
        'question': ['2.75rem', { lineHeight: '1.15', fontWeight: '700' }],
        'question-lg': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      spacing: {
        touch: '3rem',     // 48px — minimum touch target for kids
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
      },
      minHeight: { touch: '3rem' },
      minWidth: { touch: '3rem' },
      borderRadius: {
        md: '12px',
        lg: '20px',
        xl: '28px',
        pill: '9999px',
      },
      boxShadow: {
        // Shadows tinted to the ink hue, never pure black
        card: '0 4px 16px -2px rgba(34, 48, 58, 0.08)',
        'card-hover': '0 10px 28px -4px rgba(34, 48, 58, 0.14)',
        pop: '0 6px 0 0 rgba(34, 48, 58, 0.10)',
        focus: '0 0 0 4px rgba(59, 130, 246, 0.35)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '60%': { transform: 'scale(1.04)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-8px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(34px) rotate(220deg)', opacity: '0' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        pop: 'pop 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        confetti: 'confetti-fall 0.9s ease-in forwards',
        'bounce-soft': 'bounce-soft 0.8s ease-in-out 2',
      },
    },
  },
  plugins: [],
}
