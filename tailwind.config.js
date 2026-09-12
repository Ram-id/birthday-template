/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          bg: '#F9F6F0',
          card: '#FFFFFF',
          cream: '#F4EFEA',
          charcoal: '#1C1917',
          stone: '#44403C',
          muted: '#78716C',
          border: '#E7E2D9',
          terracotta: '#9A6B63',
          sand: '#D6CBC1',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '.2em',
        editorial: '.15em',
      },
      boxShadow: {
        editorial: '0 20px 40px -15px rgba(28, 25, 23, 0.07), 0 0 0 1px rgba(231, 226, 217, 0.6)',
        subtle: '0 4px 20px -2px rgba(28, 25, 23, 0.05)',
      }
    },
  },
  plugins: [],
};
