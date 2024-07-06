import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { BadRequestError } from '../errors/bad-request-error'

interface UpdateUserUseCaseRequest {
  userId: string
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'FINDER' | 'MEMBER'
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    name,
    email,
    password,
    role,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new BadRequestError()
    }

    user.name = name
    user.email = email
    user.password = password
    user.role = role

    await this.userRepository.save(user)

    return { user }
  }
}
