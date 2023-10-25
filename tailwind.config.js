/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pa-black": "#000000",
        "pa-white": "#ffffff",
        "pa-light-gray": "#d9d9d9",
        "pa-dark-gray": "#434343",
        "pa-green": "#2aa654",
      },
      screens: {
        mobile: "375px",
        "mobile-m": "425px",
        "mobile-l": "768px",
        tablet: "1024px",
        laptop: "1440px",
        "laptop-l": "1680px",
        "laptop-xl": "1920px",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      aushan: ["Kaushan Script", "cursive"],
    },
  },

  plugins: [],
};
