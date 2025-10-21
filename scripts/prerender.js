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

const routesToPrerender = [
  '/',
  '/Frameworks',
  '/TimeLine',
  '/ml-roadmap',
  '/developer-essential-skills',
]

for (const url of routesToPrerender) {
  const appHtml = await render(url)
  const hydratedHtml = templateHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )

  if (hydratedHtml === templateHtml) {
    throw new Error(`Failed to inject prerendered HTML into template for ${url}`)
  }

  const outputPath =
    url === '/'
      ? templatePath
      : path.join(distDir, url.replace(/^\//, ''), 'index.html')

  if (url !== '/') {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
  }

  await fs.writeFile(outputPath, hydratedHtml, 'utf-8')
  console.log(`Pre-rendered ${url} -> ${path.relative(distDir, outputPath)}`)
}
