import { Router } from 'express'

import CheckoutController from './app/controllers/CheckoutController.js'
import HospedagemController from './app/controllers/HospedagemController.js'
import HospedesHospedagemController from './app/controllers/HospedesHospedagemController.js'

const routes = new Router()

routes.get('/', (req, res) => res.end('Hello world!'))
routes.get('/checkout/:id', CheckoutController.show)
routes.get('/hospedagens', HospedagemController.index)
routes.get('/hospedagens/:id', HospedagemController.show)
routes.get('/hospedagens/:id/hospedes', HospedesHospedagemController.show)

export default routes