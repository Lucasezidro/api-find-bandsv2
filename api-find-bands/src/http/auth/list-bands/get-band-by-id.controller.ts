import { makeGetBandById } from '@/factories/make-get-band-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getBandById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getBandByIdBodySchema = z.object({
    bandId: z.string().uuid(),
  })

  const { bandId } = getBandByIdBodySchema.parse(request.params)

  const getBandById = makeGetBandById()

  try {
    const { band } = await getBandById.execute({
      bandId,
    })
    return reply.status(200).send({ band })
  } catch (err) {
    return reply.status(409).send({ message: err })
  }
}
