import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Lenis from "lenis";
import AppRoutes from "./AppRoutesClient.jsx";

const shouldEnableAnalytics = import.meta.env.PROD;

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
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
      {shouldEnableAnalytics && <Analytics />}
    </Router>
  );
};

export default App;
