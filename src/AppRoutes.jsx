import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import Frameworks from "./Components/Frameworks";
import FrameworkResources from "./Components/FrameworkResources";
import Languages from "./Components/Languages";
import LibrariesCatalog from "./Components/LibrariesCatalog";
import ProgrammingTimeline from "./Components/ProgrammingTimeline.jsx";
import MachineLearningRoadmap from "./Components/MachineLearningRoadmap.jsx";
import VersionControl from "./Components/VersionControl";
import Footer from "./Components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./Components/ThemeToggle.jsx";

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/Frameworks");

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname, location.search]);

  return (
    <>
      <Toaster />
      <ThemeToggle />
      <Routes>
        <Route path='/' element={<Languages />} />
        <Route path='/Frameworks' element={<Frameworks />} />
        <Route path='/Frameworks/:frameworkName/:type' element={<FrameworkResources />} />
        <Route path='/libraries' element={<LibrariesCatalog />} />
        <Route path='/TimeLine' element={<ProgrammingTimeline />} />
        <Route path='/ml-roadmap' element={<MachineLearningRoadmap />} />
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
