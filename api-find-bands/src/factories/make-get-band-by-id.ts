import { PrismaBandRepository } from '@/repositories/prisma/prisma-band-repository'
import { GetBandByIdUseCase } from '@/use-cases/bands/get-band-by-id'

export function makeGetBandById() {
  const bandsRepository = new PrismaBandRepository()
  const getBandById = new GetBandByIdUseCase(bandsRepository)

  return getBandById
}
