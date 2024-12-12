/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue-1': '#00306A',
        'custom-blue-2': '#003F7A',
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, #00306A, #003F7A)',
      },
    },
  },
  plugins: [],
}