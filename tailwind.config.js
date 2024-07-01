/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{tsx,jsx}"],
  theme: {
    extend: {
      dropShadow: { md: "0px 4px 32px rgba(0, 0, 0, 0.05)" },
    },
    colors: {
      white: "#fff",
      blue: "#1fb6ff",
      purple: "#726DF9",
      purple_sub: "#E7E6FF",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      black: "#333",
      "gray-light": "#E8E8EE",
      transparent: "transparent",
    },
    lineHeight: 1.5,
  },
  plugins: [],
};
