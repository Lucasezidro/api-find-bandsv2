import { PrismaBandRepository } from '@/repositories/prisma/prisma-band-repository'
import { GetBandsUseCase } from '@/use-cases/bands/get-bands'

export function makeGetBands() {
  const bandsRepository = new PrismaBandRepository()
  const getBandsUseCase = new GetBandsUseCase(bandsRepository)

  return getBandsUseCase
}
