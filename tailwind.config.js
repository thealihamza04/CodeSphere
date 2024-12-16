import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"], // Force only light mode
    darkTheme: "light", // Prevent DaisyUI from applying dark mode
  },
  darkMode: false, // Disable Tailwind's dark mode
};
