import languagesTimeLine from "../Data/TimeLine.js";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import TimeLineCard from "./cards/TimeLine/TimeLineCard.jsx";
import Line from "./cards/TimeLine/Line.jsx";
import useSEO from "./Hooks/useSEO";

const TimeLine = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useSEO({
    title: "Programming Languages Timeline | CodeSphere",
    description:
      "Chronological timeline showcasing the evolution of programming languages and AliHamza projects.",
    keywords:
      "AliHamza projects, thealihamza04 projects, programming language timeline, projramming lang time line",
    canonical: "https://codes-sphere.vercel.app/TimeLine",
    og: {
      title: "Programming Languages Timeline | CodeSphere",
      description:
        "Chronological timeline showcasing the evolution of programming languages and AliHamza projects.",
      url: "https://codes-sphere.vercel.app/TimeLine",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Programming Languages Timeline | CodeSphere",
      description:
        "Chronological timeline showcasing the evolution of programming languages and AliHamza projects.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          name: "Programming Languages Timeline",
          url: "https://codes-sphere.vercel.app/TimeLine",
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
              name: "Timeline",
              item: "https://codes-sphere.vercel.app/TimeLine",
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
    <>
      <div className=' min-h-screen px-3xl py-5xl overflow-x-hidden'>
        <h1 className='text-4xl font-bold py-3xl text-center'>
          The TimeLine of Languages
        </h1>
        <div>
          <ul className='flex flex-col justify-center items-center  '>
            {Object.entries(languagesTimeLine).map(
              ([language, info], index) => (
                <li
                  key={index}
                  className={`min-w-52 md:min-w-60  my-xs  ${
                    isInView
                      ? "motion-translate-x-in-[0%] motion-translate-y-in-[95%] "
                      : ""
                  }`}
                  ref={ref}
                >
                  {/* vertical line */}
                  <div
                  // className={`bg-gray-700 opacity-50 w-1 px rounded-full  ml-[43.9%] md:ml-[42.3%] `}
                  // style={{ minHeight: `${info.gap * 20}px` }}
                  />
                  {/* <div className='flex flex-row gap-lg '>
                    <h1 className='min-w-[25%]  '>{info.released}</h1>
                    <MdCircle className='min-w-[20%] text-3xl text-slate-700 opacity-45' />{" "}
                    <h1 className='min-w-[50%] '>{language}</h1>
                  </div> */}
                  <Line gap={info.gap} />
                  <TimeLineCard
                    released={info.released}
                    language={language}
                    description={info.description}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TimeLine;
