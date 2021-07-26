import { Router } from 'express'

import CheckoutController from './app/controllers/CheckoutController.js'
import HospedagemController from './app/controllers/HospedagemController.js'

const routes = new Router()

routes.get('/', (req, res) => res.end('Hello world!'))
routes.get('/checkout/:id', CheckoutController.show)
routes.get('/hospedagens', HospedagemController.index)

export default routes