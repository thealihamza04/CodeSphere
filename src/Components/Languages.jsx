import React, { useEffect } from "react";
import List from "../Data/JS.json";
import LanCard from "./cards/LanCard";
import useScrollRestoration from "./Hooks/ScrollRestoration";

const Languages = () => {
  // useScrollRestoration();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const def =
    "A programming language is a formal set of instructions that allows developers to communicate with computers to create software applications, scripts, or other tools. It provides the syntax and semantics for writing code that can perform specific tasks, manipulate data, and control hardware. Examples of programming languages include Python, Java, C++, and JavaScript, each with its own features, use cases, and paradigms.";

  return (
    <div
      className={`relative min-h-screen bg-gray-100   motion-opacity-in-[0%] motion-blur-in-[40px] motion-ease-spring-snappy`}
    >
      {/* Header Section */}
      <div className='relative py-9 mx-2 md:mx-8 lg:mx-16 space-y-6 z-10'>
        <h1 className='heading'>Programming Languages</h1>
        <div className='px-4 md:px-48'>
          <hr className='border-slate-700' />
        </div>
        <p className='px-4 md:px-20 text-sm tracking-wider text-justify leading-relaxed opacity-70'>
          {def}
        </p>
      </div>

      {/* Language Cards */}
      <div className='flex flex-wrap gap-6 justify-center items-center px-4 md:px-10 lg:px-8 pb-10'>
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
