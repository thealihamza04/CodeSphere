/* eslint-disable react/prop-types */
import { MdCircle } from "react-icons/md";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const TimeLineCard = ({ released, language, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "10px 0px 0px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div
        className={`flex flex-row gap-5 ${isInView
          ? "motion-scale-in-[0.3] motion-translate-x-in-[90%] motion-translate-y-in-[93%] motion-opacity-in-[50%] motion-rotate-in-[-29deg] motion-ease-spring-smooth"
          : ""
          } `}
      >
        <h1 className='min-w-[25%] text-right font-medium text-base-content/60'>{released}</h1>
        <MdCircle className='min-w-[20%] text-3xl text-base-content/20' />
        <h1 className='min-w-[50%] font-bold text-base-content'>{language}</h1>
      </div>

      {description && (
        <div className="ml-[45%] md:ml-[43%] mt-2 max-w-xs">
          <p className='text-xs leading-relaxed text-base-content/50'>
            {description}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TimeLineCard;
