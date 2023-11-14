/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      mobile: { max: "980px" },
      desktop: { min: "980px" },
    },
  },
  plugins: [],
};
