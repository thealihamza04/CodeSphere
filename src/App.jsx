import React from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Frameworks from "./Components/Frameworks";
import Tool_Lib from "./Components/Tool_Lib";
import Languages from "./Components/Languages";
import TimeLine from "./Components/TimeLine.jsx";
import VersionControl from "./Components/VersionControl";
import Footer from "./Components/Footer.jsx";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const location = useLocation();
  const hideFooter = ["/Frameworks/ToLib", "/Frameworks"].includes(
    location.pathname
  );

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Languages />} />
        <Route path='/Frameworks' element={<Frameworks />} />
        <Route path='/Frameworks/ToLib' element={<Tool_Lib />} />
        <Route path='/TimeLine' element={<TimeLine />} />
        <Route
          path='/developer-essential-skills'
          element={<VersionControl />}
        />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
      <Analytics />
    </Router>
  );
};

export default App;
