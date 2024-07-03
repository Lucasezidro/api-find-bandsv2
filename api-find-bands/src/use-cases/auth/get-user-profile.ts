import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { BadRequestError } from '../errors/bad-request-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new BadRequestError()
    }

    return { user }
  }
}
