import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import designStylesData from "../Data/DesignStyles.json";
import useSEO from "./Hooks/useSEO";
import {
  LuHistory, LuType, LuLayers, LuCpu, LuPalette,
  LuBookOpen, LuGlobe, LuHeart, LuFilter
} from "react-icons/lu";

import StyleCard from "./DesignStyles/StyleCard";
import StyleSheet from "./DesignStyles/StyleSheet";
import StyleFilterModal from "./DesignStyles/StyleFilterModal";

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
  
  // Filtering States
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedIntensities, setSelectedIntensities] = useState([]);

  // Extract most common filters to prevent UI clutter
  const { allTags, allBrands, allIntensities } = useMemo(() => {
    const t = {};
    const b = {};
    const i = {};
    designStylesData.forEach(c => c.styles.forEach(s => {
      (s.tags || []).forEach(x => { t[x] = (t[x] || 0) + 1 });
      (s.best_for?.brand_personality || []).forEach(x => { b[x] = (b[x] || 0) + 1 });
      const intent = s.intensity?.split(',')[0].trim();
      if (intent) { i[intent] = (i[intent] || 0) + 1 };
    }));
    
    // Sort by frequency, take top N, then sort alphabetically for UX
    const getTop = (obj, limit) => Object.entries(obj)
      .sort((a, v) => v[1] - a[1])
      .slice(0, limit)
      .map(([name]) => name)
      .sort();

    return {
      allTags: getTop(t, 15),
      allBrands: getTop(b, 12),
      allIntensities: getTop(i, 8)
    };
  }, []);

  // Filter Data conditionally
  const filteredData = useMemo(() => {
    if (!selectedTags.length && !selectedBrands.length && !selectedIntensities.length) {
      return designStylesData;
    }
    return designStylesData
      .map(c => ({
        ...c,
        styles: c.styles.filter(s => {
          const matchTags = !selectedTags.length || selectedTags.some(t => (s.tags || []).includes(t));
          const matchBrands = !selectedBrands.length || selectedBrands.some(brand => (s.best_for?.brand_personality || []).includes(brand));
          const intent = s.intensity?.split(',')[0].trim();
          const matchInt = !selectedIntensities.length || selectedIntensities.includes(intent);
          return matchTags && matchBrands && matchInt;
        })
      }))
      .filter(c => c.styles.length > 0);
  }, [selectedTags, selectedBrands, selectedIntensities]);

  const activeFiltersCount = selectedTags.length + selectedBrands.length + selectedIntensities.length;

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

    if (selectedStyle || isFilterModalOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [selectedStyle, isFilterModalOpen]);

  const closeSheet = useCallback(() => setSelectedStyle(null), []);

  return (
    <div className="relative max-w-full min-h-screen overflow-x-hidden bg-base-100">
      {/* Main Content Wrapper (Optimized for composite-only 60fps performance) */}
      <div 
        className={`transition-all duration-500 ease-in-out origin-center will-change-transform ${
          selectedStyle ? 'opacity-40 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
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

        {/* Controls */}
        <section className="container px-6 mx-auto mb-8">
          <div className="flex justify-end">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-3 px-6 py-2.5 text-[13px] font-bold tracking-widest uppercase transition-all duration-300 border-2 rounded-full cursor-pointer text-base-content/80 border-base-content/20 hover:border-base-content/80 hover:text-base-content focus:outline-none"
            >
              <LuFilter className="size-4" />
              Filter Array
              {activeFiltersCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 ml-1 text-[10px] text-white rounded-full bg-base-content">
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>
          </div>
        </section>

        {/* Grid of Categories */}
        <section className="container px-6 pb-24 mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredData.length > 0 ? filteredData.map((category, idx) => (
              <StyleCard
                key={idx}
                category={category}
                index={idx}
                categoryIcons={categoryIcons}
                onSelectStyle={setSelectedStyle}
              />
            )) : (
              <div className="flex flex-col items-center justify-center col-span-1 py-20 text-center border-2 border-dashed rounded-3xl md:col-span-2 lg:col-span-3 border-base-content/10 bg-base-200/50">
                <LuFilter className="mb-4 text-base-content/30 size-12" />
                <h3 className="mb-2 text-2xl font-black uppercase text-base-content">No styles found</h3>
                <p className="max-w-md mx-auto text-base-content/60">Try adjusting or clearing your active filters to discover more design aesthetics.</p>
                <button onClick={() => { setSelectedTags([]); setSelectedBrands([]); setSelectedIntensities([]); }} className="px-6 py-2 mt-6 text-sm font-bold uppercase transition-all rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-content">
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>
        </section>
      </div>

      {/* Side Sheet */}
      <StyleSheet style={selectedStyle} onClose={closeSheet} />

      {/* Filter Modal */}
      <StyleFilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        allTags={allTags}
        allBrands={allBrands}
        allIntensities={allIntensities}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedIntensities={selectedIntensities}
        setSelectedIntensities={setSelectedIntensities}
        onClearFilters={() => {
          setSelectedTags([]);
          setSelectedBrands([]);
          setSelectedIntensities([]);
        }}
      />
    </div>
  );
};

export default DesignStyles;
