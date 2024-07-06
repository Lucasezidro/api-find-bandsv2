import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { UpdateUserUseCase } from '@/use-cases/auth/update-user'
export function makeUpdateUser() {
  const userRepository = new PrismaUserRepository()
  const updateUserUseCase = new UpdateUserUseCase(userRepository)

  return updateUserUseCase
}
