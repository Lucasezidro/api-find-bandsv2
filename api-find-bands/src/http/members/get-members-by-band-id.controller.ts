import { makeGetMemberByBandId } from '@/factories/make-get-member-by-band-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getMemberByBandId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getMemberByBandIdBodySchema = z.object({
    bandId: z.string().uuid(),
  })

  const { bandId } = getMemberByBandIdBodySchema.parse(request.params)

  const getMemberByBandId = makeGetMemberByBandId()

  try {
    const { members } = await getMemberByBandId.execute({
      bandId,
    })
    return reply.status(200).send({ members })
  } catch (err) {
    return reply.status(409).send({ message: err })
  }
}
