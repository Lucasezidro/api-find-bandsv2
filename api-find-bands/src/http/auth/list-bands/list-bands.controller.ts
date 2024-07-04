import { makeListBands } from '@/factories/make-list-bands'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listBands(request: FastifyRequest, reply: FastifyReply) {
  const getBands = makeListBands()

  const { bands } = await getBands.execute()

  return reply.status(200).send({ bands })
}
