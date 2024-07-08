import { Band } from '@prisma/client'
import { BandsRepository } from '@/repositories/bands-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface FavoritBandUseCaseRequest {
  bandId: string
  isFavorit: boolean
  favoritCount: number
}

interface FavoritBandUseCaseResponse {
  band: Band
}

export class FavoritBandUseCase {
  constructor(private bandsRepository: BandsRepository) {}

  async execute({
    bandId,
    isFavorit,
    favoritCount,
  }: FavoritBandUseCaseRequest): Promise<FavoritBandUseCaseResponse> {
    const band = await this.bandsRepository.getBandById(bandId)

    if (!band) {
      throw new BadRequestError('Band not found')
    }

    band.isFavorit = isFavorit
    band.favoritCount = favoritCount

    await this.bandsRepository.update(band)

    return { band }
  }
}
