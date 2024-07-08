import { makeUpdateMember } from '@/factories/make-update-member'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateMember(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateMemberBodySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    office: z.string(),
    avatar: z.string().optional(),
  })

  const data = updateMemberBodySchema.parse(request.body)

  try {
    const updateMember = makeUpdateMember()

    await updateMember.execute({
      id: data.id,
      name: data.name,
      email: data.email,
      office: data.office,
      avatar: data.avatar ?? '',
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
