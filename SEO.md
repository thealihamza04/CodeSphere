# SEO Improvements

## Site Inventory
- `/` – Programming Languages (public)
- `/Frameworks` – Frameworks overview (public)
- `/Frameworks/ToLib` – Tools or Libraries for a framework (public)
- `/TimeLine` – Programming languages timeline (public)
- `/developer-essential-skills` – Developer essential skills article (public)

No private or dashboard routes were detected.

## Changes Implemented
- Updated canonical URLs, Open Graph data and sitemap to use the live domain
  `https://codes-sphere.vercel.app`.
- Added baseline SEO metadata, keywords for "AliHamza projects", "thealihamza04
  projects" and "programming language timeline", plus Organization schema in
  `index.html`.
- Created reusable `useSEO` hook to set titles, meta tags, canonical URLs,
  Open Graph and Twitter Card data, keywords and JSON‑LD structured data per
  route.
- Applied `useSEO` to all public pages with unique titles, descriptions and
  shared keywords.
- Added `robots.txt` and `sitemap.xml` in `public/`.
- Added internal link to Frameworks in the footer for better navigation.

## Pending / Future Work
- Implement server-side rendering or prerendering so crawlers receive fully
  rendered HTML.
- Audit and optimise images, code-splitting and other performance tasks for
  Core Web Vitals.
- Add blog content and additional structured data as new pages are created.
- Run Lighthouse, Rich Results Test, and submit sitemap to search consoles.
