import aiEngineerRoadmap from "../Data/AIEngineerRoadmap.js";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import TimeLineCard from "./cards/TimeLine/TimeLineCard.jsx";
import Line from "./cards/TimeLine/Line.jsx";
import useSEO from "./Hooks/useSEO";

const AIEngineerRoadmap = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useSEO({
    title: "AI Engineer Roadmap | CodeSphere",
    description: "A comprehensive step-by-step guide to becoming an AI Engineer, from LLM fundamentals to agentic workflows.",
    keywords: "AI engineer roadmap, LLM learning path, RAG architecture, agentic workflows, CodeSphere",
    canonical: "https://codes-sphere.vercel.app/ai-roadmap",
    og: {
      title: "AI Engineer Roadmap | CodeSphere",
      description: "Step-by-step path to mastering Generative AI, RAG, and AI Agents.",
      url: "https://codes-sphere.vercel.app/ai-roadmap",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Engineer Roadmap | CodeSphere",
      description: "The complete path for modern AI Developers.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          name: "AI Engineer Roadmap",
          url: "https://codes-sphere.vercel.app/ai-roadmap",
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
              name: "AI Engineer Roadmap",
              item: "https://codes-sphere.vercel.app/ai-roadmap",
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
    <div className='w-screen min-h-screen px-4 py-20 overflow-x-hidden md:px-12'>
      <h1 className='py-12 text-4xl font-bold text-center'>AI Engineer Roadmap</h1>
      <div>
        <ul className='flex flex-col items-center justify-center'>
          {Object.entries(aiEngineerRoadmap).map(([topic, info], index) => (
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

export default AIEngineerRoadmap;
