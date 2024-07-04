import { makeCreateMember } from '@/factories/make-create-member'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createMember(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createMemberBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    office: z.string(),
    avatar: z.string(),
    bandRoleId: z.string().uuid(),
  })

  const data = createMemberBodySchema.parse(request.body)

  try {
    const createMember = makeCreateMember()

    await createMember.execute({
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      office: data.office,
      bandRoleId: data.bandRoleId,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
