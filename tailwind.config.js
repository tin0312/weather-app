/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
    screens: {
      mobile: { max: "980px" },
      desktop: { min: "980px" },
    },
  },
  plugins: [],
};
