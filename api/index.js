import { createServer } from '../server.js'

export default async function handler(req, res) {
    const app = await createServer()

    // Forward the request to express
    return new Promise((resolve, reject) => {
        app(req, res, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}
