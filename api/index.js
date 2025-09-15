import { createServer } from '../server.js'

let cachedApp

async function getApp() {
    if (!cachedApp) {
        cachedApp = await createServer()
    }
    return cachedApp
}

export default async function handler(req, res) {
    try {
        const app = await getApp()
        return new Promise((resolve, reject) => {
            app(req, res, (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    } catch (error) {
        console.error('SSR handler error:', error)
        if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end('Internal Server Error')
        }
    }
}
