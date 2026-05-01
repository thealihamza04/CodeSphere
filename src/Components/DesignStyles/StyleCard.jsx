import { motion } from "framer-motion";
import { LuZap } from "react-icons/lu";
import PropTypes from "prop-types";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const StyleCard = ({ category, index, categoryIcons, onSelectStyle, activeStyleName }) => {
  const CategoryIcon = categoryIcons[category.category] || LuZap;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: -6, y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      className="group relative p-10 bg-base-200 border-2 border-base-content/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[14px_14px_0px_0px_rgba(var(--p),0.2)] transition-[box-shadow] duration-300 overflow-hidden"
    >
      {/* Paper texture */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none mix-blend-multiply dark:mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <div className="relative z-10">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-12">
          <div className="space-y-4">
            <div className="inline-flex p-4 bg-primary text-primary-content border-2 border-base-content/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <CategoryIcon className="size-6" />
            </div>
            <h2 className="text-2xl font-black leading-none tracking-tight uppercase text-base-content">
              {category.category}
            </h2>
          </div>
          <span className="text-5xl font-black select-none text-base-content/5 lining-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Styles List */}
        <ul className="space-y-4">
          {category.styles.map((style, sIdx) => (
            <li
              key={sIdx}
              onClick={() => onSelectStyle(style)}
              className={`flex items-center gap-4 cursor-pointer group/item rounded-lg px-2 py-1.5 transition-colors ${activeStyleName === style.style ? "bg-primary/10 text-primary" : "text-base-content/60 hover:text-primary"}`}
            >
              <div className="transition-transform duration-300 size-2 bg-base-content/20 group-hover/item:bg-primary group-hover/item:rotate-45" />
              <span className="text-[14px] font-black tracking-tighter uppercase transition-[letter-spacing] duration-300">
                {style.style}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Corner fold */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[34px] border-t-base-100 border-l-[34px] border-l-transparent drop-shadow-[-3px_3px_4px_rgba(0,0,0,0.2)] transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[6px] bg-primary group-hover:h-[8px] transition-transform duration-300 scale-x-0 group-hover:scale-x-75 origin-center mb-[-3px]" />
    </motion.div>
  );
};

StyleCard.propTypes = {
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  categoryIcons: PropTypes.object.isRequired,
  onSelectStyle: PropTypes.func.isRequired,
  activeStyleName: PropTypes.string,
};

export default StyleCard;
