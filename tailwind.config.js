/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        quaternary: "var(--quaternary)",
      },
      backgroundImage: {
        "blue-gradient": "var(--blue-gradient)",
      },
      minHeight: {
        "main-page": "calc(100vh - 64px)",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs"), require("flowbite/plugin")],
  darkMode: "class",
};
