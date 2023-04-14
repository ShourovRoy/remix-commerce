/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        primary: "#00DC81",
        secondary: "#00B3FF",
        black: "#0C0C0E",
        dark: "#1C1C1E",
      },
    },
  },
  plugins: [],
};
