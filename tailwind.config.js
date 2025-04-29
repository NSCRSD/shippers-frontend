/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        half: 'calc(50% - 60px)', // Use the calc function directly as a string
      },
    },
  },
  plugins: [],
};
