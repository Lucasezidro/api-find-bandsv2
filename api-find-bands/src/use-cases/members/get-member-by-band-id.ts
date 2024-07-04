import { Member } from '@prisma/client'
import { MembersRepository } from '@/repositories/members-repository'

interface GetMemberByBandIdUseCaseRequest {
  bandId: string
}

interface GetMemberByBandIdUseCaseResponse {
  members: Member[]
}

export class GetMemberByBandIdUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    bandId,
  }: GetMemberByBandIdUseCaseRequest): Promise<GetMemberByBandIdUseCaseResponse> {
    const members = await this.membersRepository.findMany(bandId)

    return { members }
  }
}
