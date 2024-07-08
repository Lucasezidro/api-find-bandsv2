import { FastifyInstance } from 'fastify'
import { registerBandController } from './register-band.controller'
import { getBands } from './get-band.controller'
import { listBands } from './list-bands.controller'
import { getBandById } from './get-band-by-id.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { favoritBand } from './favorit-band.controller'

export async function bandRoutes(app: FastifyInstance) {
  app.post('/register-band', { onRequest: [verifyJWT] }, registerBandController)
  app.get('/band/:userId', { onRequest: [verifyJWT] }, getBands)

  app.get('/list-bands', listBands)
  app.get('/list-band/:bandId', getBandById)

  app.put('/favorit/:bandId', favoritBand)
}
