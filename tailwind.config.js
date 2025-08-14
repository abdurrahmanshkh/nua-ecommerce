/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        // Nua-inspired wellness color palette
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          500: '#84c88a',
          600: '#4a9b57',
          700: '#2d5a35',
        },
        wellness: {
          pink: '#f9e6e6',
          cream: '#faf8f3',
          sage: '#a8c19f',
          warm: '#e8dcc6',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          500: '#737373',
          900: '#171717',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
