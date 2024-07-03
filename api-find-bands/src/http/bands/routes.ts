import { verifyJWT } from '@/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { registerBandController } from './register-band.controller'
import { getBands } from './get-bands.controller'

export async function bandRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/register-band', registerBandController)

  app.get('/bands/:userId', getBands)
}
