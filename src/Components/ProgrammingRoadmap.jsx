import languageRoadmap from "../Data/ProgrammingRoadmap.js";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import TimeLineCard from "./cards/TimeLine/TimeLineCard.jsx";
import Line from "./cards/TimeLine/Line.jsx";
import useSEO from "./Hooks/useSEO";

const ProgrammingRoadmap = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useSEO({
    title: "Programming Language Roadmap | CodeSphere",
    description:
      "Playful journey from hello world to expert. Learn a programming language step by step.",
    keywords:
      "programming language roadmap, coding learning path, CodeSphere, thealihamza04",
    canonical: "https://codes-sphere.vercel.app/programming-roadmap",
    og: {
      title: "Programming Language Roadmap | CodeSphere",
      description:
        "Playful journey from hello world to expert. Learn a programming language step by step.",
      url: "https://codes-sphere.vercel.app/programming-roadmap",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Programming Language Roadmap | CodeSphere",
      description:
        "Playful journey from hello world to expert. Learn a programming language step by step.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          name: "Programming Language Roadmap",
          url: "https://codes-sphere.vercel.app/programming-roadmap",
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
              name: "Programming Language Roadmap",
              item: "https://codes-sphere.vercel.app/programming-roadmap",
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
    <div className='min-h-screen px-12 py-20 overflow-x-hidden'>
      <h1 className='text-4xl font-bold py-12 text-center'>Programming Language Roadmap</h1>
      <div>
        <ul className='flex flex-col justify-center items-center'>
          {Object.entries(languageRoadmap).map(([topic, info], index) => (
            <li
              key={index}
              className={`min-w-52 md:min-w-60 my-1 ${
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

export default ProgrammingRoadmap;
