import { Router } from 'express'

const routes = new Router()

routes.get('/', (req, res) => res.end('Hello world!'))

export default routes