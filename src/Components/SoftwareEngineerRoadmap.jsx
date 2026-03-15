import softwareEngineerRoadmap from "../Data/SoftwareEngineerRoadmap.js";
import { useEffect } from "react";
import RoadmapCard from "./cards/Roadmap/RoadmapCard.jsx";
import useSEO from "./Hooks/useSEO";
import { motion } from "motion/react";

const SoftwareEngineerRoadmap = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSEO({
    title: "Software Engineer Roadmap | CodeSphere",
    description: "A professional curriculum for software engineering mastery.",
    keywords: "software engineer roadmap, curriculum, SWE, CodeSphere",
    canonical: "https://codes-sphere.vercel.app/swe-roadmap",
  });

  return (
    <div className='min-h-screen bg-base-100 selection:bg-primary/10 selection:text-primary overflow-x-hidden'>
      {/* Classy Editorial Header */}
      <div className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-8">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4"
            >
                <div className="h-px w-12 bg-primary/30" />
                <span className="text-[10px] uppercase font-black tracking-[0.5em] text-primary/60">Professional Curriculum</span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className='text-6xl md:text-[10rem] font-black tracking-tighter text-base-content leading-[0.8] mix-blend-difference'
            >
                SW Engineer <br />
                <span className="text-primary italic opacity-90">Design</span>
            </motion.h1>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="max-w-xl text-base md:text-xl text-base-content/40 font-medium leading-relaxed pt-8"
            >
                A high-fidelity roadmap for the 2025/2026 engineering landscape. <br /> Built for those who build the future.
            </motion.div>
        </div>
      </div>

      {/* Grid Based Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-40">
        <div className="flex flex-col border-b border-base-content/5">
          {Object.entries(softwareEngineerRoadmap).map(([topic, info], index) => (
            <RoadmapCard
              key={index}
              index={index}
              topic={topic}
              description={info.description}
              resources={info.resources}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoftwareEngineerRoadmap;
