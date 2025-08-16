/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        love: {
          pink: '#FDE2E4',
          blush: '#FAD2E1',
          lilac: '#E2ECE9',
          mint: '#CDEAC0',
          sunshine: '#FFF1B6'
        },
        status: {
          notStarted: '#FECACA',
          inProgress: '#FDE68A',
          completed: '#BBF7D0'
        }
      }
    }
  },
  plugins: []
}
