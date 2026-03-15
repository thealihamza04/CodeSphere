/* eslint-disable react/prop-types */
import { motion } from "motion/react";
import { LuExternalLink } from "react-icons/lu";

const RoadmapCard = ({ topic, description, resources = [], index }) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative w-full border-t border-base-content/5 pt-12 pb-20 first:border-t-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
        {/* Step Index: Refined, Small-Caps Label */}
        <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 block">
                Chapter
            </span>
            <span className="text-4xl font-light tracking-tighter text-base-content/10 block font-serif italic">
                {(index + 1).toString().padStart(2, '0')}
            </span>
        </div>

        {/* Core Content */}
        <div className="space-y-6">
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-base-content leading-none group-hover:text-primary transition-colors duration-700">
            {topic}
          </h3>

          <p className="text-base md:text-xl text-base-content/50 font-medium leading-relaxed max-w-2xl">
            {description}
          </p>

          {resources.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8">
              {resources.map((res, i) => (
                <div key={i} className="group/link flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-base-content/30 hover:text-primary transition-colors cursor-pointer">
                  {res}
                  <LuExternalLink className="size-3 opacity-0 group-hover/link:opacity-100 transition-all -translate-y-1" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative Fine Line Animation on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 h-px bg-primary/20 w-0 group-hover:w-full transition-all duration-1000 ease-out"
      />
    </motion.div>
  );
};

export default RoadmapCard;
