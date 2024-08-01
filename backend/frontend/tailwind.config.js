/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': '400px',     // Custom screen size for extra small devices
        'sm': '640px',     // Default small screen size
        'md': '768px',     // Default medium screen size
        'lg': '1024px',    // Default large screen size
        'xl': '1280px',    // Default extra large screen size
        '2xl': '1536px',   // Default 2xl screen size
        // Add more custom sizes as needed
        '3xl': '1600px',   // Example custom size
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {},
  },
  plugins: [],
}
