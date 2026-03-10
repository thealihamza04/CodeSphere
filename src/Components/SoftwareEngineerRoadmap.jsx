import softwareEngineerRoadmap from "../Data/SoftwareEngineerRoadmap.js";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import TimeLineCard from "./cards/TimeLine/TimeLineCard.jsx";
import Line from "./cards/TimeLine/Line.jsx";
import useSEO from "./Hooks/useSEO";

const SoftwareEngineerRoadmap = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useSEO({
    title: "Software Engineer Roadmap | CodeSphere",
    description: "The complete step-by-step path to becoming a professional Software Engineer, covering fundamentals to system design.",
    keywords: "software engineer roadmap, SWE learning path, computer science, system design, CodeSphere",
    canonical: "https://codes-sphere.vercel.app/swe-roadmap",
    og: {
      title: "Software Engineer Roadmap | CodeSphere",
      description: "Comprehensive guide to mastering software engineering principles and technologies.",
      url: "https://codes-sphere.vercel.app/swe-roadmap",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Software Engineer Roadmap | CodeSphere",
      description: "Master the path from a coder to a software engineer.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          name: "Software Engineer Roadmap",
          url: "https://codes-sphere.vercel.app/swe-roadmap",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://codes-sphere.vercel.app/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Software Engineer Roadmap",
              item: "https://codes-sphere.vercel.app/swe-roadmap",
            },
          ],
        },
      ],
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className='max-w-screen min-h-screen px-4 py-20 overflow-x-hidden md:px-12'>
      <h1 className='py-12 text-4xl font-bold text-center'>Software Engineer Roadmap</h1>
      <div>
        <ul className='flex flex-col items-center justify-center'>
          {Object.entries(softwareEngineerRoadmap).map(([topic, info], index) => (
            <li
              key={index}
              className={`min-w-52 md:min-w-60 my-1 ${isInView
                  ? "motion-translate-x-in-[0%] motion-translate-y-in-[95%]"
                  : ""
                }`}
              ref={ref}
            >
              <Line gap={info.gap} />
              <TimeLineCard
                released={info.released}
                language={topic}
                description={info.description}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SoftwareEngineerRoadmap;
