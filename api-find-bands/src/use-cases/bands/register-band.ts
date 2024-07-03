import { Band } from '@prisma/client'
import { BandsRepository } from '@/repositories/bands-repository'

interface RegisterBandUseCaseRequest {
  bandName: string
  style: string
  description: string
  userAdminId: string
  member: {
    name: string
    email: string
    office: string
    avatar: string
  }
}

interface RegisterBandUseCaseResponse {
  newBand: Band
}

export class RegisterBandUseCase {
  constructor(private bandsRepository: BandsRepository) {}

  async execute({
    bandName,
    description,
    style,
    userAdminId,
    member,
  }: RegisterBandUseCaseRequest): Promise<RegisterBandUseCaseResponse> {
    const newBand = await this.bandsRepository.create({
      bandName,
      style,
      description,
      userAdminId,
      ...member,
    })

    return { newBand }
  }
}
