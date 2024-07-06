import { makeGetUserProfile } from '@/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfile()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ user })
}
