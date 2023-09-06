/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Define your custom breakpoints here
        'xs': '360px', // Adjust as needed
        'xl': '1280px', // Adjust as needed
      },
    },
  },
  plugins: [],
}