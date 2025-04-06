/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#B91C1C',
        'secondary': '#1C4AB9',
        'dark': '#1E293B',
      },
    },
  },
  plugins: [],
}
