import { FastifyInstance } from 'fastify'
import { getEvents } from './get-events.controller'
import { createEvents } from './create-event.controller'

export async function eventRoutes(app: FastifyInstance) {
  app.get('/events/:bandId', getEvents)
  app.get('/create-events', createEvents)
}
