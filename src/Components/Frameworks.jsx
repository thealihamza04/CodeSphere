import { useEffect } from "react";
import Card from "./cards/Card";
import { Link, useLocation } from "react-router-dom";
import useSEO from "./Hooks/useSEO";
import List from "../Data/JS.json";

const ProgLan = () => {
  const location = useLocation();
  const { Frameworks: stateFrameworks = [] } = location.state || {};

  const allFrameworks = List.flatMap((lang) =>
    lang.More.map((fw) => ({ ...fw, Language: lang.Language }))
  );

  const frameworksData =
    stateFrameworks.length > 0 ? stateFrameworks : allFrameworks;

  const langFromQuery = new URLSearchParams(location.search).get("lang");

  const groupedFrameworks = stateFrameworks.length > 0
    ? [{ language: langFromQuery || "Frameworks", list: stateFrameworks }]
    : List.map((lang) => ({ language: lang.Language, list: lang.More }));

  useSEO({
    title: "Frameworks Overview | CodeSphere",
    description:
      "Browse popular programming frameworks and tools with summaries and links.",
    keywords:
      "AliHamza projects, thealihamza04 projects, programming language timeline, projramming lang time line",
    canonical: "https://codes-sphere.vercel.app/Frameworks",
    og: {
      title: "Frameworks Overview | CodeSphere",
      description:
        "Browse popular programming frameworks and tools with summaries and links.",
      url: "https://codes-sphere.vercel.app/Frameworks",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Frameworks Overview | CodeSphere",
      description:
        "Browse popular programming frameworks and tools with summaries and links.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Frameworks Overview",
          provider: { "@type": "Organization", name: "CodeSphere" },
          url: "https://codes-sphere.vercel.app/Frameworks",
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
              name: "Frameworks",
              item: "https://codes-sphere.vercel.app/Frameworks",
            },
          ],
        },
      ],
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const def =
    "A framework is a pre-built structure or platform that provides a foundation for developing software applications. It includes reusable components, libraries, and tools to help developers organize and standardize their code, making development faster and more efficient.";

  return (
    <>
      <div className='py-9 px-4 space-y-6 bg-base-100'>
        <h1 className='heading'>Frameworks</h1>
        <div className='px-4 md:px-48'>
          <hr />
        </div>
        <p className='px-4 md:px-20 text-sm font-normal text-justify leading-relaxed tracking-wide'>
          {def}
        </p>
        <div className='flex justify-center mt-8'>
          <Link
            className='btn btn-outline no-animation text-sm md:text-base'
            to='/'
          >
            Back
          </Link>
        </div>
      </div>
      {groupedFrameworks.map(({ language, list }) => (
        <div key={language} className='w-full'>
          {groupedFrameworks.length > 1 && (
            <h2 className='text-lg font-semibold text-center mt-8 mb-4'>
              {language}
            </h2>
          )}
          <div className='flex flex-wrap gap-4 justify-center items-center px-4 md:px-10 pb-10'>
            {list.map((framework) => (
              <Card
                key={`${language}-${framework.Framework}`}
                Title={framework.Framework}
                Summary={framework.Summary}
                URL={framework.URL}
                Tools={framework.Tools}
                Lib={framework.Libraries}
                RTNIT={frameworksData}
                PrevPath={location.pathname}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProgLan;
