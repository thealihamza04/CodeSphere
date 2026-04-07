import { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { genreIcons, emojiToIcon, LuYoutube } from "./iconMap";
import { LuBook, LuChartColumn, LuInfo, LuTarget } from "react-icons/lu";

const ComparisonRow = ({ emoji, label, description }) => {
  const Icon = emojiToIcon[emoji] || genreIcons.blues;
  return (
    <div className="flex items-center gap-4 py-4 border-b border-base-200 last:border-0 group">
      <div className="flex items-center justify-center size-10 shrink-0 border border-base-300 rounded bg-base-200/40">
        <Icon className="size-4 text-base-content/40 group-hover:text-primary transition-colors" />
      </div>
      <div className="space-y-1">
        <p className="font-mono text-[12px] font-black uppercase tracking-normal text-base-content/80 group-hover:text-primary transition-colors">{label}</p>
        <p className="text-[11px] font-medium text-base-content/40 leading-snug font-mono italic tracking-normal">{description}</p>
      </div>
    </div>
  );
};

const MinimalBar = ({ label, value }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-end px-1">
      <span className="font-mono text-[10px] font-black uppercase tracking-normal text-base-content/30">{label}</span>
      <span className="font-mono text-[11px] font-black tracking-normal text-primary">[{value/10}/10]</span>
    </div>
    {/* Segmented Bar */}
    <div className="flex gap-0.5 h-1.5 w-full bg-base-200">
      {[...Array(10)].map((_, i) => (
        <motion.div
           key={i}
           initial={{ opacity: 0 }}
           animate={{ opacity: i < value/10 ? 1 : 0.2 }}
           transition={{ delay: i * 0.05 }}
           className={`h-full flex-1 ${i < value/10 ? 'bg-primary' : 'bg-base-content/10'}`}
        />
      ))}
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-6 px-1">
    <Icon className="size-3 text-primary/60" />
    <h4 className="font-mono text-[10px] font-black uppercase tracking-normal text-base-content/20">{title}</h4>
  </div>
);

const GenreSheet = ({ genre, onClose }) => {
  useEffect(() => {
    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    if (genre) lockScroll();
    else unlockScroll();

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (genre) window.addEventListener("keydown", handleEsc);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", handleEsc);
    };
  }, [genre, onClose]);

  if (!genre) return null;

  const Icon = genreIcons[genre.id] || genreIcons.blues;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex justify-end bg-base-content/10" 
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        data-lenis-prevent
        className="flex flex-col w-full h-full max-w-lg p-0 overflow-y-auto border-l shadow-2xl bg-base-100 border-base-300 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Technical Header */}
        <div className="relative p-8 md:p-12 pb-0">
          <div className="flex items-start justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-center size-16 border border-base-300 rounded-lg bg-base-200/50">
                 <Icon className="size-8 text-primary/60" />
              </div>
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-normal text-primary mb-3">
                  {genre.category}::METADATA
                </p>
                <h2 className="text-5xl font-black leading-none tracking-normal">
                  {genre.name}
                </h2>
              </div>
            </div>
            <button
              className="p-3 transition-all duration-300 border border-base-300 rounded-full text-base-content/40 hover:text-base-content hover:bg-base-200"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 space-y-12">
          <div className="flex flex-col gap-6 p-6 border border-base-200 bg-base-200/20 rounded-lg">
            <p className="text-lg font-medium leading-relaxed tracking-tight text-base-content/40 font-mono italic">
              [ANNOTATION]: &quot;{genre.tagline}&quot;
            </p>
            <div className="pt-4 border-t border-base-200">
               <a 
                 href={`https://www.youtube.com/results?search_query=${encodeURIComponent(genre.name + ' music')}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded font-mono text-[11px] font-black uppercase text-primary hover:bg-primary transition-all hover:text-primary-content"
               >
                 <LuYoutube className="size-4" />
                 OPEN_SOURCE_STREAMING_DATA
               </a>
            </div>
          </div>

          {/* Profile data grid */}
          <section>
            <SectionHeader icon={LuChartColumn} title="PROFILE_DATA" />
            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              <MinimalBar label="Energy" value={genre.mood_profile.Energy} />
              <MinimalBar label="Emotion" value={genre.mood_profile.Emotion} />
              <MinimalBar label="Tension" value={genre.mood_profile.Tension} />
              <MinimalBar label="Calm" value={genre.mood_profile.Calm} />
            </div>
          </section>

          {/* Use-case scenarios */}
          <section>
            <SectionHeader icon={LuTarget} title="FIT_SCENARIOS" />
            <div className="space-y-1 border-y border-base-200">
              {genre.best_for.map((item, i) => (
                <ComparisonRow 
                   key={i} 
                   emoji={item.emoji}
                   label={item.label}
                   description={item.description}
                />
              ))}
            </div>
          </section>

          {/* Taxonomy detail */}
          <section>
            <SectionHeader icon={LuInfo} title="TAXONOMY_TAGS" />
            <div className="flex flex-wrap gap-1.5 pt-2">
              {genre.subgenres.map((sub, i) => (
                <span key={i} className="px-3 py-1.5 border border-base-200 rounded font-mono text-[9px] font-black uppercase text-base-content/40 hover:bg-base-200/60 transition-colors">
                  {sub}
                </span>
              ))}
            </div>
          </section>

          {/* Director logic */}
          <section className="pb-12">
            <SectionHeader icon={LuBook} title="CURATOR_LOGIC" />
            <div className="p-6 rounded border-l-4 border-primary bg-base-200/40">
              <p className="font-mono text-[13px] font-medium text-base-content/60 leading-relaxed italic">
                {genre.note}
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

GenreSheet.propTypes = {
  genre: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    subgenres: PropTypes.arrayOf(PropTypes.string).isRequired,
    best_for: PropTypes.arrayOf(PropTypes.shape({
        emoji: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
    mood_profile: PropTypes.shape({
        Energy: PropTypes.number.isRequired,
        Emotion: PropTypes.number.isRequired,
        Tension: PropTypes.number.isRequired,
        Calm: PropTypes.number.isRequired,
    }).isRequired,
    note: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

ComparisonRow.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

MinimalBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

SectionHeader.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
};

export default GenreSheet;
