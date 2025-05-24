/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-common': 'radial-gradient(circle at center, #a83ef1 0%, #3a1d5c 60%)',
        'gradient-rare': 'radial-gradient(circle at center, #4a90e2 0%, #1a3c6b 60%)',
        'gradient-elite': 'radial-gradient(circle at center, #50c878 0%, #1a5c2e 60%)',
        'gradient-unique': 'radial-gradient(circle at center, #ffd700 0%, #8b4513 60%)',
        'gradient-epic': 'radial-gradient(circle at center, #ff4500 0%, #8b0000 60%)',
        'gradient-legendary': 'radial-gradient(circle at center, #ff1493 0%, #4b0082 60%)',
      },
    },
  },
  plugins: [],
} 