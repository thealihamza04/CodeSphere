import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import express from 'express'
import compression from 'compression'
import sirv from 'sirv'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

export async function createServer() {
    const app = express()
    app.use(compression())

    let vite
    if (isProduction) {
        const clientDir = fs.existsSync(path.resolve(__dirname, 'dist/client'))
            ? 'dist/client'
            : fs.existsSync(path.resolve(__dirname, 'api/client'))
            ? 'api/client'
            : 'dist/client'

        app.use(
            sirv(clientDir, {
                extensions: [],
                immutable: true,
                maxAge: 31536000
            })
        )
    } else {
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        })
        app.use(vite.middlewares)
    }

    // Render function
    const renderPage = async (req, res, next) => {
        try {
            const url = req.originalUrl
            let template, render

            if (isProduction) {
                const clientIndexPath = fs.existsSync(path.resolve(__dirname, 'dist/client/index.html'))
                    ? path.resolve(__dirname, 'dist/client/index.html')
                    : path.resolve(__dirname, 'api/client/index.html')

                template = fs.readFileSync(clientIndexPath, 'utf-8')

                const serverEntryPath = fs.existsSync(path.resolve(__dirname, './dist/server/entry-server.js'))
                    ? pathToFileURL(path.resolve(__dirname, './dist/server/entry-server.js')).href
                    : pathToFileURL(path.resolve(__dirname, './api/server/entry-server.js')).href

                render = (await import(serverEntryPath)).render
            } else {
                template = fs.readFileSync(
                    path.resolve(__dirname, 'index.html'),
                    'utf-8'
                )
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
            }

            const appHtml = await render(url)
            const html = template.replace('<!--ssr-outlet-->', appHtml)
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            next(e)
        }
    }

    // Serve static files first
    if (isProduction) {
        app.use('/assets', express.static(path.join(__dirname, 'dist/client/assets')))
    }

    // Handle all routes with middleware
    app.use((req, res, next) => renderPage(req, res, next))

    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack)
        !isProduction && vite?.ssrFixStacktrace(err)
        res.status(500).send(isProduction ? 'Server Error' : err.stack)
    })

    return app
}

// Start locally (dev/preview)
const isDirectRun = (() => {
    try {
        const thisFilePath = fileURLToPath(import.meta.url)
        const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : ''
        return thisFilePath === invokedPath
    } catch {
        return false
    }
})()

if (isDirectRun) {
    try {
        const app = await createServer()
        const port = Number(process.env.PORT) || 3000 // Hardcoded default with env override
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        })
    } catch (error) {
        console.error("Error starting server:", error)
    }
}

// No default export here; serverless entry creates and reuses the app
