import daisyui from 'daisyui';
import tailwindcssMotion from "tailwindcss-motion";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    }


  },
  plugins: [require("daisyui"), tailwindcssMotion],
  daisyui: {
    themes: ["light"], // Force only light mode
    darkTheme: "light", // Prevent DaisyUI from applying dark mode
  },
};
