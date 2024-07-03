import { makeGetBands } from '@/factories/make-get-bands'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getBands(request: FastifyRequest, reply: FastifyReply) {
  const getBand = makeGetBands()

  try {
    const { bands } = await getBand.execute({
      userAdminId: request.user.sub,
    })

    return reply.status(200).send({ bands })
  } catch (err) {
    return reply.status(409).send()
  }
}
