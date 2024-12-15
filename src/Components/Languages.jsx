import React, { useEffect } from "react";
import List from "./JS.json";
import LanCard from "./cards/LanCard";

const Languages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const def =
    "A programming language is a formal set of instructions that allows developers to communicate with computers to create software applications, scripts, or other tools. It provides the syntax and semantics for writing code that can perform specific tasks, manipulate data, and control hardware. Examples of programming languages include Python, Java, C++, and JavaScript, each with its own features, use cases, and paradigms.";

  return (
    <div className="relative min-h-screen dark:bg-slate-950">
      <div className="relative py-9 mx-4 md:mx-8 lg:mx-16 space-y-6 z-10">
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold">Programming Languages</h1>
        <div className="px-4 md:px-48">
          <hr />
        </div>
        <p className="px-4 md:px-20 text-sm md:text-lg text-justify">{def}</p>
      </div>

      {/* Language Cards */}
      <div className="flex flex-wrap gap-4 justify-center items-center px-4 md:px-10 lg:px-16 pb-10">
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
