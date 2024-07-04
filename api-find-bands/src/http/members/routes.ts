import { FastifyInstance } from 'fastify'
import { createMember } from './create-member.controller'
import { getMemberByBandId } from './get-members-by-band-id.controller'

export async function membersRoutes(app: FastifyInstance) {
  app.post('/create-member', createMember)
  app.get('/get-members/:bandId', getMemberByBandId)
}
