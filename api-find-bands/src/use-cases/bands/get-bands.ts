import { Band } from '@prisma/client'
import { BandsRepository } from '@/repositories/bands-repository'

interface GetBandsUseCaseRequest {
  userAdminId: string
}

interface GetBandsUseCaseResponse {
  bands: Band[]
}

export class GetBandsUseCase {
  constructor(private bandsRepository: BandsRepository) {}

  async execute({
    userAdminId,
  }: GetBandsUseCaseRequest): Promise<GetBandsUseCaseResponse> {
    const bands = await this.bandsRepository.findManyByUserId(userAdminId)

    return { bands }
  }
}
