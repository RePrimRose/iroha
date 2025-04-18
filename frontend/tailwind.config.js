/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        sakura: '#F4C2C2',
        traditionalBlue: '#264653',
      },
    },
  },
  plugins: [],
};
