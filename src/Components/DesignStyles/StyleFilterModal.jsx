import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";
import PropTypes from "prop-types";

// CLASSIC & MINIMAL UPDATE:
// Removed complex gradients, background blocks, and heavy borders.
// Switched to clean, monochromatic layers, simple pills, and elegant typography.

const FilterSection = ({ title, options, selected, onToggle }) => (
  <div className="mb-12">
    <h4 className="mb-6 text-[12px] font-bold tracking-widest uppercase text-base-content/40">{title}</h4>
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-5 py-2.5 text-[13px] font-medium transition-all duration-200 border rounded-full
              ${isSelected 
                ? 'bg-base-content border-base-content text-base-100' 
                : 'bg-transparent border-base-content/20 text-base-content/60 hover:border-base-content/60 hover:text-base-content'
              }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
};

const StyleFilterModal = ({
  isOpen,
  onClose,
  allTags,
  allBrands,
  allIntensities,
  selectedTags,
  setSelectedTags,
  selectedBrands,
  setSelectedBrands,
  selectedIntensities,
  setSelectedIntensities
}) => {

  const toggleFilter = (setFn, currentSelection, item) => {
    if (currentSelection.includes(item)) {
      setFn(currentSelection.filter((i) => i !== item));
    } else {
      setFn([...currentSelection, item]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none sm:p-6"
          >
            <div className="flex flex-col w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] bg-base-100 rounded-3xl pointer-events-auto overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-base-content/5">
              
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6">
                <h3 className="text-2xl font-semibold tracking-tight text-base-content">
                  Filters
                </h3>
                <button onClick={onClose} className="p-2 transition-colors rounded-full text-base-content/40 hover:text-base-content hover:bg-base-200">
                  <LuX className="size-5" />
                </button>
              </div>

              {/* Body */}
              <div data-lenis-prevent className="flex-1 min-h-0 px-8 py-6 overflow-y-auto custom-scrollbar">
                <FilterSection
                  title="Tags"
                  options={allTags}
                  selected={selectedTags}
                  onToggle={(item) => toggleFilter(setSelectedTags, selectedTags, item)}
                />
                
                <FilterSection
                  title="Brand Personality"
                  options={allBrands}
                  selected={selectedBrands}
                  onToggle={(item) => toggleFilter(setSelectedBrands, selectedBrands, item)}
                />

                <FilterSection
                  title="Design Intensity"
                  options={allIntensities}
                  selected={selectedIntensities}
                  onToggle={(item) => toggleFilter(setSelectedIntensities, selectedIntensities, item)}
                />
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

StyleFilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  allTags: PropTypes.array.isRequired,
  allBrands: PropTypes.array.isRequired,
  allIntensities: PropTypes.array.isRequired,
  selectedTags: PropTypes.array.isRequired,
  setSelectedTags: PropTypes.func.isRequired,
  selectedBrands: PropTypes.array.isRequired,
  setSelectedBrands: PropTypes.func.isRequired,
  selectedIntensities: PropTypes.array.isRequired,
  setSelectedIntensities: PropTypes.func.isRequired
};

export default StyleFilterModal;
