import { makeGetUserProfile } from '@/factories/make-get-user-profile'
import { makeRegisterBand } from '@/factories/make-register-band'
import { makeUpdateUser } from '@/factories/make-update-user-role'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerBandController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBandBodySchema = z.object({
    bandName: z.string(),
    style: z.string(),
    description: z.string(),
    userAdminId: z.string().uuid(),
  })

  const bandData = registerBandBodySchema.parse(request.body)

  try {
    const updatedUser = makeUpdateUser()
    const bandOwner = makeGetUserProfile()
    const registerBand = makeRegisterBand()

    await registerBand.execute({
      bandName: bandData.bandName,
      style: bandData.style,
      description: bandData.description,
      userAdminId: request.user.sub,
    })

    const { user } = await bandOwner.execute({
      userId: request.user.sub,
    })

    console.log(user)

    await updatedUser.execute({
      ...user,
      role: 'ADMIN',
    })
  } catch (err) {
    if (err) {
      return reply.status(409).send()
    }

    throw err
  }

  return reply.status(201).send()
}
