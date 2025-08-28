/* eslint-disable react/prop-types */
import { MdCircle } from "react-icons/md";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const TimeLineCard = ({ released, language, description, resource }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "10px 0px 0px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div
        className={`flex flex-row gap-5 ${
          isInView
            ? "motion-scale-in-[0.3] motion-translate-x-in-[90%] motion-translate-y-in-[93%] motion-opacity-in-[50%] motion-rotate-in-[-29deg] motion-ease-spring-smooth"
            : ""
        } `}
      >
        <h1 className='min-w-[25%]'>{released}</h1>
        <MdCircle className='min-w-[20%] text-3xl text-base-content/45' />
        <h1 className='min-w-[50%]'>{language}</h1>
      </div>
      {description && (
        <p className='ml-[45%] md:ml-[43%] mt-2 text-xs text-base-content/50 max-w-xs'>
          {description}
        </p>
      )}
      {resource && (
        <a
          href={resource}
          target='_blank'
          rel='noopener noreferrer'
          className='ml-[45%] md:ml-[43%] mt-1 text-xs text-info underline block max-w-xs'
        >
          Free Resource
        </a>
      )}
    </motion.div>
  );
};

export default TimeLineCard;
