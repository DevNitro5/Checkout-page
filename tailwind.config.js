module.exports = {
  content: ["./*.html", "./app.js"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "'Montserrat'",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
