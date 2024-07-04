import { Band } from '@prisma/client'
import { BandsRepository } from '@/repositories/bands-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface GetBandByIdUseCaseRequest {
  bandId: string
}

interface GetBandByIdUseCaseResponse {
  band: Band
}

export class GetBandByIdUseCase {
  constructor(private bandsRepository: BandsRepository) {}

  async execute({
    bandId,
  }: GetBandByIdUseCaseRequest): Promise<GetBandByIdUseCaseResponse> {
    const band = await this.bandsRepository.getBandById(bandId)

    if (!band) {
      throw new BadRequestError('Band not found')
    }

    return { band }
  }
}
