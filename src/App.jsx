import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Lenis from "lenis";
import AOS from "aos";
import AppRoutes from "./AppRoutes.jsx";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 32,
    });
    AOS.refresh();

    const lenis = new Lenis();

    const refreshAnimations = () => {
      AOS.refresh();
    };

    if (typeof lenis.on === "function") {
      lenis.on("scroll", refreshAnimations);
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (typeof lenis.off === "function") {
        lenis.off("scroll", refreshAnimations);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <AppRoutes />
      <Analytics />
    </Router>
  );
};

export default App;
