import { useEffect, useMemo } from "react";
import Card from "./cards/Card";
import { Link, useLocation } from "react-router-dom";
import useSEO from "./Hooks/useSEO";
import List from "../Data/JS.json";
import { IoIosArrowBack } from "react-icons/io";


const ProgLan = () => {
  const location = useLocation();
  const { Frameworks: stateFrameworks = [] } = location.state || {};

  const langFromQuery = new URLSearchParams(location.search).get("lang");
  const normalizedLang = langFromQuery?.toLowerCase();

  const languageDetails = useMemo(() => {
    if (!normalizedLang) return null;
    return (
      List.find(
        (lang) => lang.Language.toLowerCase() === normalizedLang
      ) || null
    );
  }, [normalizedLang]);

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

  const frameworksForLanguage = useMemo(() => {
    if (!languageDetails) return [];
    return languageDetails.More.map((fw) => ({
      ...fw,
      Language: languageDetails.Language,
      LanguageSummary: languageDetails.Summary,
    }));
  }, [languageDetails]);

  const normalizedStateFrameworks = useMemo(() => {
    if (stateFrameworks.length === 0) return [];

    return stateFrameworks.map((fw) => {
      if (fw.Language && fw.LanguageSummary) return fw;

      if (languageDetails) {
        return {
          ...fw,
          Language: languageDetails.Language,
          LanguageSummary: languageDetails.Summary,
        };
      }

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
  }, [stateFrameworks, languageDetails]);

  const frameworksData =
    frameworksForLanguage.length > 0
      ? frameworksForLanguage
      : normalizedStateFrameworks.length > 0
        ? normalizedStateFrameworks
        : allFrameworks;

  const groupedFrameworks = useMemo(() => {
    if (frameworksForLanguage.length > 0) {
      return [
        {
          language: languageDetails?.Language || "Frameworks",
          list: frameworksForLanguage,
        },
      ];
    }

    if (normalizedStateFrameworks.length > 0) {
      const groupedMap = normalizedStateFrameworks.reduce((acc, fw) => {
        const key = fw.Language || "Frameworks";
        if (!acc.has(key)) {
          acc.set(key, []);
        }
        acc.get(key).push(fw);
        return acc;
      }, new Map());

      return Array.from(groupedMap.entries()).map(([language, list]) => ({
        language,
        list,
      }));
    }

    return List.map((lang) => ({
      language: lang.Language,
      list: lang.More.map((fw) => ({
        ...fw,
        Language: lang.Language,
        LanguageSummary: lang.Summary,
      })),
    }));
  }, [
    frameworksForLanguage,
    languageDetails,
    normalizedStateFrameworks,
  ]);

  const canonicalUrl = languageDetails
    ? `https://codes-sphere.vercel.app/Frameworks?lang=${encodeURIComponent(
      languageDetails.Language
    )}`
    : "https://codes-sphere.vercel.app/Frameworks";

  const seoTitle = languageDetails
    ? `${languageDetails.Language} Frameworks | CodeSphere`
    : "Frameworks Overview | CodeSphere";

  const defaultDefinition =
    "A framework is a pre-built structure or platform that provides a foundation for developing software applications. It includes reusable components, libraries, and tools to help developers organize and standardize their code, making development faster and more efficient.";

  const heroTitle = languageDetails?.Language || "Frameworks";
  const heroDescription =
    languageDetails?.Summary || defaultDefinition;

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
          name: languageDetails?.Language
            ? `${languageDetails.Language} Frameworks`
            : "Frameworks Overview",
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
              name: languageDetails?.Language || "Frameworks",
              item: canonicalUrl,
            },
          ],
        },
      ],
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='px-4 space-y-6 py-9 bg-base-100'>
        <h1 className='heading'>{heroTitle}</h1>
        <div className='px-4 md:px-48'>
        </div>
        <p className='px-4 text-sm font-normal leading-relaxed tracking-wide text-center md:px-20 text-base-content/80'>
          {heroDescription}
        </p>
        <div
          className='fixed top-0 flex justify-center mt-8 !z-[999]'
        >
          <Link
            className='text-sm btn btn-sm btn-ghost no-animation md:text-base'
            to='/'
          >
            <IoIosArrowBack />
          </Link>
        </div>
      </div>
      {groupedFrameworks.map(({ language, list }) => (
        <div key={language} className='w-full'>
          {groupedFrameworks.length > 1 && (
            <h2 className='mt-8 mb-4 text-3xl font-semibold text-center'>
              {language}
            </h2>
          )}
          <div className='flex flex-wrap items-center justify-center gap-4 px-4 pb-10 md:px-10'>
            {list.map((framework) => (
              <Card
                key={`${language}-${framework.Framework}`}
                Title={framework.Framework}
                Summary={framework.Summary}
                URL={framework.URL}
                Tools={framework.Tools}
                Lib={framework.Libraries}
                RTNIT={frameworksData}
                PrevPath={`${location.pathname}${location.search}`}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProgLan;
