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
        // Ljust, rent kundalini-tema
        'kundalini': {
          // Mjuk salviagrön / ljusgrön
          green: '#9cb89b',
          'green-light': '#c8d9c7',
          'green-dark': '#7a9a79',
          'green-pale': '#e8f0e8',
          // Varm sand/guld för accenter
          gold: '#c9a86c',
          'gold-light': '#e0d0a8',
          // Mjuk lavendel för variation
          lavender: '#b8a9c9',
          'lavender-light': '#e8e0f0',
        },
        // Bakgrunder - ljusa, rena
        'surface': {
          white: '#ffffff',
          cream: '#faf9f7',
          warm: '#f5f3f0',
          muted: '#e8e6e3',
        },
        // Text
        'text': {
          primary: '#2d3a2d',    // Mjuk mörkgrön
          secondary: '#5a6a5a',  // Mellangrön
          muted: '#8a958a',      // Ljusgrön/grå
        }
      },
      fontFamily: {
        // Rund, mjuk sans-serif för allt
        display: ['Nunito', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
