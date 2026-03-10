import { Routes, Route, useLocation } from "react-router-dom";
import Frameworks from "./Components/Frameworks";
import FrameworkResources from "./Components/FrameworkResources";
import ProgrammingLanguages from "./Components/ProgrammingLanguages";
import LibrariesCatalog from "./Components/LibrariesCatalog";
import ProgrammingTimeline from "./Components/ProgrammingTimeline.jsx";
import MachineLearningRoadmap from "./Components/MachineLearningRoadmap.jsx";
import AIEngineerRoadmap from "./Components/AIEngineerRoadmap.jsx";
import SoftwareEngineerRoadmap from "./Components/SoftwareEngineerRoadmap.jsx";
import DesignPrinciples from "./Components/DesignPrinciples";
import AnimationsGuide from "./Components/AnimationsGuide";
import EssentialSkills from "./Components/EssentialSkills";
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
        <Route path='/' element={<ProgrammingLanguages />} />
        <Route path='/Frameworks' element={<Frameworks />} />
        <Route path='/Frameworks/:frameworkName/:type' element={<FrameworkResources />} />
        <Route path='/libraries' element={<LibrariesCatalog />} />
        <Route path='/TimeLine' element={<ProgrammingTimeline />} />
        <Route path='/ml-roadmap' element={<MachineLearningRoadmap />} />
        <Route path='/ai-roadmap' element={<AIEngineerRoadmap />} />
        <Route path='/swe-roadmap' element={<SoftwareEngineerRoadmap />} />
        <Route path='/design-principles' element={<DesignPrinciples />} />
        <Route path='/animations-guide' element={<AnimationsGuide />} />
        <Route path='/developer-essential-skills' element={<EssentialSkills />} />
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
