/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#455eeb",
        ...colors,
      },
    },
  },
  plugins: [require("tailwindcss"), require("flowbite/plugin")],
});
