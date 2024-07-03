import { PrismaBandRepository } from '@/repositories/prisma/prisma-band-repository'
import { RegisterBandUseCase } from '@/use-cases/bands/register-band'

export function makeRegisterBand() {
  const bandsRepository = new PrismaBandRepository()
  const registerBandUseCase = new RegisterBandUseCase(bandsRepository)

  return registerBandUseCase
}
