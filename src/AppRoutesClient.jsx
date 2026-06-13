import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./Components/ThemeToggle.jsx";
import CopyPage from "./Components/CopyPage.jsx";
import SearchCommand from "./Components/common/SearchCommandMenu.jsx";
import Footer from "./Components/Footer.jsx";

const ProgrammingLanguages = lazy(() => import("./Components/ProgrammingLanguages"));
const Frameworks = lazy(() => import("./Components/Frameworks"));
const ProgrammingTimeline = lazy(() => import("./Components/ProgrammingTimeline.jsx"));
const MachineLearningRoadmap = lazy(() => import("./Components/MachineLearningRoadmap.jsx"));
const AIEngineerRoadmap = lazy(() => import("./Components/AIEngineerRoadmap.jsx"));
const SoftwareEngineerRoadmap = lazy(() => import("./Components/SoftwareEngineerRoadmap.jsx"));
const DesignPrinciples = lazy(() => import("./Components/DesignPrinciples"));
const AnimationsGuide = lazy(() => import("./Components/AnimationsGuide"));
const MotionDesign = lazy(() => import("./Components/MotionDesign"));
const EssentialSkills = lazy(() => import("./Components/EssentialSkills"));
const SystemDesign = lazy(() => import("./Components/SystemDesign"));
const DesignPatterns = lazy(() => import("./Components/DesignPatterns"));
const DevOps = lazy(() => import("./Components/DevOps"));
const CivicSense = lazy(() => import("./Components/CivicSense"));
const SocialIntelligence = lazy(() => import("./Components/SocialIntelligence"));
const DesignStyles = lazy(() => import("./Components/DesignStyles"));
const ProjectChecklist = lazy(() => import("./Components/ProjectChecklist"));
const VibeExplorer = lazy(() => import("./Components/VibeExplorer.jsx"));
const NotFound = lazy(() => import("./Components/NotFound.jsx"));

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.toLowerCase().startsWith("/frameworks");

  return (
    <div className="max-w-full overflow-x-clip">
      <Toaster />
      <ThemeToggle />
      <CopyPage />
      <SearchCommand />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<ProgrammingLanguages />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/frameworks/:langSlug" element={<Frameworks />} />
          <Route path="/TimeLine" element={<ProgrammingTimeline />} />
          <Route path="/ml-roadmap" element={<MachineLearningRoadmap />} />
          <Route path="/ai-roadmap" element={<AIEngineerRoadmap />} />
          <Route path="/swe-roadmap" element={<SoftwareEngineerRoadmap />} />
          <Route path="/design-principles" element={<DesignPrinciples />} />
          <Route path="/animations-guide" element={<AnimationsGuide />} />
          <Route path="/motion-design" element={<MotionDesign />} />
          <Route path="/developer-essential-skills" element={<EssentialSkills />} />
          <Route path="/system-design" element={<SystemDesign />} />
          <Route path="/design-patterns" element={<DesignPatterns />} />
          <Route path="/devops" element={<DevOps />} />
          <Route path="/civic-sense" element={<CivicSense />} />
          <Route path="/social-intelligence" element={<SocialIntelligence />} />
          <Route path="/design-styles" element={<DesignStyles />} />
          <Route path="/project-checklist" element={<ProjectChecklist />} />
          <Route path="/vibe-explorer" element={<VibeExplorer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!hideFooter && <Footer />}
    </div>
  );
};

const AppRoutes = () => <Layout />;

export default AppRoutes;
