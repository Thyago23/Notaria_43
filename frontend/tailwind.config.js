/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b89369', // Brown/Gold color
          hover: '#9a7a56',
        },
        secondary: '#378b84', // Teal color
        dark: '#1a1a1a', // Dark slate
        light: '#f3f4f6', // Light gray background
        muted: '#a08170', // Muted brown
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
