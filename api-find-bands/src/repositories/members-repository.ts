import { Member, Prisma } from '@prisma/client'

export interface MembersRepository {
  findMany(bandId: string): Promise<Member[]>
  findMemberById(id: string): Promise<Member | null>

  create(data: Prisma.MemberUncheckedCreateInput): Promise<Member>
  delete(member: Member): Promise<void>
  update(member: Member): Promise<Member>
}
