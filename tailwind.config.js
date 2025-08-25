import daisyui from 'daisyui';
import tailwindcssMotion from "tailwindcss-motion";
import themes from "daisyui/src/theming/themes.js";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    spacing: {
      0: "0px",
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
      "7xl": "12rem",
      "52": "13rem",
      "60": "15rem",
      "80": "20rem",
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui, tailwindcssMotion],
  daisyui: {
    themes: [
      {
        light: {
          ...themes["light"],
          "base-100": "#ffffff",
          "base-200": "#f7f7f8",
          "base-300": "#e5e5e5",
          "base-content": "#202123",
        },
      },
      {
        dark: {
          ...themes["dark"],
          "base-100": "#212121",
          "base-200": "#303030",
          "base-300": "#202123",
          "base-content": "#ececf1",
        },
      },
    ],
  },
};
