import { Band } from '@prisma/client'
import { BandsRepository } from '@/repositories/bands-repository'

interface ListBandsUseCaseResponse {
  bands: Band[]
}

export class ListBandsUseCase {
  constructor(private bandsRepository: BandsRepository) {}

  async execute(): Promise<ListBandsUseCaseResponse> {
    const bands = await this.bandsRepository.listBands()

    return { bands }
  }
}
