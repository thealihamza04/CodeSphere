import { Routes, Route, useLocation } from "react-router-dom";
import Frameworks from "./Components/Frameworks";
import ProgrammingLanguages from "./Components/ProgrammingLanguages";
import ProgrammingTimeline from "./Components/ProgrammingTimeline.jsx";
import MachineLearningRoadmap from "./Components/MachineLearningRoadmap.jsx";
import AIEngineerRoadmap from "./Components/AIEngineerRoadmap.jsx";
import SoftwareEngineerRoadmap from "./Components/SoftwareEngineerRoadmap.jsx";
import DesignPrinciples from "./Components/DesignPrinciples";
import AnimationsGuide from "./Components/AnimationsGuide";
import EssentialSkills from "./Components/EssentialSkills";
import SystemDesign from "./Components/SystemDesign";
import DesignPatterns from "./Components/DesignPatterns";
import DevOps from "./Components/DevOps";
import CivicSense from "./Components/CivicSense";
import Footer from "./Components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./Components/ThemeToggle.jsx";

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/Frameworks");

  return (
    <div className="max-w-full overflow-x-hidden">
      <Toaster />
      <ThemeToggle />
      <Routes>
        <Route path='/' element={<ProgrammingLanguages />} />
        <Route path='/Frameworks' element={<Frameworks />} />
        <Route path='/TimeLine' element={<ProgrammingTimeline />} />
        <Route path='/ml-roadmap' element={<MachineLearningRoadmap />} />
        <Route path='/ai-roadmap' element={<AIEngineerRoadmap />} />
        <Route path='/swe-roadmap' element={<SoftwareEngineerRoadmap />} />
        <Route path='/design-principles' element={<DesignPrinciples />} />
        <Route path='/animations-guide' element={<AnimationsGuide />} />
        <Route path='/developer-essential-skills' element={<EssentialSkills />} />
        <Route path='/system-design' element={<SystemDesign />} />
        <Route path='/design-patterns' element={<DesignPatterns />} />
        <Route path='/devops' element={<DevOps />} />
        <Route path='/civic-sense' element={<CivicSense />} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
};

const AppRoutes = () => {
  return <Layout />;
};

export default AppRoutes;
