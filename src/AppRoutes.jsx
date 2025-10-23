import { Routes, Route, useLocation } from "react-router-dom";
import Frameworks from "./Components/Frameworks";
import Tool_Lib from "./Components/Tool_Lib";
import Languages from "./Components/Languages";
import LanguageLibraries from "./Components/LanguageLibraries";
import TimeLine from "./Components/TimeLine.jsx";
import MLRoadmap from "./Components/MLRoadmap.jsx";
import VersionControl from "./Components/VersionControl";
import Footer from "./Components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./Components/ThemeToggle.jsx";

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/Frameworks");

  return (
    <>
      <Toaster />
      <ThemeToggle />
      <Routes>
        <Route path='/' element={<Languages />} />
        <Route path='/Frameworks' element={<Frameworks />} />
        <Route path='/Frameworks/:frameworkName/:type' element={<Tool_Lib />} />
        <Route path='/libraries' element={<LanguageLibraries />} />
        <Route path='/TimeLine' element={<TimeLine />} />
        <Route path='/ml-roadmap' element={<MLRoadmap />} />
        <Route path='/developer-essential-skills' element={<VersionControl />} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

const AppRoutes = () => {
  return <Layout />;
};

export default AppRoutes;
