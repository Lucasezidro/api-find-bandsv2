import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { BadRequestError } from '../errors/bad-request-error'
import { BandsRepository } from '@/repositories/bands-repository'
import { UnauthorizedError } from '../errors/unauthorized-error'

interface GetUserProfileUseCaseRequest {
  userId: string
  bandId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(
    private userRepository: UserRepository,
    private bandsRepository: BandsRepository,
  ) {}

  async execute({
    userId,
    bandId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    const band = await this.bandsRepository.getBandById(bandId)

    if (!user) {
      throw new BadRequestError()
    }

    if (band?.userAdminId !== user.userId) {
      throw new UnauthorizedError()
    }

    return { user }
  }
}
