import mlRoadmap from "../Data/MLRoadmap.js";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import TimeLineCard from "./cards/TimeLine/TimeLineCard.jsx";
import Line from "./cards/TimeLine/Line.jsx";
import useSEO from "./Hooks/useSEO";

const MLRoadmap = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useSEO({
    title: "Machine Learning Roadmap | CodeSphere",
    description:
      "Step-by-step machine learning roadmap from Python fundamentals to MLOps.",
    keywords:
      "machine learning roadmap, ml learning path, CodeSphere, thealihamza04",
    canonical: "https://codes-sphere.vercel.app/ml-roadmap",
    og: {
      title: "Machine Learning Roadmap | CodeSphere",
      description:
        "Step-by-step machine learning roadmap from Python fundamentals to MLOps.",
      url: "https://codes-sphere.vercel.app/ml-roadmap",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Machine Learning Roadmap | CodeSphere",
      description:
        "Step-by-step machine learning roadmap from Python fundamentals to MLOps.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          name: "Machine Learning Roadmap",
          url: "https://codes-sphere.vercel.app/ml-roadmap",
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
              name: "Machine Learning Roadmap",
              item: "https://codes-sphere.vercel.app/ml-roadmap",
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
    <div className='min-h-screen px-3xl py-5xl overflow-x-hidden'>
      <h1 className='text-4xl font-bold py-3xl text-center'>Machine Learning Roadmap</h1>
      <div>
        <ul className='flex flex-col justify-center items-center'>
          {Object.entries(mlRoadmap).map(([topic, info], index) => (
            <li
              key={index}
              className={`min-w-52 md:min-w-60 my-xs ${
                isInView
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

export default MLRoadmap;

