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

const OG_IMAGE_DEFAULT = 'https://codes-sphere.vercel.app/og-image.jpg';

const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  image,
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
    const resolvedImage = image || OG_IMAGE_DEFAULT;
    setMeta("property", "og:image", resolvedImage);
    setMeta("name", "twitter:image", resolvedImage);
    if (canonical) {
      const canonicals = document.head.querySelectorAll("link[rel=\"canonical\"]");
      if (canonicals.length > 0) {
        canonicals[0].setAttribute("href", canonical);
        for (let i = 1; i < canonicals.length; i++) {
          canonicals[i].remove();
        }
      } else {
        const link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", canonical);
        document.head.appendChild(link);
      }
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
  }, [title, description, keywords, canonical, image, og, twitter, structuredData]);
};

export default useSEO;
