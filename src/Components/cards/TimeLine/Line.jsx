import { motion, useInView } from "motion/react";
import { useRef } from "react";
import PropTypes from "prop-types";

const Line = ({ gap }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    // margin: "-10px",
  });

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div
        className={`bg-base-content/50 w-1 rounded-full ml-[43.9%] md:ml-[42.3%] ${
          isInView
            ? "motion-scale-in-[0.97] motion-translate-x-in-[-113%] motion-translate-y-in-[107%] motion-rotate-in-[17deg] motion-ease-spring-bouncy"
            : ""
        }`}
        style={{ minHeight: `${gap * 20}px` }}
      ></div>
    </motion.div>
  );
};

Line.propTypes = {
  gap: PropTypes.number.isRequired,
};

export default Line;
