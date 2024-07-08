import { Member } from '@prisma/client'
import { BadRequestError } from '../errors/bad-request-error'
import { MembersRepository } from '@/repositories/members-repository'

interface UpdateMemberUseCaseRequest {
  id: string
  name: string
  email: string
  office: string
  avatar: string
}

interface UpdateMemberUseCaseResponse {
  member: Member
}

export class UpdateMemberUseCase {
  constructor(private memberRepository: MembersRepository) {}

  async execute({
    id,
    name,
    email,
    office,
    avatar,
  }: UpdateMemberUseCaseRequest): Promise<UpdateMemberUseCaseResponse> {
    const member = await this.memberRepository.findMemberById(id)

    if (!member) {
      throw new BadRequestError()
    }

    member.name = name
    member.email = email
    member.office = office
    member.avatar = avatar

    await this.memberRepository.update(member)

    return { member }
  }
}
