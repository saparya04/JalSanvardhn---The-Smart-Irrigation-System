/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        animation: {
          'pulse-slow': 'pulseSlow 5s ease-in-out infinite',
        },
        keyframes: {
          pulseSlow: {
            '0%, 100%': { opacity: '0.2' },
            '50%': { opacity: '0.4' },
          },
        },
      },
    },
    plugins: [],
  }
  