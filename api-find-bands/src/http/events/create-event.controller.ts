import { makeCreateEvent } from '@/factories/make-create-event'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createEvents(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createEventBandBodySchema = z.object({
    eventDate: z.date(),
    location: z.string(),
    description: z.string().optional(),
    bandEventId: z.string().uuid(),
    eventImages: z.string().optional(),
    eventSize: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    isEventHasPast: z.boolean().optional(),
  })

  const eventData = createEventBandBodySchema.parse(request.body)

  try {
    const events = makeCreateEvent()

    await events.execute({
      bandEventId: eventData.bandEventId,
      eventDate: eventData.eventDate,
      location: eventData.location,
      description: eventData.description ?? '',
      eventImages: eventData.eventImages ?? '',
      eventSize: eventData.eventSize ?? 'SMALL',
      isEventHasPast: eventData.isEventHasPast ?? false,
    })
  } catch (err) {
    if (err) {
      return reply.status(409).send()
    }

    throw err
  }

  return reply.status(201).send()
}
