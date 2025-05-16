import React from "react";
import { MdCircle } from "react-icons/md";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const TimeLineCard = ({ released, language }) => {
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
        <h1 className='min-w-[25%]  '>{released}</h1>
        <MdCircle className='min-w-[20%] text-3xl text-slate-700 opacity-45' />{" "}
        {/* Set width and height to 10 */}
        <h1 className='min-w-[50%] '>{language}</h1>
      </div>
    </motion.div>
  );
};

export default TimeLineCard;
