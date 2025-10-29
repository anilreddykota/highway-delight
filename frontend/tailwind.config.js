/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD643',
        'card-bg': '#F0F0F0',
      },
      backgroundColor: {
        'primary': '#FFD643',
        'card': '#F0F0F0',
        'secondary': '#D6D6D6',
        'tertiary': '#EFEFEF'
      }
    },
  },
  plugins: [],
}