/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#348ad2',     // Bright Blue - main action color
        'secondary': '#d27c34',   // Orange - secondary actions and accents
        'accent': '#4d784f',      // Forest Green - highlights and nature elements
        'neutral': '#ddd7d2',     // Light Gray - backgrounds and cards
        'dark': '#1a4569',        // Deep Navy - text and dark elements
      },
    },
  },
  plugins: [],
}
