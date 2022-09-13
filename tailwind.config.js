/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['bebas-neue', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      aspectRatio: {
        cine: '21 / 9',
      },
    },
  },
  plugins: [],
};
