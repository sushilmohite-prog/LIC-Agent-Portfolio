/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lic-blue': '#023e8a',
        'lic-yellow': '#f9c74f',
        'lic-light-blue': '#0077be',
      },
      fontFamily: {
        'marathi': ['Baloo Bhai 2', 'Mukta', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
