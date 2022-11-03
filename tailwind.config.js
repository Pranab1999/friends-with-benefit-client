/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'btn-green': '#21ba45',
        'btn-blue': '#2185d0',
        'btn-cyan': '#00b5ad',
        'btn-red': '#db2828',
        'light' : '#7a8188',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}