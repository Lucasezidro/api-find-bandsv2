import { makeRegisterBand } from '@/factories/make-register-band'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerBandController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBandBodySchema = z.object({
    bandname: z.string(),
    style: z.string(),
    description: z.string(),
    userAdminId: z.string().uuid(),
    member: z.object({
      name: z.string(),
      email: z.string().email(),
      office: z.string(),
      avatar: z.string().optional(),
    }),
  })

  const bandData = registerBandBodySchema.parse(request.body)

  try {
    const registerBand = makeRegisterBand()

    await registerBand.execute({
      bandName: bandData.bandname,
      style: bandData.style,
      description: bandData.description,
      userAdminId: request.user.sub,
      member: {
        name: bandData.member.name,
        email: bandData.member.email,
        office: bandData.member.office,
        avatar: bandData.member.avatar ?? '',
      },
    })
  } catch (err) {
    if (err) {
      return reply.status(409).send()
    }

    throw err
  }

  return reply.status(201).send()
}
