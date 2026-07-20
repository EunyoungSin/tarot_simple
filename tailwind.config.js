/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Serif KR"', 'serif'],
      },
      colors: {
        ink: '#150f24',
        gold: '#c9a15a',
      },
    },
  },
  plugins: [],
}
