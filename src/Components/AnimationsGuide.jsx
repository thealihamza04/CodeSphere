import AnimationsData from "../Data/AnimationsData.json";
import { useEffect, useState } from "react";
import useSEO from "./Hooks/useSEO";
import { 
  LuMove, 
  LuZap, 
  LuLayers, 
  LuSparkles, 
  LuCode, 
  LuMouse, 
  LuActivity, 
  LuTrendingUp, 
  LuHeart,
  LuType,
  LuMousePointer,
  LuWaves,
  LuBox,
  LuArrowUpRight
} from "react-icons/lu";

const categoryIcons = {
  "Navigational & Functional Animations": <LuMove />,
  "Feedback & Interaction Animations": <LuZap />,
  "Structural & Hierarchy Animations": <LuLayers />,
  "Branding & Delighters": <LuSparkles />,
  "Technical & Utility Animations": <LuCode />,
  "Advanced Scroll & Immersion": <LuMouse />,
  "SVG & Vector Morphing": <LuActivity />,
  "State & Data Visualizations": <LuTrendingUp />,
  "Psychological & Haptic Motion": <LuHeart />,
  "Kinetic Typography & Type Motion": <LuType />,
  "Interactive Cursors & Mouse Trailing": <LuMousePointer />,
  "Generative & Procedural Motion": <LuWaves />,
  "Spatial UI & Immersive Depth": <LuBox />
};

const AnimationSubCard = ({ type, onClick }) => (
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

const AnimationsGuide = () => {
  const [selectedAnim, setSelectedAnim] = useState(null);

  useSEO({
    title: "Modern Animation Systems Guide | CodeSphere",
    description: "A comprehensive hierarchical guide to animations in modern UI/UX design, featuring common libraries and effects.",
    keywords: "UI animations, motion design, web animations, framer motion, gsap, lottie, CSS animations",
    canonical: "https://codes-sphere.vercel.app/animations-guide",
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

    if (selectedAnim) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [selectedAnim]);

  return (
    <div 
      className="relative min-h-screen bg-base-100 max-w-full overflow-x-hidden"
      data-page-context={JSON.stringify(AnimationsData)}
    >
      {/* Main Content Wrapper with Dynamic Blur */}
      <div className={`transition-all duration-500 ease-in-out ${selectedAnim ? 'blur-sm scale-[0.98] pointer-events-none brightness-75' : 'blur-0 scale-100'}`}>
        <div className="px-4 py-12 md:px-12 lg:px-24">
          {/* Header */}
          <div className="text-center space-y-4 mb-20">
            <h1 className="heading text-4xl md:text-7xl">Animation Systems</h1>
            <p className="max-w-2xl mx-auto text-base-content/60 text-sm md:text-lg leading-relaxed font-medium">
              A curated taxonomy of motion design principles and the industry-standard toolkits used to implement them.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
            {AnimationsData.map((category, idx) => (
              <div key={idx} className="bg-base-200/50 border border-base-300 rounded-[2.5rem] p-8 md:p-10 space-y-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="p-4 rounded-[1.25rem] bg-primary text-primary-content text-3xl shadow-lg shadow-primary/20">
                    {categoryIcons[category.Category] || <LuSparkles />}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tighter leading-none uppercase text-base-content">{category.Category}</h2>
                    <p className="text-[13px] text-base-content/60 font-semibold max-w-sm line-clamp-2">{category.Description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col w-full flex-grow pb-4 mt-4">
                  {category.SubAnimations.map((sub, sIdx) => (
                    <AnimationSubCard 
                      key={sIdx}
                      type={sub.Type}
                      onClick={() => setSelectedAnim({ ...sub, category: category.Category })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note inside blurred area */}
        <div className="mt-32 p-12 rounded-[3rem] bg-base-200 text-center border border-base-300 mx-4 md:mx-12 lg:mx-24 mb-20 shadow-sm">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <LuSparkles className="size-6" />
          </div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Systemic Motion Selection</h3>
          <p className="text-sm md:text-base text-base-content/60 max-w-2xl mx-auto leading-relaxed font-medium">
            For streamlined interactions, prioritize <strong>CSS Transitions</strong>. For complex state-driven layout transformations, <strong>Framer Motion</strong> is optimal. For advanced immersive storytelling and scroll-driven effects, <strong>GSAP</strong> remains the industry benchmark.
          </p>
        </div>
      </div>

      {/* Side Sheet / Drawer Implementation outside blurred area */}
      {selectedAnim && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40" onClick={() => setSelectedAnim(null)}>
          <div 
            data-lenis-prevent
            className="w-full max-w-lg h-full bg-base-100 p-10 md:p-12 shadow-2xl flex flex-col gap-12 overflow-y-auto border-l border-base-300 custom-scrollbar animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary text-primary-content shadow-md shadow-primary/20">
                    {categoryIcons[selectedAnim.category] || <LuSparkles />}
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter text-base-content">{selectedAnim.Type}</h2>
              </div>
              <button 
                className="btn btn-md btn-circle btn-ghost border border-base-300 hover:rotate-90 transition-transform duration-300" 
                onClick={() => setSelectedAnim(null)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-12">
              <section className="space-y-4">
                <p className="text-xl md:text-2xl leading-snug font-bold text-base-content/90 tracking-tight">“{selectedAnim.Effect}”</p>
              </section>

              <section className="space-y-6">
                <div className="flex flex-wrap gap-2.5">
                  {selectedAnim.Tools.map((tool, i) => (
                    <div key={i} className="px-6 py-3 border border-base-300 rounded-2xl bg-base-200 text-base-content font-mono text-[12px] font-black shadow-sm">
                      {tool}
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
                  Architectural insight: Implementing <span className="text-primary font-black uppercase tracking-wider">{selectedAnim.Type}</span> effectively often involves leveraging <span className="text-base-content font-black">{selectedAnim.Tools[0]}</span> to balance performance and visual fidelity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationsGuide;
