import { makeFavoritBand } from '@/factories/make-favorit-band'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function favoritBand(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateMemberBodySchema = z.object({
    bandId: z.string().uuid(),
    isFavorit: z.boolean(),
    favoritCount: z.number(),
  })

  const { bandId, isFavorit, favoritCount } = updateMemberBodySchema.parse(
    request.body,
  )

  try {
    const updateMember = makeFavoritBand()

    await updateMember.execute({
      bandId,
      isFavorit,
      favoritCount,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
