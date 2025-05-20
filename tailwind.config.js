module.exports = {
  darkMode: "class", // ✅ this is the key setting
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // make sure all relevant paths are included
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};
