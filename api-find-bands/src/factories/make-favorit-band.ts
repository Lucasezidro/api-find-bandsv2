import { PrismaBandRepository } from '@/repositories/prisma/prisma-band-repository'
import { FavoritBandUseCase } from '@/use-cases/bands/favorit-band'

export function makeFavoritBand() {
  const bandsRepository = new PrismaBandRepository()
  const favoritBandUseCase = new FavoritBandUseCase(bandsRepository)

  return favoritBandUseCase
}
