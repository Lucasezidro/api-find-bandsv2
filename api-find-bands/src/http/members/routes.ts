import { FastifyInstance } from 'fastify'
import { createMember } from './create-member.controller'
import { getMemberByBandId } from './get-members-by-band-id.controller'
import { deleteMember } from './delete-member.controller'
import { updateMember } from './update-member.controller'
import { getMember } from './get-member.controller'

export async function membersRoutes(app: FastifyInstance) {
  app.post('/create-member', createMember)

  app.get('/get-members/:bandId', getMemberByBandId)
  app.get('/member/:memberId', getMember)

  app.delete('/member/:id', deleteMember)
  app.put('/member/save/:id', updateMember)
}
