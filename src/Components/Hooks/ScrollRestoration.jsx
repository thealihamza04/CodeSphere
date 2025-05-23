import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    const savedY = localStorage.getItem(path);
    window.scrollTo(0, savedY ? parseInt(savedY) : 0);

    const saveScroll = () => {
      localStorage.setItem(path, window.scrollY);
    };

    window.addEventListener("scroll", saveScroll);
    window.addEventListener("beforeunload", saveScroll);

    // Scroll restoration on route change (delay to wait for render)
    setTimeout(() => {
      const pos = localStorage.getItem(path);
      window.scrollTo(0, pos ? parseInt(pos) : 0);
    }, 50);

    return () => {
      saveScroll();
      window.removeEventListener("scroll", saveScroll);
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, [location.pathname, location.search]);
};

export default useScrollRestoration;
