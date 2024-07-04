import { PrismaMemberRepository } from '@/repositories/prisma/prisma-member-repository'
import { GetMemberByBandIdUseCase } from '@/use-cases/members/get-member-by-band-id'
export function makeGetMemberByBandId() {
  const membersRepository = new PrismaMemberRepository()
  const getMemberByBandIdUseCase = new GetMemberByBandIdUseCase(
    membersRepository,
  )

  return getMemberByBandIdUseCase
}
