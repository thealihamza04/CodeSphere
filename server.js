import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import compression from 'compression'
import sirv from 'sirv'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

async function createServer() {
    const app = express()
    app.use(compression())

    let vite
    if (isProduction) {
        app.use(sirv('dist/client', { extensions: [] }))
    } else {
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        })
        app.use(vite.middlewares)
    }

    // Catch-all route (fixed crash)
    app.use(async (req, res, next) => {
        const url = req.originalUrl

        try {
            let template, render

            if (isProduction) {
                template = fs.readFileSync(
                    path.resolve(__dirname, 'dist/client/index.html'),
                    'utf-8'
                )
                render = (await import('./dist/server/entry-server.js')).render
            } else {
                template = fs.readFileSync(
                    path.resolve(__dirname, 'index.html'),
                    'utf-8'
                )
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
            }

            const context = {}
            const appHtml = await render(url, context)

            if (context.url) {
                return res.redirect(301, context.url)
            }

            const html = template.replace(`<!--ssr-outlet-->`, appHtml)
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            !isProduction && vite?.ssrFixStacktrace(e)
            console.error(e.stack)
            next(e)
        }
    })

    app.listen(3000)
}

createServer()

