import { makeDeleteMember } from '@/factories/make-delete-member'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteMember(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteMemberBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteMemberBodySchema.parse(request.params)

  try {
    const deletedMember = makeDeleteMember()

    await deletedMember.execute({
      id,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
