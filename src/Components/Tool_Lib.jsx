import React, { useEffect } from "react";
import Tool_Lib_Card from "./cards/Tool_Lib_Card";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Tool_Lib = () => {
  const location = useLocation();
  const { tools } = location.state || { tools: [] }; // Handle if no state is passed
  const { Libraries } = location.state || { Libraries: [] }; // Handle if no state is passed
  const { ReturnIT } = location.state || { ReturnIT: [] };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let printIt = [];
  let heading = "";
  let toolDef =
    "Framework tools are software frameworks that provide developers with a structured foundation and pre-built components to build applications more efficiently. These tools often include libraries, templates, and best practices that streamline the development process.";

  let LibDef =
    "A framework's library refers to a collection of pre-written, reusable code or functions that a framework depends on or integrates with to provide specific functionalities. Libraries within a framework offer tools or utilities to perform common tasks like data manipulation, API calls, or user interface rendering.";
  let def = "";

  if (tools !== undefined) {
    printIt = tools;
    heading = "Tools";
    def = toolDef;
  } else {
    printIt = Libraries;
    heading = "Libraries";
    def = LibDef;
  }

  return (
    <>
      <>
        <div className="py-9 px-4 pd:px-10 space-y-6 bg-gray-100">
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-gray-800">
            {heading}
          </h1>
          <div className="px-4 md:px-48">
            <hr />
          </div>
          <p className="px-4 md:px-20 text-sm font-medium text-justify leading-relaxed">
            {def}
          </p>

          <div className="flex justify-center mt-6">
            <Link
              className="btn btn-outline text-sm md:text-base px-4 py-2"
              to="/Frameworks"
              state={{ Frameworks: ReturnIT }}
            >
              Back
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center px-4 pb-5 md:px-10">
          {printIt.map((Item, index) => (
            <Tool_Lib_Card
              key={index} // Use a unique key (assuming Framework names are unique)
              Name={Item.Name}
              Summary={Item.Summary}
              URL={Item.URL}
            />
          ))}
        </div>
      </>
    </>
  );
};

export default Tool_Lib;
