/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom': '840px',
      },
      colors: {
        brand: {
          primary: 'rgb(21, 47, 84)',
          secondary: 'rgb(0, 61, 147)',
          light: '#5ea3ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
