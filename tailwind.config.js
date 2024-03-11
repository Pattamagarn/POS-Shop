/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'pos-primary' : '#8919FA',
      'pos-secondary' : '#E3C7FF',
      // 'accent' : '#A5DC86',
      'pos-white' : '#FFFFFF',
      'pos-neutral' : '#D9D9D9',
      'pos-success' : '#A5DC86',
      'pos-error' : '#F27474',
      'pos-info' : '#3FC3EE'
    },
    extend: {
      fontFamily :{
        Kanit : ["Kanit","sans-serif"],
      }
    },
  },
  plugins: [require("daisyui")],
}