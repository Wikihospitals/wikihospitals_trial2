const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.jsx", "./src/**/*.js"],
  darkMode: "class",
  theme: {
    screens: {
      'sm': '320px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontFamily: {
      sans: ["Roboto", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        gray: colors.coolGray,
        blue: colors.coolGray,
      },
      fontSize: {
        xxs: "0.625rem",
      },
      maxHeight: {
        48: "12rem",
        "80vh": "80vh",
        "90vh": "90vh",
        none: "none",
      },
    },
  },
  variants: {},
  plugins: [],
}
