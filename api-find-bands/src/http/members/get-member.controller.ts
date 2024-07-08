import { makeGetMember } from '@/factories/make-get-member'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getMember(request: FastifyRequest, reply: FastifyReply) {
  const getMemberByBandIdBodySchema = z.object({
    memberId: z.string().uuid(),
  })

  const { memberId } = getMemberByBandIdBodySchema.parse(request.params)

  const getMember = makeGetMember()

  try {
    const { member } = await getMember.execute({
      memberId,
    })
    return reply.status(200).send({ member })
  } catch (err) {
    return reply.status(409).send({ message: err })
  }
}
