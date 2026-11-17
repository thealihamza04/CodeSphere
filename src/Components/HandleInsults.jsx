import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { LuQuote, LuSquare, LuVolume2 } from "react-icons/lu";
import data from "../Data/HandleInsults.json";
import useSEO from "./Hooks/useSEO";

const PAGE_URL = "https://codes-sphere.vercel.app/handle-insults";
const { Mindset, Situations } = data;

const ComicPanel = ({ situation }) => {
  const [active, setActive] = useState(0);
  const { Comic, Example, Scripts } = situation;

  return (
    <div className="mt-5">
      <div className="p-3 bg-white border-4 rounded-xl md:p-5 border-base-content">
        <div className="grid grid-cols-2 gap-3 md:gap-8">
          {[
            { key: "Them", text: Example, image: Comic.Them, alt: "Illustration of the other person speaking", tail: "left-6", flip: false },
            { key: "You", text: Scripts[active].Line, image: Comic.You, alt: "Illustration of you replying calmly", tail: "right-6", flip: true },
          ].map((side) => (
            <div key={side.key} className="flex flex-col justify-end min-w-0">
              <div className="relative p-3 mb-4 text-sm font-bold leading-snug break-words bg-white border-2 rounded-2xl md:p-4 md:text-base text-neutral-900 border-neutral-900">
                {side.text}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-2 ${side.tail} size-4 rotate-45 bg-white border-b-2 border-r-2 border-neutral-900`}
                />
              </div>
              <img
                src={`/comics/${side.image}`}
                alt={side.alt}
                loading="lazy"
                className={`h-44 mx-auto w-auto max-w-full object-contain md:h-60 ${side.flip ? "-scale-x-100" : ""}`}
              />
              <p className="mt-1 text-xs font-bold tracking-wider text-center uppercase text-neutral-700">{side.key}</p>
            </div>
          ))}
        </div>
      </div>

      {Scripts.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {Scripts.map((script, i) => (
            <button
              key={script.Name}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`btn btn-sm ${i === active ? "btn-primary" : "btn-outline"}`}
            >
              {script.Name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

ComicPanel.propTypes = {
  situation: PropTypes.shape({
    Example: PropTypes.string.isRequired,
    Comic: PropTypes.shape({
      Them: PropTypes.string.isRequired,
      You: PropTypes.string.isRequired,
    }).isRequired,
    Scripts: PropTypes.arrayOf(
      PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Line: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const ListenButton = ({ src }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.addEventListener("ended", () => setPlaying(false));
      audio.addEventListener("error", () => setPlaying(false));
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const toggle = () => {
    const audio = getAudio();
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      return;
    }
    audio.currentTime = 0;
    setPlaying(true);
    const result = audio.play();
    if (result && typeof result.catch === "function") {
      result.catch(() => setPlaying(false));
    }
  };

  return (
    <button
      type="button"
      aria-label={playing ? "Stop reading the proverb aloud" : "Listen to the proverb read aloud"}
      aria-pressed={playing}
      onClick={toggle}
      className="mt-4 btn btn-sm btn-primary"
    >
      {playing ? <LuSquare className="size-4" aria-hidden="true" /> : <LuVolume2 className="size-4" aria-hidden="true" />}
      {playing ? "Stop" : "Listen"}
    </button>
  );
};

ListenButton.propTypes = {
  src: PropTypes.string.isRequired,
};

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
          <ListenButton src={Mindset.Audio} />
          <p className="mt-3 text-sm italic md:text-base text-base-content/80">
            Translation: “{Mindset.Translation}”
          </p>
        </section>

        {/* Situations */}
        <ol className="space-y-6">
          {Situations.map((situation) => (
            <li key={situation.Title} className="p-6 border md:p-8 rounded-2xl bg-base-200 border-base-300">
              <h2 className="text-xl font-black tracking-tight md:text-2xl text-base-content">{situation.Title}</h2>

              <ComicPanel situation={situation} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HandleInsults;
