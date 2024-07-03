import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserProfileUseCase } from '@/use-cases/auth/get-user-profile'
export function makeGetUserProfile() {
  const userRepository = new PrismaUserRepository()
  const getuserprofileUseCase = new GetUserProfileUseCase(userRepository)

  return getuserprofileUseCase
}
