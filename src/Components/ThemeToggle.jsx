import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

const isBrowser = typeof window !== "undefined";

const getInitialTheme = () => {
  if (!isBrowser) {
    return "light";
  }

  return localStorage.getItem("theme") || "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className="fixed z-50 btn btn-ghost top-4 right-4"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      <span className="text-xl">
        {theme === "light" ? <LuMoon /> : <LuSun />}
      </span>
    </button>
  );
};

export default ThemeToggle;
