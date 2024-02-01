/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#000000",
        "custom-radBrown": "#8e5659",
      },
      screens: {
        xs: "400px",
        smm: "678px",
        sm: "884px",
        md: "1111px",
        lg: "1024px",
        xl: "1280px",
      },
      width: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
