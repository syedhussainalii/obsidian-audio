/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#050505',
          dark: '#121212',
          gray: '#2A2A2A',
          light: '#F5F5F5',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use a clean geometric font via Google Fonts
      }
    },
  },
  plugins: [],
}