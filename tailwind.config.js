/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        quaternary: 'var(--quaternary)',
      },
      backgroundImage: {
        'blue-gradient': 'var(--blue-gradient)',
      },
      minHeight: {
        'h-main': 'calc(100vh - 64px)',
      }
    },
  },
  plugins: [],
};
