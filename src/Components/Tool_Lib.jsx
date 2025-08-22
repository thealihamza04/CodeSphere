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

  let tools = stateTools;
  let Libraries = stateLibraries;
  let ReturnIT = stateReturn;

  if (tools.length === 0 && Libraries.length === 0 && frameworkName) {
    const decoded = decodeURIComponent(frameworkName).toLowerCase();
    const allFrameworks = List.flatMap((lang) =>
      lang.More.map((fw) => ({ ...fw, Language: lang.Language }))
    );
    const match = allFrameworks.find(
      (fw) => fw.Framework.toLowerCase() === decoded
    );
    if (match) {
      tools = match.Tools || [];
      Libraries = match.Libraries || [];
    }
    ReturnIT = allFrameworks;
  }

  let printIt = [];
  let heading = "";
  let def = "";
  let crumbName = "";

  const toolDef =
    "Framework tools are software frameworks that provide developers with a structured foundation and pre-built components to build applications more efficiently. These tools often include libraries, templates, and best practices that streamline the development process.";

  const libDef =
    "A framework's library refers to a collection of pre-written, reusable code or functions that a framework depends on or integrates with to provide specific functionalities. Libraries within a framework offer tools or utilities to perform common tasks like data manipulation, API calls, or user interface rendering.";

  if (type === "tools") {
    printIt = tools;
    heading = "Tools";
    def = toolDef;
    crumbName = "Tools";
  } else {
    printIt = Libraries;
    heading = "Libraries";
    def = libDef;
    crumbName = "Libraries";
  }

  useSEO({
    title: `${heading} for Frameworks | CodeSphere`,
    description: def,
    keywords:
      "AliHamza projects, thealihamza04 projects, programming language timeline, projramming lang time line",
    canonical: `https://codes-sphere.vercel.app/Frameworks/${encodeURIComponent(
      frameworkName
    )}/${type}`,
    og: {
      title: `${heading} for Frameworks | CodeSphere`,
      description: def,
      url: `https://codes-sphere.vercel.app/Frameworks/${encodeURIComponent(
        frameworkName
      )}/${type}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${heading} for Frameworks | CodeSphere`,
      description: def,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: `${heading} for Frameworks`,
          provider: { "@type": "Organization", name: "CodeSphere" },
          url: `https://codes-sphere.vercel.app/Frameworks/${encodeURIComponent(
            frameworkName
          )}/${type}`,
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
              item: `https://codes-sphere.vercel.app/Frameworks/${encodeURIComponent(
                frameworkName
              )}/${type}`,
            },
          ],
        },
      ],
    },
  });

  return (
    <>
      <div className='py-9 px-4 pd:px-10 space-y-6 bg-base-100'>
        <h1 className='heading'>{heading}</h1>
        <div className='px-4 md:px-48'>
          <hr />
        </div>
        <p className='px-4 md:px-20 text-sm font-normal tracking-wide text-justify leading-relaxed'>
          {def}
        </p>

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
