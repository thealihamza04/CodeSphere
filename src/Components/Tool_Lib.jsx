import { useMemo } from "react";
import Tool_Lib_Card from "./cards/Tool_Lib_Card";
import { useLocation, Link, useParams } from "react-router-dom";
import useSEO from "./Hooks/useSEO";
import List from "../Data/JS.json";

const Tool_Lib = () => {
  const location = useLocation();
  const { frameworkName = "", type = "" } = useParams();
  const {
    tools: stateTools = [],
    Libraries: stateLibraries = [],
    ReturnIT: stateReturn = [],
    PrevPath = "/Frameworks",
  } = location.state || {};

  const decodedFrameworkName = decodeURIComponent(frameworkName || "");
  const normalizedFrameworkName = decodedFrameworkName.toLowerCase();

  const allFrameworks = useMemo(
    () =>
      List.flatMap((lang) =>
        lang.More.map((fw) => ({
          ...fw,
          Language: lang.Language,
          LanguageSummary: lang.Summary,
        }))
      ),
    []
  );

  const normalizedStateReturn = useMemo(() => {
    if (stateReturn.length === 0) return [];

    return stateReturn.map((fw) => {
      if (fw.Language && fw.LanguageSummary) return fw;

      const languageMatch = List.find((lang) =>
        lang.More.some(
          (item) => item.Framework.toLowerCase() === fw.Framework.toLowerCase()
        )
      );

      if (languageMatch) {
        return {
          ...fw,
          Language: languageMatch.Language,
          LanguageSummary: languageMatch.Summary,
        };
      }

      return fw;
    });
  }, [stateReturn]);

  const searchPool =
    normalizedStateReturn.length > 0 ? normalizedStateReturn : allFrameworks;

  const frameworkDetails = useMemo(() => {
    if (!normalizedFrameworkName) return null;
    return (
      searchPool.find(
        (fw) => fw.Framework.toLowerCase() === normalizedFrameworkName
      ) || null
    );
  }, [normalizedFrameworkName, searchPool]);

  const tools =
    stateTools.length > 0
      ? stateTools
      : frameworkDetails?.Tools
      ? frameworkDetails.Tools
      : [];

  const Libraries =
    stateLibraries.length > 0
      ? stateLibraries
      : frameworkDetails?.Libraries
      ? frameworkDetails.Libraries
      : [];

  const ReturnIT = searchPool;

  const isTools = type === "tools";
  const printIt = isTools ? tools : Libraries;
  const crumbName = isTools ? "Tools" : "Libraries";

  const defaultToolDef =
    "Framework tools are software frameworks that provide developers with a structured foundation and pre-built components to build applications more efficiently. These tools often include libraries, templates, and best practices that streamline the development process.";

  const defaultLibDef =
    "A framework's library refers to a collection of pre-written, reusable code or functions that a framework depends on or integrates with to provide specific functionalities. Libraries within a framework offer tools or utilities to perform common tasks like data manipulation, API calls, or user interface rendering.";

  const heroTitle = frameworkDetails?.Framework || decodedFrameworkName || "Framework";
  const heroDescription = frameworkDetails?.Summary || (isTools ? defaultToolDef : defaultLibDef);
  const heroSupplementary = isTools
    ? `Explore tools that empower ${heroTitle} developers.`
    : `Discover libraries that extend ${heroTitle}.`;

  const canonicalUrl = `https://codes-sphere.vercel.app/Frameworks/${encodeURIComponent(
    frameworkName
  )}/${type}`;

  const seoTitle = frameworkDetails?.Framework
    ? `${frameworkDetails.Framework} ${crumbName} | CodeSphere`
    : `${crumbName} for Frameworks | CodeSphere`;

  useSEO({
    title: seoTitle,
    description: heroDescription,
    keywords:
      "AliHamza projects, thealihamza04 projects, programming language timeline, projramming lang time line",
    canonical: canonicalUrl,
    og: {
      title: seoTitle,
      description: heroDescription,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: heroDescription,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: frameworkDetails?.Framework
            ? `${frameworkDetails.Framework} ${crumbName}`
            : `${crumbName} for Frameworks`,
          provider: { "@type": "Organization", name: "CodeSphere" },
          url: canonicalUrl,
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
            {
              "@type": "ListItem",
              position: 3,
              name: crumbName,
              item: canonicalUrl,
            },
          ],
        },
      ],
    },
  });

  return (
    <>
      <div className='py-9 px-4 pd:px-10 space-y-6 bg-base-100'>
        <h1 className='heading'>{heroTitle}</h1>
        <div className='px-4 md:px-48'>
          <hr className='border-base-content' />
        </div>
        <p className='px-4 md:px-20 text-sm font-normal tracking-wide text-justify leading-relaxed text-base-content/80'>
          {heroDescription}
        </p>
        {frameworkDetails && (
          <p className='px-4 md:px-20 text-xs md:text-sm font-normal tracking-wide text-justify leading-relaxed text-base-content/60'>
            {heroSupplementary}
          </p>
        )}

        <div className='flex justify-center mt-6'>
          <Link
            to={PrevPath}
            state={{ Frameworks: ReturnIT }}
            className='btn btn-outline text-sm md:text-base px-4 py-2'
          >
            Back
          </Link>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 justify-center items-center px-4 pb-5 md:px-10'>
        {printIt.map((Item) => (
          <Tool_Lib_Card
            key={Item.Name}
            Name={Item.Name}
            Summary={Item.Summary}
            URL={Item.URL}
          />
        ))}
      </div>
    </>
  );
};

export default Tool_Lib;
