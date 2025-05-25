/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
  theme: {
  extend: {
  colors: {
  'medium-purple': '#716EA7',
  'lavender-purple': '#9582CA',
  'light-green': '#A6B56F',
  'dark-green': '#252C10',
  'dark-text': '#333333',
  'medium-text': '#555555',
  'deep-purple': '#4B3B74',
  'soft-green': '#7D9D74',
  // Theme 1 Colors
  'theme1-bg': '#F5F1E8',         // Beige background
  'theme1-sidebar': '#E8E0CF',     // Darker beige for sidebar
  'theme1-primary': '#556B2F',     // Light green from image (#A6B56F)
  'theme1-secondary': '#252C10',   // Dark green from image (#252C10)
  'theme1-tertiary': '#716EA7',    // Purple from image (#716EA7)
   },
  backgroundColor: {
  'primary': '#716EA7',
   },
  textColor: {
  'primary': '#333333',
  'accent': '#A6B56F',
  'deep-purple': '#4B3B74',
  'soft-green': '#7D9D74',
   },
  borderColor: {
  'primary': '#9582CA',
   }
   },
   },
  plugins: [],
  }