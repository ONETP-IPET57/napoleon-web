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
      height: {
        '10-screen': '10vh',
        '20-screen': '20vh',
        '30-screen': '30vh',
        '40-screen': '40vh',
        '50-screen': '50vh',
        '60-screen': '60vh',
        '70-screen': '70vh',
        '80-screen': '80vh',
        '90-screen': '90vh',
      },
    },
  },
  plugins: [],
};
