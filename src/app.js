import express from 'express'
import cors from 'cors'

import routes from './routes.js'

class App {
    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(cors())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server