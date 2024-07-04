import { PrismaMemberRepository } from '@/repositories/prisma/prisma-member-repository'
import { CreateMemberUseCase } from '@/use-cases/members/create-member'
export function makeCreateMember() {
  const membersRepository = new PrismaMemberRepository()
  const createMember = new CreateMemberUseCase(membersRepository)

  return createMember
}
