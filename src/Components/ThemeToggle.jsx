import { useEffect, useRef, useState } from "react";

const ThemeToggle = () => {
  // Initialize safely for SSR; actual value is loaded on mount
  const [theme, setTheme] = useState("light");
  const hasMountedRef = useRef(false);

  // On mount, read stored theme and apply
  useEffect(() => {
    try {
      const storedTheme = typeof window !== "undefined"
        ? window.localStorage.getItem("theme")
        : null;
      const initialTheme = storedTheme || "light";
      setTheme(initialTheme);
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", initialTheme);
      }
    } catch (_err) {
      // Ignore storage errors (e.g., disabled cookies)
    }
    hasMountedRef.current = true;
  }, []);

  // Persist and apply when theme changes after mount
  useEffect(() => {
    if (!hasMountedRef.current) return;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", theme);
      }
    } catch (_err) {
      // Ignore storage errors
    }
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
