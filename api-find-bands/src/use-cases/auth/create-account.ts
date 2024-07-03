import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateAccountUseCaseResponse {
  user: User
}

export class CreateAccountUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const hashedPassword = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new InvalidCredentialsError('User already exists.')
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return { user }
  }
}
