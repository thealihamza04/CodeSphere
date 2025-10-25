import { useEffect, useMemo } from "react";
import List from "../Data/JS.json";
import LibrariesByLanguage from "../Data/LanguageLibraries.json";
import LanCard from "./cards/LanCard";
import useSEO from "./Hooks/useSEO";

const Languages = () => {
  useSEO({
    title: "Programming Languages Guide | CodeSphere",
    description:
      "Explore programming languages, AliHamza projects and thealihamza04 programming language timeline on CodeSphere.",
    keywords:
      "AliHamza projects, thealihamza04 projects, programming language timeline, projramming lang time line",
    canonical: "https://codes-sphere.vercel.app/",
    og: {
      title: "Programming Languages Guide | CodeSphere",
      description:
        "Explore programming languages, AliHamza projects and thealihamza04 programming language timeline on CodeSphere.",
      url: "https://codes-sphere.vercel.app/",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Programming Languages Guide | CodeSphere",
      description:
        "Explore programming languages, AliHamza projects and thealihamza04 programming language timeline on CodeSphere.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Programming Languages Guide",
      url: "https://codes-sphere.vercel.app/",
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const languagesWithLibraries = useMemo(() => {
    const libraryMap = new Map(
      LibrariesByLanguage.map((entry) => [entry.Language.toLowerCase(), entry])
    );

    return List.map((language) => {
      const match = libraryMap.get(language.Language.toLowerCase());

      return {
        ...language,
        LanguageURL: match?.LanguageURL ?? "",
        Libraries: match?.Libraries ?? [],
      };
    });
  }, []);

  const def =
    "A programming language is a formal set of instructions that allows developers to communicate with computers to create software applications, scripts, or other tools. It provides the syntax and semantics for writing code that can perform specific tasks, manipulate data, and control hardware. Examples of programming languages include Python, Java, C++, and JavaScript, each with its own features, use cases, and paradigms.";

  return (
    <div
      className={`relative min-h-screen bg-base-100   `}
    >
      {/* Header Section */}
      <div
        className='relative z-10 mx-2 space-y-6 py-9 md:mx-8 lg:mx-16'
        data-aos='fade-up'
      >
        <h1 className='heading'>Programming Languages</h1>
        <div className='px-4 md:px-48'>
        </div>
        <p
          className='px-4 text-sm leading-relaxed tracking-wider text-center md:px-20 text-base-content/70'
          data-aos='fade-up'
          data-aos-delay={100}
        >
          {def}
        </p>
      </div>

      {/* Language Cards */}
      <div className='flex flex-wrap items-center justify-center gap-6 px-4 pb-10 md:px-10 lg:px-8'>
        {languagesWithLibraries.map((Language, index) => (
          <LanCard
            key={index}
            Title={Language.Language}
            Summary={Language.Summary}
            Details={Language.More}
            Libraries={Language.Libraries}
            LanguageURL={Language.LanguageURL}
            animationDelay={index * 60}
          />
        ))}
      </div>
    </div>
  );
};

export default Languages;
