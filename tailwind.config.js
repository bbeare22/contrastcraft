/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Inter','Helvetica','Arial','Noto Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol']
      },
      colors: {
        brand: {
          DEFAULT: '#6366F1'
        }
      },
      boxShadow: {
        'soft': '0 10px 25px -10px rgba(0,0,0,0.2)'
      }
    }
  },
  plugins: []
}