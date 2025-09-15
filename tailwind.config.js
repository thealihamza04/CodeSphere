import daisyui from 'daisyui'
import tailwindcssMotion from 'tailwindcss-motion'
import themes from 'daisyui/src/theming/themes.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
}
