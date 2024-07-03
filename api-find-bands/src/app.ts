import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { authRoutes } from './http/auth/routes'
import { env } from './env'
import { bandRoutes } from './http/bands/routes'

export const app = fastify()

app.register(fastifyCors)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(authRoutes)
app.register(bandRoutes)
