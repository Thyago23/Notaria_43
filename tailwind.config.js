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
          DEFAULT: '#0D3B2E', // Verde botella profundo (Títulos, botones principales y estructura)
          hover: '#134E3F',   // Un tono sutilmente más claro para interactividad/hovers
        },
        secondary: '#D8E2DC', // Menta pastel desaturado (Fondo de bloques, tarjetas de servicios y la timeline)
        dark: '#1A2421',      // Negro verdoso muy oscuro (Garantiza máxima legibilidad en el texto body)
        light: '#F8F9FA',     // Blanco sutilmente frío (El fondo base de toda la página web)
        muted: '#A3B19B',     // Oliva pálido (Detalles de acento, bordes finos o iconos secundarios)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}