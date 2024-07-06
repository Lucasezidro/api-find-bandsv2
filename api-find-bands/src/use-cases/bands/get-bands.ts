import { Band } from '@prisma/client'
import { BandsRepository } from '@/repositories/bands-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface GetBandsUseCaseRequest {
  userAdminId: string
}

interface GetBandsUseCaseResponse {
  band: Band
}

export class GetBandsUseCase {
  constructor(private bandsRepository: BandsRepository) {}

  async execute({
    userAdminId,
  }: GetBandsUseCaseRequest): Promise<GetBandsUseCaseResponse> {
    const band = await this.bandsRepository.findBandByUserId(userAdminId)

    if (!band) {
      throw new BadRequestError('Band not found.')
    }

    return { band }
  }
}
