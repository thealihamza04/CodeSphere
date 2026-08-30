import { useEffect } from "react";
import { motion } from "motion/react";
import { MdCircle } from "react-icons/md";
import businessTimeline from "../Data/BusinessTimeline.js";
import useSEO from "./Hooks/useSEO";

const BusinessTimeline = () => {
  useSEO({
    title: "Business Timeline | CodeSphere",
    description: businessTimeline.subtitle,
    keywords: "business timeline, business models, industrial revolution, AI businesses",
    canonical: "https://codes-sphere.vercel.app/business-timeline",
    og: { title: "Business Timeline | CodeSphere", description: businessTimeline.subtitle, url: "https://codes-sphere.vercel.app/business-timeline", type: "website" },
    twitter: { card: "summary_large_image", title: "Business Timeline | CodeSphere", description: businessTimeline.subtitle },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden px-5 py-16 sm:px-8 md:px-12 md:py-20">
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">{businessTimeline.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-base-content/60 sm:text-base">
          {businessTimeline.subtitle}
        </p>
      </header>

      <ol className="mx-auto max-w-4xl">
        {businessTimeline.timeline.map((item, index) => (
          <motion.li
            key={`${item.period}-${item.business}`}
            className="relative grid grid-cols-[5.5rem_1.25rem_1fr] gap-x-4 pb-10 sm:grid-cols-[8rem_1.5rem_1fr] sm:gap-x-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8%" }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.015, 0.2) }}
          >
            <time className="pt-1 text-right text-xs font-medium text-base-content/60 sm:text-sm">{item.period}</time>
            <div className="relative flex justify-center">
              {index < businessTimeline.timeline.length - 1 && <span className="absolute top-5 h-[calc(100%+1rem)] w-px bg-base-content/20" aria-hidden="true" />}
              <MdCircle className="relative z-10 mt-0.5 text-xl text-base-content/30 sm:text-2xl" aria-hidden="true" />
            </div>
            <article className="pb-1">
              <h2 className="font-bold text-base-content sm:text-lg">{item.business}</h2>
              <p className="mt-1 text-sm leading-relaxed text-base-content/60">{item.description}</p>
              <p className="mt-3 text-xs leading-relaxed text-base-content/50"><span className="font-semibold text-base-content/70">Why it grew: </span>{item.whyItGrew}</p>
            </article>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export default BusinessTimeline;
