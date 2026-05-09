import { useEffect, useMemo, useRef, useState } from "react";
import LanguagesCatalog from "../Data/LanguagesCatalog.json";
import LibrariesRegistry from "../Data/LibrariesRegistry.json";
import LanCard from "./cards/LanCard";
import useSEO from "./Hooks/useSEO";
import {
  buildEnhancedLanguageMasonryLayout,
  buildLanguageMasonryLayout,
  getLanguageMasonryConfig,
} from "../utils/pretextMasonry";

const ProgrammingLanguages = () => {
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

  const [viewportWidth, setViewportWidth] = useState(1024);
  const [pretextMasonryLayout, setPretextMasonryLayout] = useState(null);
  const [measuredCardHeights, setMeasuredCardHeights] = useState({});
  const languageCardRefs = useRef([]);

  const languagesWithLibraries = useMemo(() => {
    const libraryMap = new Map(
      LibrariesRegistry.map((entry) => [entry.Language.toLowerCase(), entry])
    );

    return LanguagesCatalog.map((language) => {
      const match = libraryMap.get(language.Language.toLowerCase());

      return {
        ...language,
        LanguageURL: match?.LanguageURL ?? "",
        Libraries: match?.Libraries ?? [],
      };
    });
  }, []);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const masonryConfig = useMemo(
    () => getLanguageMasonryConfig(viewportWidth),
    [viewportWidth]
  );

  const masonryConfigKey = `${masonryConfig.columns}-${masonryConfig.containerWidth}`;

  const fallbackMasonryLayout = useMemo(
    () =>
      buildLanguageMasonryLayout(
        languagesWithLibraries,
        masonryConfig,
        null,
        measuredCardHeights
      ),
    [languagesWithLibraries, masonryConfig, measuredCardHeights]
  );

  useEffect(() => {
    let cancelled = false;

    buildEnhancedLanguageMasonryLayout(
      languagesWithLibraries,
      masonryConfig
    ).then((layout) => {
      if (!cancelled) {
        setPretextMasonryLayout({ key: masonryConfigKey, layout });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [languagesWithLibraries, masonryConfig, masonryConfigKey]);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      setMeasuredCardHeights((previousHeights) => {
        let changed = false;
        const nextHeights = { ...previousHeights };

        entries.forEach((entry) => {
          const card = entry.target;
          const language = card.dataset.language;
          const cardContentHeight = card.firstElementChild?.scrollHeight ?? 0;
          const height = Math.ceil(
            Math.max(card.scrollHeight, cardContentHeight)
          );

          if (language && Math.abs((nextHeights[language] ?? 0) - height) > 1) {
            nextHeights[language] = height;
            changed = true;
          }
        });

        return changed ? nextHeights : previousHeights;
      });
    });

    languageCardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [languagesWithLibraries, masonryConfigKey]);

  const hasMeasuredCardHeights = Object.keys(measuredCardHeights).length > 0;
  const masonryLayout =
    hasMeasuredCardHeights || pretextMasonryLayout?.key !== masonryConfigKey
      ? fallbackMasonryLayout
      : pretextMasonryLayout.layout;

  const def =
    "A programming language is a formal set of instructions that allows developers to communicate with computers to create software applications, scripts, or other tools. It provides the syntax and semantics for writing code that can perform specific tasks, manipulate data, and control hardware. Examples of programming languages include Python, Java, C++, and JavaScript, each with its own features, use cases, and paradigms.";

  return (
    <div
      className={`relative min-h-screen bg-base-100 max-w-full overflow-x-clip`}
    >
      {/* Header Section */}
      <div
        className='relative z-10 mx-2 space-y-6 py-9 md:mx-8 lg:mx-16'
      >
        <h1 className='heading'>Programming Languages</h1>
        <p
          className='px-4 text-sm leading-relaxed tracking-wider text-center md:px-20 text-base-content/70'
        >
          {def}
        </p>
      </div>

      {/* Language Cards */}
      <div className='px-4 pb-10 md:px-10 lg:px-8'>
        <div
          className='relative mx-auto transition-[height] duration-500 ease-out'
          style={{
            height: masonryLayout.height,
            width: masonryConfig.containerWidth,
            maxWidth: "100%",
          }}
        >
          {languagesWithLibraries.map((Language, index) => {
            const position = masonryLayout.cards[index];

            return (
              <LanCard
                key={Language.Language}
                Title={Language.Language}
                Summary={Language.Summary}
                Details={Language.More}
                Libraries={Language.Libraries}
                LanguageURL={Language.LanguageURL}
                className='absolute left-0 top-0 transition-transform duration-500 ease-out'
                cardRef={(card) => {
                  languageCardRefs.current[index] = card;
                }}
                style={{
                  height: position.height,
                  transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgrammingLanguages;
