import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Lenis from "lenis";
import AppRoutes from "./AppRoutes.jsx";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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
