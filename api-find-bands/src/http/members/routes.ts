import { FastifyInstance } from 'fastify'
import { createMember } from './create-member.controller'
import { getMemberByBandId } from './get-members-by-band-id.controller'
import { deleteMember } from './delete-member.controller'

export async function membersRoutes(app: FastifyInstance) {
  app.post('/create-member', createMember)
  app.get('/get-members/:bandId', getMemberByBandId)
  app.delete('/member/:id', deleteMember)
}
