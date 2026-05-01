import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { genreIcons } from "./iconMap";

const GenreCard = ({ genre, onSelectGenre, fitScore, isActive }) => {
  const Icon = genreIcons[genre.id] || genreIcons.blues;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ borderColor: "rgba(var(--p), 0.5)" }} // Highlight on hover using theme primary
      onClick={() => onSelectGenre(genre)}
      className={`group flex flex-col p-5 bg-base-100 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-base-200/40 ${isActive ? "border-primary bg-primary/5 shadow-sm" : "border-base-300"}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-black tracking-normal text-base-content leading-none">
            {genre.name}
          </h4>
        </div>
        <div className="flex items-center justify-center p-2.5 border border-base-300 rounded-md bg-base-200/50">
           <Icon className="size-4 text-base-content/40 group-hover:text-primary transition-colors" />
        </div>
      </div>

      <p className="text-[12px] font-medium text-base-content/50 leading-relaxed mb-6 line-clamp-2 h-9">
        {genre.tagline}
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-base-300/60">
        <span className="text-[9px] uppercase font-bold tracking-normal text-base-content/30 italic">
          {genre.category}
        </span>
        {fitScore > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 bg-base-300 rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: `${fitScore}%` }} />
            </div>
            <span className="font-mono text-[9px] text-primary font-black uppercase">
               {fitScore}%
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

GenreCard.propTypes = {
  genre: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
  }).isRequired,
  onSelectGenre: PropTypes.func.isRequired,
  fitScore: PropTypes.number,
  isActive: PropTypes.bool,
};

export default GenreCard;
