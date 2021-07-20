import { Router } from 'express'

import CheckoutController from './app/controllers/CheckoutController.js'

const routes = new Router()

routes.get('/', (req, res) => res.end('Hello world!'))
routes.get('/checkout/:id', CheckoutController.show)

export default routes