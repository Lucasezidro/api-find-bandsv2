import { Member } from '@prisma/client'
import { MembersRepository } from '@/repositories/members-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface GetMemberUseCaseRequest {
  memberId: string
}

interface GetMemberUseCaseResponse {
  member: Member
}

export class GetMemberUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    memberId,
  }: GetMemberUseCaseRequest): Promise<GetMemberUseCaseResponse> {
    const member = await this.membersRepository.findMemberById(memberId)

    if (!member) {
      throw new BadRequestError()
    }

    return { member }
  }
}
