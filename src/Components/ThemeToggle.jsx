import { useEffect, useState } from "react";

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
      className="btn btn-ghost fixed top-4 right-4 z-50 transition-transform duration-300"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      <span
        className={`inline-block transition-transform duration-300 ${
          theme === "light" ? "rotate-0" : "rotate-180"
        }`}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default ThemeToggle;
