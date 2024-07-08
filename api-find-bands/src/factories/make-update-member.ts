import { PrismaMemberRepository } from '@/repositories/prisma/prisma-member-repository'
import { UpdateMemberUseCase } from '@/use-cases/members/update-member'
export function makeUpdateMember() {
  const membersRepository = new PrismaMemberRepository()
  const updateMemberUseCase = new UpdateMemberUseCase(membersRepository)

  return updateMemberUseCase
}
