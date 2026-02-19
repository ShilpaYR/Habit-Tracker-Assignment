/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glass-green': {
          light: '#d1fae5',
          DEFAULT: '#a7f3d0',
          dark: '#6ee7b7',
        },
        'glass-purple': {
          light: '#ddd6fe',
          DEFAULT: '#e9d5ff',
          dark: '#c4b5fd',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
