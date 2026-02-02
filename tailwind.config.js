/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Muted Sage Green (Claude-inspired, sophisticated)
        'sage': {
          50: '#f7f9f7',
          100: '#eff3ef',
          200: '#e2e8e2',
          300: '#cdd6cd',
          400: '#adbcad',
          500: '#8b9e8b',
          600: '#6b7c6b',
          700: '#576557',
          800: '#485248',
          900: '#3d453d',
          950: '#212621',
        },

        // Accent - Warm Terracotta (softer, earthy)
        'terra': {
          50: '#fdf8f6',
          100: '#fbf0eb',
          200: '#f5ddd3',
          300: '#ecc4b3',
          400: '#d9a48d',
          500: '#c4846a',
          600: '#b06a50',
          700: '#935542',
          800: '#7a4839',
          900: '#663d31',
          950: '#371e18',
        },

        // Neutral - Warm Cream/Taupe (Claude-inspired)
        'cream': {
          50: '#fdfcfa',
          100: '#faf8f5',
          200: '#f5f0ea',
          300: '#ebe4db',
          400: '#d4ccc4',
          500: '#bdb3a8',
          600: '#9f9387',
          700: '#847869',
          800: '#6d6358',
          900: '#5a524a',
          950: '#2f2b27',
        },

        // Deep tones
        'forest': '#2d2a26',
        'midnight': '#1c1b19',

        // Surface system
        'surface': {
          DEFAULT: '#faf8f5',
          warm: '#f5f0ea',
          muted: '#ebe4db',
        },
      },

      fontFamily: {
        display: ['Suisse BP Intl', 'system-ui', 'sans-serif'],
        body: ['Neue Montreal', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Display sizes - massive, impactful
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],

        // Heading sizes
        'heading-lg': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading': ['clamp(1.5rem, 2.5vw, 1.875rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],

        // Body sizes
        'body-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.005em' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],

        // Label/UI sizes
        'label-lg': ['0.9375rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }],
        'label': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '600' }],
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      animation: {
        'float': 'float 8s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      boxShadow: {
        'soft': '0 2px 20px -5px rgba(30, 42, 28, 0.08)',
        'soft-lg': '0 8px 40px -10px rgba(30, 42, 28, 0.12)',
        'soft-xl': '0 20px 60px -15px rgba(30, 42, 28, 0.15)',
        'glow': '0 0 60px -10px rgba(139, 171, 115, 0.3)',
        'glow-terra': '0 0 60px -10px rgba(224, 109, 71, 0.25)',
        'inner-soft': 'inset 0 2px 20px rgba(30, 42, 28, 0.03)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-organic': 'radial-gradient(ellipse 80% 50% at 50% -20%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
