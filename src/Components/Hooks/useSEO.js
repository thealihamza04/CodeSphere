import { useEffect } from "react";

const setMeta = (attr, name, content) => {
  let element = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  og = {},
  twitter = {},
  structuredData,
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      setMeta("name", "description", description);
    }
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }
    if (canonical) {
      let link = document.head.querySelector("link[rel=\"canonical\"]");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    Object.entries(og).forEach(([key, value]) => {
      setMeta("property", `og:${key}`, value);
    });

    Object.entries(twitter).forEach(([key, value]) => {
      setMeta("name", `twitter:${key}`, value);
    });

    const scriptId = "seo-structured-data";
    let script = document.getElementById(scriptId);
    if (structuredData) {
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else if (script) {
      script.remove();
    }
  }, [title, description, keywords, canonical, og, twitter, structuredData]);
};

export default useSEO;
