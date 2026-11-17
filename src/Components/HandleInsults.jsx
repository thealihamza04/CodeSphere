import { useEffect } from "react";
import { LuQuote } from "react-icons/lu";
import data from "../Data/HandleInsults.json";
import useSEO from "./Hooks/useSEO";

const PAGE_URL = "https://codes-sphere.vercel.app/handle-insults";
const { Mindset, Situations } = data;

const HandleInsults = () => {
  useSEO({
    title: "Handle Insults & Bullies Like a Pro | CodeSphere",
    description:
      "Exact scripts, composure techniques and boundary-setting lines for backhanded compliments, interruptions, credit theft, insults and passive-aggressive jabs.",
    keywords:
      "handle insults, deal with bullies, comeback scripts, boundary setting, assertive communication, workplace disrespect, passive aggressive responses",
    canonical: PAGE_URL,
    og: {
      title: "Handle Insults & Bullies Like a Pro | CodeSphere",
      description: "Exact scripts and composure techniques for handling disrespect with calm assertiveness.",
      url: PAGE_URL,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Handle Insults & Bullies Like a Pro | CodeSphere",
      description: "Exact scripts and composure techniques for handling disrespect with calm assertiveness.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      name: "Handle Insults & Bullies Like a Pro",
      url: PAGE_URL,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative max-w-full min-h-screen bg-base-100" data-page-context={JSON.stringify(data)}>
      <div className="px-4 py-12 mx-auto max-w-4xl md:px-8">
        {/* Header */}
        <div className="pt-4 mb-12 text-center">
          <h1 className="text-4xl heading md:text-6xl">Handle Insults & Bullies Like a Pro</h1>
        </div>

        {/* Core Mindset */}
        <section className="p-6 mb-12 border md:p-8 rounded-2xl bg-base-200 border-base-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-primary text-primary-content">
              <LuQuote className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-primary">{Mindset.Label}</p>
              <h2 className="text-lg font-bold tracking-tight text-base-content">{Mindset.Title}</h2>
            </div>
          </div>
          <blockquote className="text-xl font-bold leading-snug tracking-tight md:text-2xl text-base-content">
            “{Mindset.Quote}”
          </blockquote>
          <p className="mt-3 text-sm italic md:text-base text-base-content/80">
            Translation: “{Mindset.Translation}”
          </p>
          <p className="mt-4 text-sm leading-relaxed md:text-base text-base-content/85">{Mindset.Text}</p>
        </section>

        {/* Situations */}
        <ol className="space-y-6">
          {Situations.map((situation) => (
            <li key={situation.Title} className="p-6 border md:p-8 rounded-2xl bg-base-200 border-base-300">
              <h2 className="text-xl font-black tracking-tight md:text-2xl text-base-content">{situation.Title}</h2>

              <div className="pl-4 mt-4 border-l-4 border-accent">
                <p className="text-xs font-bold tracking-wider uppercase text-accent">Example</p>
                <p className="mt-1 text-sm leading-relaxed md:text-base text-base-content/85">{situation.Example}</p>
              </div>

              <div className={`grid gap-4 mt-6 ${situation.Scripts.length > 1 ? "md:grid-cols-2" : ""}`}>
                {situation.Scripts.map((script) => (
                  <div key={script.Name} className="p-5 border md:p-6 rounded-xl bg-base-100 border-base-300">
                    <h3 className="mb-3 text-xs font-bold tracking-wider uppercase text-primary">{script.Name}</h3>
                    <p className="text-lg font-bold leading-snug md:text-xl text-base-content">“{script.Line}”</p>
                    {script.Note && (
                      <p className="mt-3 text-sm leading-relaxed text-base-content/80">{script.Note}</p>
                    )}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HandleInsults;
