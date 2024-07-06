import { MembersRepository } from '@/repositories/members-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface DeleteMemberUseCaseRequest {
  id: string
}

export class DeleteMemberUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({ id }: DeleteMemberUseCaseRequest): Promise<void> {
    const member = await this.membersRepository.findMemberById(id)

    if (!member) {
      throw new BadRequestError('Member not found')
    }

    await this.membersRepository.delete(member)
  }
}
