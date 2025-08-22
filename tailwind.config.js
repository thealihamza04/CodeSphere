import daisyui from 'daisyui';
import tailwindcssMotion from "tailwindcss-motion";
import themes from "daisyui/src/theming/themes.js";
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
  plugins: [daisyui, tailwindcssMotion],
  daisyui: {
    themes: [
      {
        light: { ...themes["light"] },
      },
      {
        dark: {
          ...themes["dark"],
          "base-100": "#000000",
          "base-200": "#0a0a0a",
          "base-300": "#171717",
          "base-content": "#ffffff",
        },
      },
    ],
  },
};
