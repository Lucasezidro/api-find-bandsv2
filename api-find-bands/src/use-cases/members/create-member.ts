import { Member } from '@prisma/client'
import { MembersRepository } from '@/repositories/members-repository'

interface CreateMemberUseCaseRequest {
  name: string
  email: string
  office: string
  avatar: string
  bandRoleId: string
}

interface CreateMemberUseCaseResponse {
  member: Member
}

export class CreateMemberUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    name,
    email,
    office,
    avatar,
    bandRoleId,
  }: CreateMemberUseCaseRequest): Promise<CreateMemberUseCaseResponse> {
    const member = await this.membersRepository.create({
      name,
      email,
      office,
      avatar,
      bandRoleId,
    })

    return { member }
  }
}
