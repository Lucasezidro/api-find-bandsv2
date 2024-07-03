import { makeCreateAccount } from '@/factories/make-create-account'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createAccountController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = createAccountBodySchema.parse(request.body)

  try {
    const createAccount = makeCreateAccount()

    await createAccount.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
