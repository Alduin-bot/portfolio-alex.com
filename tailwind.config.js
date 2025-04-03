const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans], // Alternative à SF Pro
      },
      colors: {
        appleGray: "#F5F5F7",
        appleBlack: "#181818",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
