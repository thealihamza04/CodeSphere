import { Fragment, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { LuSearch } from "react-icons/lu";
import terms, { sortKey } from "../Data/TechStack.js";
import useSEO from "./Hooks/useSEO";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_URL = "https://codes-sphere.vercel.app/tech-stack";

const TermChip = ({ item, isLast }) => {
  const [alignRight, setAlignRight] = useState(false);
  // Flip the tooltip to the left when the chip sits near the right edge of the screen
  const place = (e) => setAlignRight(e.currentTarget.getBoundingClientRect().left + 240 > window.innerWidth);

  return (
  <li className="relative inline whitespace-nowrap group" onMouseEnter={place} onFocus={place}>
    <button
      type="button"
      className="inline font-medium text-base-content/80 transition-colors duration-200 hover:text-primary focus:outline-none focus-visible:text-primary focus-visible:underline"
      aria-describedby={`tip-${item.term}`}
    >
      {item.term}
    </button>
    <span
      id={`tip-${item.term}`}
      role="tooltip"
      className={`pointer-events-none absolute ${alignRight ? "right-0" : "left-0"} bottom-full z-30 mb-1.5 w-56 whitespace-normal max-w-[80vw] rounded-lg border border-base-300 bg-base-100 px-2.5 py-2 text-left shadow-lg invisible group-hover:visible group-focus-within:visible`}
    >
      <span className="block text-[9px] font-black uppercase tracking-[0.15em] text-primary">
        {item.category}
      </span>
      <span className="block mt-0.5 text-xs leading-snug text-base-content/75">{item.brief}</span>
    </span>
    {!isLast && <span className="text-base-content/30">,</span>}
  </li>
  );
};

TermChip.propTypes = {
  item: PropTypes.shape({
    term: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    brief: PropTypes.string.isRequired,
  }).isRequired,
  isLast: PropTypes.bool,
};

const TechStack = () => {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState("A");

  useSEO({
    title: "Tech Stack A–Z | CodeSphere",
    description: `An A–Z index of ${terms.length} libraries, frameworks and developer tools with quick, hoverable briefs.`,
    keywords: "tech stack, libraries list, frameworks list, developer tools, A-Z tech stack",
    canonical: PAGE_URL,
    og: {
      title: "Tech Stack A–Z | CodeSphere",
      description: "Every library, framework and dev tool from A to Z with a quick brief on hover.",
      url: PAGE_URL,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tech Stack A–Z | CodeSphere",
      description: "Every library, framework and dev tool from A to Z with a quick brief on hover.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "CodeSphere Tech Stack A–Z",
      url: PAGE_URL,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms
      .filter((t) => !q || t.term.toLowerCase().includes(q) || t.brief.toLowerCase().includes(q))
      .reduce((acc, item) => {
        const letter = sortKey(item.term)[0].toUpperCase();
        (acc[letter] ||= []).push(item);
        return acc;
      }, {});
  }, [query]);

  const letters = ALPHABET.filter((l) => grouped[l]);

  // Track which letter section is on screen to highlight it in the sticky index
  useEffect(() => {
    const onScroll = () => {
      let current = letters[0];
      for (const l of letters) {
        const el = document.getElementById(`letter-${l}`);
        if (el && el.getBoundingClientRect().top <= 80) current = l;
      }
      if (current) setActiveLetter(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [letters.join("")]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative max-w-full min-h-screen bg-base-100" data-page-context={JSON.stringify(terms)}>
      <div className="px-4 pt-16 pb-8 text-center md:px-12">
        <h1 className="text-4xl heading md:text-7xl">Tech Stack A–Z</h1>
        <p className="max-w-2xl mx-auto mt-4 text-sm font-medium leading-relaxed text-base-content/60 md:text-lg">
          {terms.length} libraries, frameworks and tools from A to Z. Hover or tap a name for a quick brief.
        </p>
        <label className="flex items-center gap-2 px-3 py-2 border rounded-full border-base-300 bg-base-200/40 w-full max-w-sm mx-auto mt-8">
          <LuSearch className="size-4 text-base-content/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name, language or type…"
            className="w-full text-sm bg-transparent outline-none"
          />
        </label>
      </div>

      {/* Timeline */}
      <div className="px-4 py-12 mx-auto max-w-6xl md:px-12">
        {letters.length === 0 && (
          <p className="py-20 text-center text-base-content/50">Nothing matches “{query}”.</p>
        )}
        <ol className="relative md:border-l-2 md:border-base-content/10 md:ml-5">
          {letters.map((letter) => (
            <li
              key={letter}
              id={`letter-${letter}`}
              data-letter={letter}
              className="relative pb-10 md:pb-14 md:pl-12"
            >
              {/* Desktop: node on the timeline; Mobile: sticky letter header */}
              <div className="sticky top-0 md:top-6 z-10 -mx-4 px-4 py-2 mb-3 bg-base-100/95 backdrop-blur md:h-0 md:mx-0 md:p-0 md:mb-0 md:bg-transparent md:backdrop-blur-none">
                <span
                  className={`flex items-center justify-center size-9 md:size-10 md:absolute md:-left-[68px] md:top-0 rounded-full border text-base md:text-lg font-black transition-colors ${activeLetter === letter
                    ? "border-primary bg-primary text-primary-content"
                    : "border-base-300 bg-base-100 text-base-content"
                    }`}
                >
                  {letter}
                </span>
              </div>
              <div className="md:pt-1.5">
                <ul className="text-[15px] leading-7 md:text-base md:leading-8">
                  {grouped[letter].map((item, i) => (
                    <Fragment key={item.term}>
                      <TermChip item={item} isLast={i === grouped[letter].length - 1} />{" "}
                    </Fragment>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TechStack;
