import MotionDesignData from "../Data/MotionDesignData.json";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PropTypes from "prop-types";
import useSEO from "./Hooks/useSEO";
import { 
  LuTimer, 
  LuWaypoints, 
  LuLayers, 
  LuSparkles, 
  LuCircleCheck, 
  LuArrowUpRight,
  LuInfo,
  LuBox,
  LuHistory,
  LuAccessibility,
  LuRefreshCcw,
  LuMove
} from "react-icons/lu";

const categoryIcons = {
  "Fundamental Timing": <LuTimer />,
  "Spatial Continuity": <LuWaypoints />,
  "Dynamic Hierarchy": <LuLayers />,
  "Expression & Delight": <LuSparkles />,
  "Functional Feedback": <LuCircleCheck />,
  "Material Integrity": <LuBox />,
  "Visual Narrative": <LuHistory />,
  "Inclusive Motion": <LuAccessibility />,
  "Transformation & State": <LuRefreshCcw />,
  "Spatial Navigation": <LuMove />
};

const PrincipleSubCard = ({ type, onClick }) => (
  <button 
    onClick={onClick}
    className="group flex items-center justify-between py-4 border-b border-base-300/60 last:border-0 w-full text-left transition-[padding-left] duration-300 hover:pl-2"
  >
    <h3 className="text-[15px] font-bold tracking-tight text-base-content/80 group-hover:text-primary leading-none">{type}</h3>
    <div className="text-base-content/20 group-hover:text-primary group-hover:translate-x-1 transition-transform duration-300">
      <LuArrowUpRight className="size-4" />
    </div>
  </button>
);

PrincipleSubCard.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const MotionDesign = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState(null);

  useSEO({
    title: "Motion Design Principles | CodeSphere",
    description: "Master the core principles of UI motion design, from timing and easing to spatial continuity and hierarchy.",
    keywords: "motion design principles, UI animation, web motion, easing, spatial continuity, design systems, Design Principles, Animation Systems, Motion Principles, Essential Skills",
    canonical: "https://codes-sphere.vercel.app/motion-design",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    if (selectedPrinciple) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [selectedPrinciple]);

  return (
    <div className="relative min-h-screen bg-base-100 max-w-full overflow-x-hidden">
      {/* Main Content Wrapper with Dynamic Blur */}
      <div className={`transition-all duration-500 ease-in-out ${selectedPrinciple ? 'blur-sm scale-[0.98] pointer-events-none brightness-75' : 'blur-0 scale-100'}`}>
        <div className="px-4 py-12 md:px-12 lg:px-24">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 mb-20"
          >
            <h1 className="heading text-4xl md:text-7xl">Motion Principles</h1>
            <p className="max-w-2xl mx-auto text-base-content/60 text-sm md:text-lg leading-relaxed font-medium">
              The fundamental laws of kinetics applied to digital interfaces to create meaningful, intuitive, and delightful user experiences.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12"
          >
            {MotionDesignData.map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-base-200/50 border border-base-300 rounded-[2.5rem] p-8 md:p-10 space-y-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 rounded-[1.25rem] bg-primary text-primary-content text-3xl shadow-lg shadow-primary/20">
                    {categoryIcons[category.Category] || <LuInfo />}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tighter leading-none uppercase text-base-content">{category.Category}</h2>
                    <p className="text-[13px] text-base-content/60 font-semibold max-w-sm line-clamp-2">{category.Description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col w-full flex-grow pb-4 mt-4">
                  {category.SubPrinciples.map((sub, sIdx) => (
                    <PrincipleSubCard 
                      key={sIdx}
                      type={sub.Type}
                      onClick={() => setSelectedPrinciple({ ...sub, category: category.Category })}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer Note inside blurred area */}
        <div className="mt-32 p-12 rounded-[3rem] bg-base-200 text-center border border-base-300 mx-4 md:mx-12 lg:mx-24 mb-20 shadow-sm">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <LuSparkles className="size-6" />
          </div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Meaningful Motion</h3>
          <p className="text-sm md:text-base text-base-content/60 max-w-2xl mx-auto leading-relaxed font-medium">
            Motion should never be additive; it should be subtractive of friction. Every animation must serve a purpose: to inform, to focus, or to confirm. If an animation doesn&apos;t help the user, it shouldn&apos;t exist.
          </p>
        </div>
      </div>

      {/* Side Sheet / Drawer Implementation outside blurred area */}
      <AnimatePresence>
        {selectedPrinciple && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end bg-black/40" 
            onClick={() => setSelectedPrinciple(null)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              data-lenis-prevent
              className="w-full max-w-lg h-full bg-base-100 p-10 md:p-12 shadow-2xl flex flex-col gap-12 overflow-y-auto border-l border-base-300 custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary text-primary-content shadow-md shadow-primary/20">
                      {categoryIcons[selectedPrinciple.category] || <LuInfo />}
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter text-base-content">{selectedPrinciple.Type}</h2>
                </div>
                <button 
                  className="btn btn-md btn-circle btn-ghost border border-base-300 hover:rotate-90 transition-transform duration-300" 
                  onClick={() => setSelectedPrinciple(null)}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-12">
                <section className="space-y-4">
                  <p className="text-xl md:text-2xl leading-snug font-bold text-base-content/90 tracking-tight">“{selectedPrinciple.Effect}”</p>
                </section>

                <section className="space-y-6">
                  <h4 className="text-xs uppercase font-black tracking-widest text-primary">Core Concepts</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedPrinciple.KeyConcepts.map((concept, i) => (
                      <div key={i} className="px-6 py-3 border border-base-300 rounded-2xl bg-base-200 text-base-content font-mono text-[12px] font-black shadow-sm">
                        {concept}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-auto pt-10">
                <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:scale-110 transition-transform duration-300">
                    <LuSparkles className="size-20" />
                  </div>
                   <p className="text-xs text-base-content/60 leading-relaxed italic relative z-10">
                    Principle insight: Mastering <span className="text-primary font-black uppercase tracking-wider">{selectedPrinciple.Type}</span> is about balancing technical precision with human-centric empathy in every transition.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotionDesign;
