import DesignPatternsData from "../Data/DesignPatterns.json";
import { useEffect, useState } from "react";
import useSEO from "./Hooks/useSEO";
import { 
  LuZap,
  LuBox,
  LuLayers,
  LuActivity,
  LuArrowUpRight,
  LuLightbulb,
  LuPuzzle,
  LuServer
} from "react-icons/lu";

const categoryIcons = {
  "Creational Patterns": <LuBox />,
  "Structural Patterns": <LuLayers />,
  "Behavioral Patterns": <LuActivity />,
  "Architectural Patterns": <LuServer />,
  "Concurrency Patterns": <LuZap />,
  "Cloud & Distributed Patterns": <LuPuzzle />
};

const PrincipleItem = ({ title, onClick }) => (
  <button 
    onClick={onClick}
    className="group flex items-center justify-between py-5 border-b border-base-300/60 last:border-0 w-full text-left transition-all duration-300 hover:pl-2"
  >
    <h3 className="text-[15px] font-bold tracking-tight text-base-content/80 group-hover:text-primary transition-colors leading-none">{title}</h3>
    <div className="text-base-content/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
      <LuArrowUpRight className="size-4" />
    </div>
  </button>
);

const DesignPatterns = () => {
    const [selectedPattern, setSelectedPattern] = useState(null);

    useSEO({
        title: "Software Design Patterns Guide | CodeSphere",
        description: "Explore creational, structural, and behavioral design patterns to write cleaner, more maintainable software.",
        keywords: "design patterns, solid principles, creational patterns, structural patterns, behavioral patterns, singleton, factory, observer",
        canonical: "https://codes-sphere.vercel.app/design-patterns",
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
    
        if (selectedPattern) {
          lockScroll();
        } else {
          unlockScroll();
        }
        return () => unlockScroll();
    }, [selectedPattern]);

    return (
        <div className='relative min-h-screen bg-base-100 max-w-full overflow-x-hidden'>
            <div className="px-4 py-12 md:px-12 lg:px-24">
                {/* Header Section */}
                <div className='text-center space-y-4 mb-20'>
                    <h1 className='heading text-4xl md:text-7xl'>Design Patterns</h1>
                    <p className='max-w-2xl mx-auto text-base-content/60 text-sm md:text-lg leading-relaxed font-medium'>
                      Standardized solutions to common software design problems, providing templates for writing robust and reusable code.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
                    {DesignPatternsData.map((category, idx) => (
                        <div key={idx} className="bg-base-200/50 border border-base-300 rounded-[2.5rem] p-8 md:p-10 space-y-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-5">
                                <div className="p-4 rounded-[1.25rem] bg-primary text-primary-content text-3xl shadow-lg shadow-primary/20">
                                    {categoryIcons[category.Category] || <LuShapes />}
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black tracking-tighter leading-none uppercase text-base-content">{category.Category}</h2>
                                    <p className="text-[13px] text-base-content/60 font-semibold max-w-sm line-clamp-2">{category.Description}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col w-full flex-grow pb-4 mt-4">
                                {category.Principles.map((pattern, pIdx) => (
                                    <PrincipleItem 
                                        key={pIdx}
                                        title={pattern.Title}
                                        onClick={() => setSelectedPattern({ ...pattern, category: category.Category })}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side Sheet Implementation */}
            {selectedPattern && (
                <div className="fixed inset-0 z-[100] flex justify-end bg-black/40" onClick={() => setSelectedPattern(null)}>
                    <div 
                        data-lenis-prevent
                        className="w-full max-w-lg h-full bg-base-100 p-10 md:p-12 shadow-2xl flex flex-col gap-12 overflow-y-auto border-l border-base-300 custom-scrollbar animate-in slide-in-from-right duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-primary text-primary-content shadow-md shadow-primary/20">
                                        {categoryIcons[selectedPattern.category] || <LuShapes />}
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter text-base-content">{selectedPattern.Title}</h2>
                            </div>
                            <button 
                                className="btn btn-md btn-circle btn-ghost border border-base-300 hover:rotate-90 transition-transform" 
                                onClick={() => setSelectedPattern(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-12">
                            <section className="space-y-4">
                                <p className="text-xl md:text-2xl leading-snug font-bold text-base-content/90 tracking-tight">“{selectedPattern.Effect}”</p>
                            </section>

                            <section className="space-y-8">
                                <div className="p-8 rounded-[2rem] bg-base-200/50 border border-base-300">
                                    <h4 className="text-[10px] uppercase font-black tracking-wider text-primary mb-6">Execution Strategy</h4>
                                    <ul className="space-y-4">
                                        {selectedPattern.BestPractices.map((practice, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                                <span className="text-[14px] font-bold text-base-content/70 leading-relaxed">{practice}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex flex-wrap gap-2.5">
                                    {selectedPattern.Tools.map((tool, i) => (
                                        <div key={i} className="px-6 py-3 border border-base-300 rounded-2xl bg-base-200 text-base-content font-mono text-[12px] font-black shadow-sm">
                                            {tool}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="mt-auto pt-10">
                            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:scale-110 transition-transform">
                                    <LuLightbulb className="size-20" />
                                </div>
                                <p className="text-xs text-base-content/60 leading-relaxed italic relative z-10">
                                    Architecture Insight: Mastering <span className="text-primary font-black uppercase tracking-wider">{selectedPattern.Title}</span> helps you speak the "common language" of developers, making your Intent clear and your code predictable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Note */}
            <div className="mt-32 p-12 rounded-[3rem] bg-base-200 text-center border border-base-300 mx-4 md:mx-12 lg:mx-24 mb-20 shadow-sm">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
                    <LuPuzzle className="size-6" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">The Art of Abstraction</h3>
                <p className="text-sm md:text-base text-base-content/60 max-w-2xl mx-auto leading-relaxed font-medium">
                    Patterns are not about copy-pasting code; they are about understanding the <strong>Relationships</strong> and <strong>Responsibility</strong> between objects to solve architectural puzzles elegantly.
                </p>
            </div>
        </div>
    );
};

export default DesignPatterns;
