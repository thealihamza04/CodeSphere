import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import designStylesData from "../Data/DesignStyles.json";
import useSEO from "./Hooks/useSEO";
import {
  LuHistory, LuType, LuLayers, LuCpu, LuPalette,
  LuBookOpen, LuGlobe, LuHeart,
} from "react-icons/lu";

import StyleCard from "./DesignStyles/StyleCard";
import StyleSheet from "./DesignStyles/StyleSheet";

const categoryIcons = {
  "Retro & Nostalgic": LuHistory,
  "Type & Layout Driven": LuType,
  "Texture & Material": LuLayers,
  "Digital & Tech": LuCpu,
  "Art Movement Inspired": LuPalette,
  "Contemporary & Lifestyle": LuHeart,
  "Print & Editorial": LuBookOpen,
  "Cultural & Regional": LuGlobe,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const DesignStyles = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);

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

  // Lock scroll — matches GuideLayout exactly
  useEffect(() => {
    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    if (selectedStyle) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [selectedStyle]);

  const closeSheet = useCallback(() => setSelectedStyle(null), []);

  return (
    <div className="relative max-w-full min-h-screen overflow-x-hidden bg-base-100">
      {/* Main Content Wrapper with Dynamic Blur */}
      <div className={`transition-all duration-500 ease-in-out ${selectedStyle ? 'blur-sm scale-[0.98] pointer-events-none brightness-75' : 'blur-0 scale-100'}`}>
        {/* Hero */}
        <section className="relative py-24 overflow-hidden md:py-32">
          <div className="container px-6 mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-5xl font-black tracking-tighter text-transparent md:text-7xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text"
            >Design Styles</motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg font-medium leading-relaxed md:text-xl text-base-content/60"
            >
              A curated exploration of visual aesthetics, from raw brutalist grids
              to the refined whispers of contemporary minimalism.
            </motion.p>
          </div>
        </section>

        {/* Grid of Categories */}
        <section className="container px-6 pb-24 mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
          >
            {designStylesData.map((category, idx) => (
              <StyleCard
                key={idx}
                category={category}
                index={idx}
                categoryIcons={categoryIcons}
                onSelectStyle={setSelectedStyle}
              />
            ))}
          </motion.div>
        </section>
      </div>

      {/* Side Sheet */}
      <StyleSheet style={selectedStyle} onClose={closeSheet} />
    </div>
  );
};

export default DesignStyles;
