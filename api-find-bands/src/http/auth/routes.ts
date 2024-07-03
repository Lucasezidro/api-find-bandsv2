import { FastifyInstance } from 'fastify'
import { createAccountController } from './create-account.controller'
import { authenticateController } from './authenticate.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { getProfile } from './get-user-profile.controller'

export async function authRoutes(app: FastifyInstance) {
  app.post('/create-account', createAccountController)
  app.post('/auth/sign-in', authenticateController)

  app.get('/profile', { onRequest: [verifyJWT] }, getProfile)
}
