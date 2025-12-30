/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pirate Booty Theme
        navy: {
          50: '#e8eaf6',
          100: '#c5cae9',
          200: '#9fa8da',
          300: '#7986cb',
          400: '#5c6bc0',
          500: '#3f51b5',
          600: '#3949ab',
          700: '#303f9f',
          800: '#283593',
          900: '#1a237e',
          950: '#0A1929', // Primary dark
        },
        ocean: {
          DEFAULT: '#1B3A52', // Secondary
          light: '#2C5F85',
          dark: '#0F2332',
        },
        gold: {
          DEFAULT: '#FFB300', // Accent
          light: '#FFC947',
          dark: '#C88400',
        },
        treasure: {
          DEFAULT: '#4CAF50', // Success green
          light: '#66BB6A',
          dark: '#388E3C',
        },
      },
      backgroundImage: {
        'pirate-pattern': "url('/assets/patterns/rope.svg')",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        pirate: ['Pirata One', 'cursive'],
      },
    },
  },
  plugins: [],
}
