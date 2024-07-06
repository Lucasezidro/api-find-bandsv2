import { PrismaMemberRepository } from '@/repositories/prisma/prisma-member-repository'
import { DeleteMemberUseCase } from '@/use-cases/members/delete-member'
export function makeDeleteMember() {
  const membersRepository = new PrismaMemberRepository()
  const deleteMemberUseCase = new DeleteMemberUseCase(membersRepository)

  return deleteMemberUseCase
}
