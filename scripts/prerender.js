import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, '../dist')
const templatePath = path.join(distDir, 'index.html')
const entryServerPath = path.join(distDir, 'server/entry-server.js')

const templateHtml = await fs.readFile(templatePath, 'utf-8')
const { render } = await import(pathToFileURL(entryServerPath).href)

if (typeof render !== 'function') {
  throw new Error('Expected entry-server to export a render() function')
}

const frameworkLangs = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'PHP',
  'Go',
  'Rust',
  'Ruby',
  'Swift',
  'Kotlin',
  'C++',
  'C#',
  'R',
  'Dart',
  'Scala',
  'Lua',
  'Elixir',
]

const baseRoutes = [
  '/',
  '/Frameworks',
  '/TimeLine',
  '/ml-roadmap',
  '/ai-roadmap',
  '/swe-roadmap',
  '/developer-essential-skills',
  '/system-design',
  '/design-patterns',
  '/devops',
  '/project-checklist',
  '/design-principles',
  '/design-styles',
  '/motion-design',
  '/animations-guide',
  '/civic-sense',
  '/social-intelligence',
  '/vibe-explorer',
]

const frameworkLangRoutes = frameworkLangs.map(
  (lang) => `/Frameworks?lang=${encodeURIComponent(lang)}`,
)

const routesToPrerender = [...baseRoutes, ...frameworkLangRoutes]

const routeMeta = {
  '/': {
    title: 'Programming Language & Framework Catalog — CodeSphere',
    description:
      'Explore programming languages and frameworks in one organized developer reference.',
  },
  '/Frameworks': {
    title: 'All Frameworks by Language — CodeSphere',
    description: 'Browse popular frameworks organized by programming language.',
  },
  '/TimeLine': {
    title: 'History of Programming Languages — CodeSphere',
    description: 'Interactive timeline of major programming languages and their origins.',
  },
  '/ml-roadmap': {
    title: 'Machine Learning Roadmap — CodeSphere',
    description: 'Step-by-step learning roadmap for machine learning engineers.',
  },
  '/ai-roadmap': {
    title: 'AI Engineer Roadmap — CodeSphere',
    description: 'A practical roadmap to become an AI engineer from fundamentals to deployment.',
  },
  '/swe-roadmap': {
    title: 'Software Engineer Roadmap — CodeSphere',
    description: 'Guided path through core software engineering skills and topics.',
  },
  '/developer-essential-skills': {
    title: 'Developer Essential Skills — CodeSphere',
    description: 'Key skills every modern developer should build for long-term growth.',
  },
  '/system-design': {
    title: 'System Design Reference — CodeSphere',
    description: 'Core system design concepts: scalability, caching, and distributed systems.',
  },
  '/design-patterns': {
    title: 'Software Design Patterns — CodeSphere',
    description: 'Reference for creational, structural, and behavioral design patterns.',
  },
  '/devops': {
    title: 'DevOps & Infrastructure Guide — CodeSphere',
    description: 'DevOps tools, CI/CD workflows, and infrastructure best practices.',
  },
  '/project-checklist': {
    title: 'Project Checklist — CodeSphere',
    description: 'Comprehensive checklist to plan, build, and ship software projects.',
  },
  '/design-principles': {
    title: 'Design Principles — CodeSphere',
    description: 'Essential software design principles for maintainable and scalable systems.',
  },
  '/design-styles': {
    title: 'Design Styles Guide — CodeSphere',
    description: 'Explore modern design styles and their practical use cases.',
  },
  '/motion-design': {
    title: 'Motion Design Guide — CodeSphere',
    description: 'Motion design principles, techniques, and implementation ideas.',
  },
  '/animations-guide': {
    title: 'Animations Guide — CodeSphere',
    description: 'Practical guide to UI and web animations for developers.',
  },
  '/civic-sense': {
    title: 'Civic Sense Guide — CodeSphere',
    description: 'Civic awareness and practical social responsibility insights.',
  },
  '/social-intelligence': {
    title: 'Social Intelligence Guide — CodeSphere',
    description: 'Develop communication, empathy, and interpersonal effectiveness.',
  },
  '/vibe-explorer': {
    title: 'Vibe Explorer — CodeSphere',
    description: 'Explore and discover coding vibes, genres, and creative themes.',
  },
}

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const frameworkLangSlugMap = {
  'c++': 'cpp',
  'c#': 'csharp',
}

function toFrameworkSlug(lang) {
  const normalized = lang.trim().toLowerCase()
  return frameworkLangSlugMap[normalized] ?? normalized.replace(/[^a-z0-9]+/g, '-')
}

function routeToOutputPath(route) {
  const [pathname, query] = route.split('?')
  if (pathname === '/Frameworks' && query?.startsWith('lang=')) {
    const lang = decodeURIComponent(query.slice(5))
    return path.join(distDir, 'frameworks', toFrameworkSlug(lang), 'index.html')
  }

  if (pathname === '/') {
    return templatePath
  }

  return path.join(distDir, pathname.replace(/^\//, ''), 'index.html')
}

function buildMetaTags(route) {
  const [pathname, query] = route.split('?')
  const baseMeta = routeMeta[pathname] ?? {
    title: 'CodeSphere',
    description: 'A developer reference for programming languages, frameworks, and architecture.',
  }

  if (pathname === '/Frameworks' && query?.startsWith('lang=')) {
    const lang = decodeURIComponent(query.slice(5))
    const escapedLang = escapeHtml(lang)
    return {
      title: `${escapedLang} Frameworks — CodeSphere`,
      description: `Browse popular ${escapedLang} frameworks and libraries in a structured reference.`,
      canonicalPath: `/frameworks/${toFrameworkSlug(lang)}`,
    }
  }

  return {
    ...baseMeta,
    canonicalPath: pathname,
  }
}

function buildHtmlWithMeta({ template, appHtml, title, description, canonicalPath }) {
  const escapedTitle = escapeHtml(title)
  const escapedDescription = escapeHtml(description)
  const canonicalUrl = `https://codes-sphere.vercel.app${canonicalPath}`

  const metaTags = `\n    <meta name="description" content="${escapedDescription}" />\n    <meta property="og:title" content="${escapedTitle}" />\n    <meta property="og:description" content="${escapedDescription}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:url" content="${canonicalUrl}" />\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${escapedTitle}" />\n    <meta name="twitter:description" content="${escapedDescription}" />\n    <link rel="canonical" href="${canonicalUrl}" />\n  `

  return template
    .replace('<title>CodeSphere</title>', `<title>${escapedTitle}</title>`)
    .replace('</head>', `${metaTags}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

for (const route of routesToPrerender) {
  const appHtml = await render(route)
  const meta = buildMetaTags(route)
  const renderedHtml = buildHtmlWithMeta({
    template: templateHtml,
    appHtml,
    title: meta.title,
    description: meta.description,
    canonicalPath: meta.canonicalPath,
  })

  if (renderedHtml === templateHtml) {
    throw new Error(`Failed to inject prerendered HTML into template for ${route}`)
  }

  const outputPath = routeToOutputPath(route)
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, renderedHtml, 'utf-8')

  console.log(`Pre-rendered ${route} -> ${path.relative(distDir, outputPath)}`)
}

async function generateSitemap(routes) {
  const base = 'https://codes-sphere.vercel.app'
  const today = new Date().toISOString().split('T')[0]

  const canonicalPaths = new Set(
    routes.map((route) => buildMetaTags(route).canonicalPath).filter(Boolean),
  )

  const urls = [...canonicalPaths]
    .map(
      (urlPath) => `\n  <url>\n    <loc>${base}${urlPath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${urlPath === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${urlPath === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>\n`

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf-8')
  console.log('Generated sitemap.xml')
}

await generateSitemap(routesToPrerender)
