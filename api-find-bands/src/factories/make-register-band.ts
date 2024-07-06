import { PrismaBandRepository } from '@/repositories/prisma/prisma-band-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterBandUseCase } from '@/use-cases/bands/register-band'

export function makeRegisterBand() {
  const bandsRepository = new PrismaBandRepository()
  const userRepository = new PrismaUserRepository()
  const registerBandUseCase = new RegisterBandUseCase(
    bandsRepository,
    userRepository,
  )

  return registerBandUseCase
}
