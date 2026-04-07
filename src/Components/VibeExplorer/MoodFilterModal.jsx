import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuTerminal } from "react-icons/lu";
import PropTypes from "prop-types";
import { moodIcons } from "./iconMap";

const MoodFilterModal = ({ isOpen, onClose, moods, selectedMood, onSelectMood }) => {
  useEffect(() => {
    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    if (isOpen) lockScroll();
    else unlockScroll();

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-base-content/10"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 5 }}
            className="relative w-full max-w-xl bg-base-100 border border-base-300 rounded-lg shadow-2xl overflow-hidden pointer-events-auto"
          >
            {/* System Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-base-200 border-b border-base-300">
               <div className="flex items-center gap-2">
                 <LuTerminal className="size-4 text-primary" />
                 <span className="font-mono text-[11px] font-black uppercase tracking-normal text-base-content/60">SYSTEM.SELECT_MOOD_FIT</span>
               </div>
               <div className="flex items-center gap-3">
                 {selectedMood && (
                   <button 
                     onClick={() => onSelectMood(null)}
                     className="px-2 py-1 text-[9px] font-mono font-bold uppercase text-primary hover:bg-primary/10 rounded transition-colors"
                     title="Reset Filter"
                   >
                     RESET
                   </button>
                 )}
                 <button 
                   onClick={onClose} 
                   className="text-base-content/30 hover:text-base-content transition-colors"
                 >
                   <LuX className="size-5" />
                 </button>
               </div>
            </div>

            {/* Content List */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-2">
                {moods.map((mood) => {
                  const isActive = selectedMood === mood.id;
                  const Icon = moodIcons[mood.id] || moodIcons.focus;
                  return (
                    <motion.button
                      key={mood.id}
                      onClick={() => {
                        onSelectMood(isActive ? null : mood.id);
                        onClose();
                      }}
                      className={`flex items-center gap-3 px-4 py-3 border text-left rounded transition-all duration-200 ${
                        isActive 
                          ? "bg-primary border-primary text-primary-content" 
                          : "bg-base-100 border-base-200 text-base-content/60 hover:bg-base-200/50 hover:border-base-300"
                      }`}
                    >
                      <Icon className={`size-4 ${isActive ? 'text-white' : 'text-base-content/40'}`} />
                      <div className="flex flex-col">
                        <span className={`text-[12px] font-bold leading-none ${isActive ? 'text-white' : 'text-base-content/80'}`}>
                          {mood.label}
                        </span>
                        <span className={`font-mono text-[9px] uppercase mt-0.5 ${isActive ? 'text-white/60' : 'text-base-content/30'}`}>
                           {mood.id}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer Status */}
            <div className="px-6 py-3 border-t border-base-200 bg-base-200/20">
               <p className="font-mono text-[9px] text-base-content/30 italic tracking-normal">
                  [!] Selection will reorder primary taxonomy dataset.
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

MoodFilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  moods: PropTypes.array.isRequired,
  selectedMood: PropTypes.string,
  onSelectMood: PropTypes.func.isRequired,
};

export default MoodFilterModal;
