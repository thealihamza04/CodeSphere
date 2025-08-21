import Tool_Lib_Card from "./cards/Tool_Lib_Card";
import { useLocation, Link } from "react-router-dom";
import useSEO from "./Hooks/useSEO";

const Tool_Lib = () => {
  const location = useLocation();
  const {
    tools = [],
    Libraries = [],
    ReturnIT = [],
    PrevPath = "/Frameworks",
  } = location.state || {};

  let printIt = [];
  let heading = "";
  let def = "";
  let crumbName = "";

  const toolDef =
    "Framework tools are software frameworks that provide developers with a structured foundation and pre-built components to build applications more efficiently. These tools often include libraries, templates, and best practices that streamline the development process.";

  const libDef =
    "A framework's library refers to a collection of pre-written, reusable code or functions that a framework depends on or integrates with to provide specific functionalities. Libraries within a framework offer tools or utilities to perform common tasks like data manipulation, API calls, or user interface rendering.";

  if (tools.length > 0) {
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
    canonical: "https://codesphere.dev/Frameworks/ToLib",
    og: {
      title: `${heading} for Frameworks | CodeSphere`,
      description: def,
      url: "https://codesphere.dev/Frameworks/ToLib",
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
          url: "https://codesphere.dev/Frameworks/ToLib",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://codesphere.dev/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Frameworks",
              item: "https://codesphere.dev/Frameworks",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: crumbName,
              item: "https://codesphere.dev/Frameworks/ToLib",
            },
          ],
        },
      ],
    },
  });

  return (
    <>
      <div className='py-9 px-4 pd:px-10 space-y-6 bg-gray-100'>
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
        {printIt.map((Item, index) => (
          <Tool_Lib_Card
            key={index}
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
