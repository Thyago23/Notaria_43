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
          DEFAULT: '#8cc550', // Updated primary green
          hover: '#74b03f',
        },
        secondary: '#378b84', // Teal color (unchanged)
        dark: '#1a1a1a', // Dark slate
        light: '#f3f4f6', // Light gray background
        muted: '#a08170', // Muted brown (kept for compatibility)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
