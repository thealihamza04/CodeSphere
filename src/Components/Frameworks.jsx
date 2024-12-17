import React, { useEffect } from "react";
import Card from "./cards/Card";
import { Link, useLocation } from "react-router-dom";

const ProgLan = () => {
  const location = useLocation();
  const { Frameworks } = location.state || { Frameworks: [] };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const def =
    "A framework is a pre-built structure or platform that provides a foundation for developing software applications. It includes reusable components, libraries, and tools to help developers organize and standardize their code, making development faster and more efficient.";

  return (
    <>
      <div className="py-9 px-4 space-y-6 bg-gray-100">
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-gray-800">
          Frameworks
        </h1>
        <div className="px-4 md:px-48">
          <hr />
        </div>
        <p className="px-4 md:px-20 text-sm font-medium text-justify leading-relaxed">
          {def}
        </p>
        <div className="flex justify-center mt-8">
          <Link
            className="btn btn-outline no-animation text-sm md:text-base"
            to="/"
          >
            Back
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center px-4 md:px-10 pb-10">
        {Frameworks.map((framework, index) => (
          <Card
            key={index} // Unique key for each framework
            Title={framework.Framework}
            Summary={framework.Summary}
            URL={framework.URL}
            Tools={framework.Tools}
            Lib={framework.Libraries}
            RTNIT={Frameworks}
          />
        ))}
      </div>
    </>
  );
};

export default ProgLan;
