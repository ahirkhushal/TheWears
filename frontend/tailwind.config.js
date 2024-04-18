/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mulish: "mulish",
      rowdies: "rowdies",
    },

    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
      colors: {
        brown: "#6e3635",
      },
      screens: {
        signupSm: "450px",
        smallSr: "278px",
      },
    },
  },
  plugins: [],
};
