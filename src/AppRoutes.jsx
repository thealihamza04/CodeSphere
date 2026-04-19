import { Routes, Route, useLocation } from "react-router-dom";
import Frameworks from "./Components/Frameworks";
import ProgrammingLanguages from "./Components/ProgrammingLanguages";
import ProgrammingTimeline from "./Components/ProgrammingTimeline.jsx";
import MachineLearningRoadmap from "./Components/MachineLearningRoadmap.jsx";
import AIEngineerRoadmap from "./Components/AIEngineerRoadmap.jsx";
import SoftwareEngineerRoadmap from "./Components/SoftwareEngineerRoadmap.jsx";
import DesignPrinciples from "./Components/DesignPrinciples";
import AnimationsGuide from "./Components/AnimationsGuide";
import MotionDesign from "./Components/MotionDesign";
import EssentialSkills from "./Components/EssentialSkills";
import SystemDesign from "./Components/SystemDesign";
import DesignPatterns from "./Components/DesignPatterns";
import DevOps from "./Components/DevOps";
import CivicSense from "./Components/CivicSense";
import SocialIntelligence from "./Components/SocialIntelligence";
import Footer from "./Components/Footer.jsx";
import DesignStyles from "./Components/DesignStyles";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./Components/ThemeToggle.jsx";
import ProjectChecklist from "./Components/ProjectChecklist";
import VibeExplorer from "./Components/VibeExplorer.jsx";
import NotFound from "./Components/NotFound.jsx";
import SearchCommand from "./Components/common/SearchCommandMenu.jsx";
import CopyPage from "./Components/CopyPage.jsx";

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/Frameworks");

  return (
    <div className="max-w-full overflow-x-hidden">
      <Toaster />
      <ThemeToggle />
      <CopyPage />
      <SearchCommand />
      <Routes>
        <Route path='/' element={<ProgrammingLanguages />} />
        <Route path='/Frameworks' element={<Frameworks />} />
        <Route path='/TimeLine' element={<ProgrammingTimeline />} />
        <Route path='/ml-roadmap' element={<MachineLearningRoadmap />} />
        <Route path='/ai-roadmap' element={<AIEngineerRoadmap />} />
        <Route path='/swe-roadmap' element={<SoftwareEngineerRoadmap />} />
        <Route path='/design-principles' element={<DesignPrinciples />} />
        <Route path='/animations-guide' element={<AnimationsGuide />} />
        <Route path='/motion-design' element={<MotionDesign />} />
        <Route path='/developer-essential-skills' element={<EssentialSkills />} />
        <Route path='/system-design' element={<SystemDesign />} />
        <Route path='/design-patterns' element={<DesignPatterns />} />
        <Route path='/devops' element={<DevOps />} />
        <Route path='/civic-sense' element={<CivicSense />} />
        <Route path='/social-intelligence' element={<SocialIntelligence />} />
        <Route path='/design-styles' element={<DesignStyles />} />
        <Route path='/project-checklist' element={<ProjectChecklist />} />
        <Route path='/vibe-explorer' element={<VibeExplorer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
};

const AppRoutes = () => {
  return <Layout />;
};

export default AppRoutes;
