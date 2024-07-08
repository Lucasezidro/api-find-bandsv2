import { makeGetEvents } from '@/factories/make-get-events'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getEvents(request: FastifyRequest, reply: FastifyReply) {
  const eventParamsSchema = z.object({
    bandId: z.string().uuid(),
  })

  const { bandId } = eventParamsSchema.parse(request.params)

  const getEventsByBandId = makeGetEvents()

  try {
    const { events } = await getEventsByBandId.execute({
      bandId,
    })

    return reply.status(200).send({ events })
  } catch (err) {
    return reply.status(409).send()
  }
}
