import { useEffect } from "react";
import List from "../Data/JS.json";
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

  const def =
    "A programming language is a formal set of instructions that allows developers to communicate with computers to create software applications, scripts, or other tools. It provides the syntax and semantics for writing code that can perform specific tasks, manipulate data, and control hardware. Examples of programming languages include Python, Java, C++, and JavaScript, each with its own features, use cases, and paradigms.";

  return (
    <div
      className={`relative min-h-screen bg-base-100   motion-opacity-in-[0%] motion-blur-in-[40px] motion-ease-spring-snappy`}
    >
      {/* Header Section */}
      <div className='relative py-2xl mx-sm md:mx-xl lg:mx-4xl space-y-lg z-10'>
        <h1 className='heading'>Programming Languages</h1>
        <div className='px-md md:px-7xl'>
          <hr className='border-base-content' />
        </div>
        <p className='px-md md:px-5xl text-sm tracking-wider text-justify leading-relaxed text-base-content/70'>
          {def}
        </p>
        <p className='px-md md:px-5xl text-sm tracking-wider text-justify leading-relaxed text-base-content/70'>
          Discover AliHamza projects, thealihamza04 repositories and a programming
          language time line in this community-driven guide.
        </p>
      </div>

      {/* Language Cards */}
      <div className='flex flex-wrap gap-lg justify-center items-center px-md md:px-2xl lg:px-xl pb-2xl'>
        {List.map((Language, index) => (
          <LanCard
            key={index}
            Title={Language.Language}
            Summary={Language.Summary}
            Details={Language.More}
          />
        ))}
      </div>
    </div>
  );
};

export default Languages;
