/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caprasimo: ['Caprasimo', 'cursive'],
      },
      colors: {
        'custom-red': '#D65C67',
        'custom-red-dark': '#920B2B',
        'custom-peach': '#FDEBE5',
        'custom-peach-medium': '#FFD2C3',
        'custom-peach-dark': '#F8757D',
        'custom-purple': '#543B75',
      }
    },
  },
  plugins: [],
}

