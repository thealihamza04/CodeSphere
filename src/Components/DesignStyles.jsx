import { useEffect } from "react";
import { motion } from "framer-motion";
import designStylesData from "../Data/DesignStyles.json";
import useSEO from "./Hooks/useSEO";
import { 
  LuHistory, 
  LuType, 
  LuLayers, 
  LuCpu, 
  LuPalette, 
  LuZap 
} from "react-icons/lu";

const categoryIcons = {
  "Retro & Nostalgic": LuHistory,
  "Type & Layout Driven": LuType,
  "Texture & Material": LuLayers,
  "Digital & Tech": LuCpu,
  "Art Movement Inspired": LuPalette,
  "Contemporary Minimal": LuZap
};

const DesignStyles = () => {
  useSEO({
    title: "Design Styles & Aesthetics | CodeSphere",
    description:
      "A comprehensive guide to design styles ranging from Retro & Nostalgic to Contemporary Minimal. Explore the aesthetics that shape the modern web.",
    keywords: "design styles, brutalist web, glassmorphism, minimalism, retro futurism, web design aesthetics",
    canonical: "https://codes-sphere.vercel.app/design-styles",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            Design Styles
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            An curated exploration of visual aesthetics, from raw brutalist grids 
            to the refined whispers of contemporary minimalism.
          </motion.p>
        </div>
      </section>

      {/* Grid of Categories */}
      <section className="container mx-auto px-6 pb-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {designStylesData.map((category, idx) => {
            const CategoryIcon = categoryIcons[category.category] || LuZap;
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ 
                  x: -6,
                  y: -6,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                className="group relative p-10 bg-base-200 border-2 border-base-content/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[14px_14px_0px_0px_rgba(var(--p),0.2)] transition-[box-shadow] duration-300 overflow-hidden"
              >
                {/* Paper Texture Layer Optimized for Themes */}
                <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none mix-blend-multiply dark:mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-12">
                    <div className="space-y-4">
                      {/* Icon Container with Stacked Shadow */}
                      <div className="inline-flex p-4 bg-primary text-primary-content border-2 border-base-content/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <CategoryIcon className="size-6" />
                      </div>
                      <h2 className="text-2xl font-black tracking-tight text-base-content uppercase leading-none">
                        {category.category}
                      </h2>
                    </div>
                    {/* Index Number Background Layer */}
                    <span className="text-5xl font-black text-base-content/5 select-none lining-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <ul className="space-y-4">
                    {category.styles.map((style, sIdx) => (
                      <li 
                        key={sIdx}
                        className="flex items-center gap-4 text-base-content/60 group/item hover:text-primary cursor-default"
                      >
                        <div className="size-2 bg-base-content/20 transition-transform duration-300 group-hover/item:bg-primary group-hover/item:rotate-45" />
                        <span className="text-[14px] font-black tracking-tighter uppercase transition-[letter-spacing] duration-300 group-hover/item:tracking-wide">
                          {style}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Corner Fold Responsive to Theme */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[34px] border-t-base-100 border-l-[34px] border-l-transparent drop-shadow-[-3px_3px_4px_rgba(0,0,0,0.2)] transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                
                {/* Bottom Cutting Line */}
                <div className="absolute bottom-0 left-0 w-full h-[6px] bg-primary group-hover:h-[8px] transition-transform duration-300 scale-x-0 group-hover:scale-x-75 origin-center mb-[-3px]" />
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};

export default DesignStyles;
