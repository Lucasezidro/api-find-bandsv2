import { PrismaMemberRepository } from '@/repositories/prisma/prisma-member-repository'
import { GetMemberUseCase } from '@/use-cases/members/get-member'
export function makeGetMember() {
  const membersRepository = new PrismaMemberRepository()
  const getMemberUseCase = new GetMemberUseCase(membersRepository)

  return getMemberUseCase
}
