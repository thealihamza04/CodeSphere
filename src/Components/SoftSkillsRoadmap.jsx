import softSkillsRoadmap from "../Data/SoftSkillsRoadmap.js";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import TimeLineCard from "./cards/TimeLine/TimeLineCard.jsx";
import Line from "./cards/TimeLine/Line.jsx";
import useSEO from "./Hooks/useSEO";

const SoftSkillsRoadmap = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useSEO({
    title: "Soft Skills Roadmaps | CodeSphere",
    description:
      "Roadmaps for improving communication, teamwork, and leadership with free resources.",
    keywords:
      "soft skills roadmap, communication roadmap, teamwork roadmap, leadership roadmap, free resources, CodeSphere, thealihamza04",
    canonical: "https://codes-sphere.vercel.app/soft-skills-roadmap",
    og: {
      title: "Soft Skills Roadmaps | CodeSphere",
      description:
        "Roadmaps for improving communication, teamwork, and leadership with free resources.",
      url: "https://codes-sphere.vercel.app/soft-skills-roadmap",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Soft Skills Roadmaps | CodeSphere",
      description:
        "Roadmaps for improving communication, teamwork, and leadership with free resources.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          name: "Soft Skills Roadmaps",
          url: "https://codes-sphere.vercel.app/soft-skills-roadmap",
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
              name: "Soft Skills Roadmaps",
              item: "https://codes-sphere.vercel.app/soft-skills-roadmap",
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
      <h1 className='text-4xl font-bold py-12 text-center'>Soft Skills Roadmaps</h1>
      {Object.entries(softSkillsRoadmap).map(([skill, roadmap]) => (
        <div key={skill} className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>{skill}</h2>
          <ul className='flex flex-col justify-center items-center'>
            {Object.entries(roadmap).map(([topic, info], index) => (
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
                  resource={info.resource}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SoftSkillsRoadmap;
