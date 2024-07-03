import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateAccountUseCase } from '@/use-cases/auth/create-account'

export function makeCreateAccount() {
  const userRepository = new PrismaUserRepository()
  const createAccountUseCase = new CreateAccountUseCase(userRepository)

  return createAccountUseCase
}
