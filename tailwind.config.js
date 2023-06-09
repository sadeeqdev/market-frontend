/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontSize: {
        lg: '1.0625rem', // Change this value to your desired size
      },
      screens: {
        '3xl': "1920px",
      },
      colors: {
        'lavendar-purple': '#BCC3E7',
        'turtoise-green': '#5DDEFA'
      }
    },
  },
  plugins: [],
}

