import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import useSEO from "./Hooks/useSEO";
import Languages from "../Data/JS.json";
import LibrariesByLanguage from "../Data/LanguageLibraries.json";
import Tool_Lib_Card from "./cards/Tool_Lib_Card";
import { IoIosArrowBack } from "react-icons/io";

const LanguageLibraries = () => {
  const location = useLocation();
  const langQuery = new URLSearchParams(location.search).get("lang");
  const normalizedLang = langQuery?.toLowerCase();

  const libraryMap = useMemo(
    () =>
      new Map(
        LibrariesByLanguage.map((entry) => [entry.Language.toLowerCase(), entry])
      ),
    []
  );

  const languageDetails = useMemo(() => {
    if (!normalizedLang) return null;
    return (
      Languages.find(
        (language) => language.Language.toLowerCase() === normalizedLang
      ) || null
    );
  }, [normalizedLang]);

  const libraryDetails = useMemo(() => {
    if (!normalizedLang) return null;
    return libraryMap.get(normalizedLang) || null;
  }, [libraryMap, normalizedLang]);

  const sections = useMemo(() => {
    if (languageDetails && libraryDetails) {
      return [
        {
          language: languageDetails.Language,
          summary: languageDetails.Summary,
          officialURL: libraryDetails.LanguageURL ?? "",
          libraries: libraryDetails.Libraries ?? [],
        },
      ];
    }

    return Languages.map((language) => {
      const entry = libraryMap.get(language.Language.toLowerCase());
      return {
        language: language.Language,
        summary: language.Summary,
        officialURL: entry?.LanguageURL ?? "",
        libraries: entry?.Libraries ?? [],
      };
    });
  }, [languageDetails, libraryDetails, libraryMap]);

  const heroTitle = languageDetails?.Language || "Language Libraries";
  const heroDescription =
    languageDetails?.Summary ||
    "Explore curated libraries and ecosystems that extend each programming language across the CodeSphere catalog.";

  const canonicalUrl = languageDetails
    ? `https://codes-sphere.vercel.app/libraries?lang=${encodeURIComponent(
      languageDetails.Language
    )}`
    : "https://codes-sphere.vercel.app/libraries";

  const seoTitle = languageDetails
    ? `${languageDetails.Language} Libraries | CodeSphere`
    : "Programming Language Libraries | CodeSphere";

  useSEO({
    title: seoTitle,
    description: heroDescription,
    keywords:
      "programming language libraries, developer ecosystems, AliHamza projects, thealihamza04 projects",
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
          "@type": "WebPage",
          name: heroTitle,
          description: heroDescription,
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
              name: heroTitle,
              item: canonicalUrl,
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
      <div className='px-4 space-y-6 py-9 bg-base-100'>
        <h1 className='heading'>{heroTitle}</h1>
        <div className='px-4 md:px-48'></div>
        <p className='px-4 text-sm leading-relaxed tracking-wide text-center md:px-20 text-base-content/80'>
          {heroDescription}
        </p>
        {normalizedLang && (
          <div className='fixed top-0 flex justify-center left-4'>
            <Link
              to='/'
              className='flex items-center gap-1 px-4 py-2 text-sm btn btn-sm btn-ghost md:text-base'
            >
              <IoIosArrowBack />
            </Link>
          </div>
        )}
      </div>

      {sections.map((section) => (
        <section
          key={section.language}
          className='px-4 py-8 space-y-4 md:px-10 bg-base-100'
        >
          {!languageDetails && (
            <div className='max-w-3xl mx-auto space-y-3 text-center'>
              <h2 className='text-xl font-semibold md:text-2xl text-base-content'>
                {section.language}
              </h2>
              <p className='text-sm leading-relaxed text-base-content/70'>
                {section.summary}
              </p>
              {section.officialURL && (
                <a
                  className='inline-flex items-center justify-center px-4 py-2 text-xs font-medium transition-colors border rounded-full text-base-content/80 border-base-300 hover:text-base-content hover:bg-base-300/40'
                  href={section.officialURL}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Official Docs
                </a>
              )}
            </div>
          )}

          <div className='flex flex-wrap items-center justify-center gap-4'>
            {section.libraries.length > 0 ? (
              section.libraries.map((library) => (
                <Tool_Lib_Card
                  key={`${section.language}-${library.Name}`}
                  Name={library.Name}
                  Summary={library.Summary}
                  URL={library.URL}
                />
              ))
            ) : (
              <p className='text-sm text-base-content/60'>
                Libraries coming soon.
              </p>
            )}
          </div>
        </section>
      ))}
    </>
  );
};

export default LanguageLibraries;
