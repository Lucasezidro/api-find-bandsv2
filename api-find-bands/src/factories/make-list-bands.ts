import { PrismaBandRepository } from '@/repositories/prisma/prisma-band-repository'
import { ListBandsUseCase } from '@/use-cases/bands/list-bands'

export function makeListBands() {
  const bandsRepository = new PrismaBandRepository()
  const listBandsUseCase = new ListBandsUseCase(bandsRepository)

  return listBandsUseCase
}
