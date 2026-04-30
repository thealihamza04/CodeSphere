import { useState, useMemo, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuFilter, LuRotateCcw, LuSearch, LuInbox } from "react-icons/lu";
import vibeData from "../Data/vibeData.json";
import useSEO from "./Hooks/useSEO";
import MoodFilterModal from "./VibeExplorer/MoodFilterModal";
import GenreCard from "./VibeExplorer/GenreCard";
import GenreSheet from "./VibeExplorer/GenreSheet";

const MemoizedGenreCard = memo(GenreCard);

const VibeExplorer = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useSEO({
    title: "Vibe Explorer | System Data",
    description: "Technical taxonomy of music genres based on mood fit and profile data.",
    keywords: "music genres, developer-centric UI, music taxonomy",
    canonical: "https://codes-sphere.vercel.app/vibe-explorer",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const filteredGenres = useMemo(() => {
    let result = vibeData.genres;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(g => 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        g.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (!selectedMood) return result;

    // Sort by mood fit
    return [...result].sort((a, b) => {
      const fitA = a.mood_fit[selectedMood] || 0;
      const fitB = b.mood_fit[selectedMood] || 0;
      return fitB - fitA;
    });
  }, [selectedMood, searchQuery]);

  const selectedGenreIndex = useMemo(
    () => filteredGenres.findIndex((genre) => genre.id === selectedGenre?.id),
    [filteredGenres, selectedGenre]
  );

  const selectNextGenre = useCallback(() => {
    if (!filteredGenres.length || selectedGenreIndex < 0) return;
    setSelectedGenre(filteredGenres[(selectedGenreIndex + 1) % filteredGenres.length]);
  }, [filteredGenres, selectedGenreIndex]);

  const selectPrevGenre = useCallback(() => {
    if (!filteredGenres.length || selectedGenreIndex < 0) return;
    setSelectedGenre(filteredGenres[(selectedGenreIndex - 1 + filteredGenres.length) % filteredGenres.length]);
  }, [filteredGenres, selectedGenreIndex]);

  const activeMood = useMemo(() => 
    vibeData.moods.find(m => m.id === selectedMood), 
  [selectedMood]);

  return (
    <div className="relative max-w-full min-h-screen overflow-x-hidden bg-base-100 text-base-content/80 font-inter">
      <div 
        className={`transition-opacity duration-200 ${
          selectedGenre || isFilterModalOpen ? 'opacity-30 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Technical Header */}
        <header className="relative pt-24 pb-12 border-b border-base-200 bg-base-200/50">
          <div className="container px-6 mx-auto">
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                   <div className="size-4 bg-primary animate-pulse rounded-full" />
                   <span className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-primary">System.VibeExplorer</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-base-content md:text-7xl leading-none">
                   Music Taxonomy<span className="text-primary italic">_</span>
                </h1>
                <p className="max-w-2xl text-lg font-medium leading-relaxed text-base-content/40 font-mono tracking-tight">
                  [QUERY] CURATED LANDSCAPES BASED ON MOOD FIT AND SONIC PROFILE DATA. 
                  [VIBRATIONS: {vibeData.moods.length}] [GENRES: {vibeData.genres.length}]
                </p>
             </div>
          </div>
        </header>

        {/* Technical Navigation / Controls */}
        <section className="container px-6 pt-12 pb-32 mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 py-6 border-b border-base-300/40">
             <div className="flex items-center gap-6 flex-1 min-w-[300px]">
                {/* Simplified Search */}
                <div className="relative group max-w-md w-full">
                  <LuSearch className="absolute top-1/2 left-4 -translate-y-1/2 size-4 text-base-content/30 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text"
                    placeholder="GENRE_SEARCH..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-base-200/50 border-2 border-transparent focus:border-primary/20 rounded-lg pl-12 pr-6 py-3 font-mono text-sm transition-all focus:outline-none"
                  />
                </div>

                {activeMood && (
                 <motion.div 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="flex items-center gap-3 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-lg group"
                 >
                    <span className="text-primary font-mono font-black uppercase text-[10px] tracking-tight">ACTIVE_FIT:</span>
                    <span className="text-base-content font-mono font-bold text-[12px] uppercase">{activeMood.id}</span>
                    <button 
                      onClick={() => setSelectedMood(null)}
                      className="ml-2 hover:text-primary transition-colors"
                    >
                      <LuRotateCcw className="size-3" />
                    </button>
                 </motion.div>
                )}
             </div>

             <button
               onClick={() => setIsFilterModalOpen(true)}
               className="flex items-center gap-3 px-8 py-3.5 text-[11px] font-mono font-black uppercase tracking-[0.1em] transition-all bg-base-content/10 hover:bg-base-content hover:text-base-100 rounded-lg cursor-pointer text-base-content/60"
             >
               <LuFilter className="size-4" />
               SET_MOOD_SPECTRUM
             </button>
          </div>

          {/* Data Grid */}
          <div className="flex items-center justify-between mb-8 px-4">
             <div className="flex items-center gap-4">
               <span className="text-[10px] font-mono font-bold text-base-content/30 uppercase tracking-widest">
                  Showing {filteredGenres.length} genres
               </span>
             </div>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            {filteredGenres.length > 0 ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredGenres.map((genre) => (
                  <MemoizedGenreCard 
                    key={genre.id} 
                    genre={genre} 
                    onSelectGenre={setSelectedGenre} 
                    fitScore={selectedMood ? genre.mood_fit[selectedMood] : 0}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center p-32 border-2 border-dashed border-base-300 rounded-2xl"
              >
                 <LuInbox className="size-10 text-base-content/20 mb-4" />
                 <p className="font-mono text-sm font-bold text-base-content/40 tracking-tight">NULL_RESULTS_FOR_QUERY: {searchQuery}</p>
                 <button 
                   onClick={() => setSearchQuery("")}
                   className="mt-6 text-[10px] font-mono underline hover:text-primary"
                 >
                   RESET_SEARCH
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      <MoodFilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        moods={vibeData.moods}
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
      />

      <AnimatePresence>
        {selectedGenre && (
          <GenreSheet 
            genre={selectedGenre} 
            onClose={() => setSelectedGenre(null)} 
            onNext={selectNextGenre}
            onPrev={selectPrevGenre}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VibeExplorer;
