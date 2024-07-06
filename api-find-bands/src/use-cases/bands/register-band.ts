import { Band } from '@prisma/client'
import { BandsRepository } from '@/repositories/bands-repository'
import { UserRepository } from '@/repositories/user-repository'
import { UnauthorizedError } from '../errors/unauthorized-error'

interface RegisterBandUseCaseRequest {
  bandName: string
  style: string
  description: string
  userAdminId: string
}

interface RegisterBandUseCaseResponse {
  newBand: Band
}

export class RegisterBandUseCase {
  constructor(
    private bandsRepository: BandsRepository,
    private usersRepository: UserRepository,
  ) {}

  async execute({
    bandName,
    description,
    style,
    userAdminId,
  }: RegisterBandUseCaseRequest): Promise<RegisterBandUseCaseResponse> {
    const user = await this.usersRepository.findById(userAdminId)

    if (!user) {
      throw new UnauthorizedError()
    }

    const newBand = await this.bandsRepository.create({
      bandName,
      style,
      description,
      userAdminId,
    })

    await this.usersRepository.save({
      ...user,
      role: 'ADMIN',
    })

    return { newBand }
  }
}
