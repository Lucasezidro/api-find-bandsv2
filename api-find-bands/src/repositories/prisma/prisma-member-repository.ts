import { Member, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MembersRepository } from '../members-repository'

export class PrismaMemberRepository implements MembersRepository {
  async findMany(bandId: string) {
    const members = await prisma.member.findMany({
      where: {
        bandRoleId: bandId,
      },
    })

    return members
  }

  async findMemberById(id: string) {
    const member = await prisma.member.findFirst({
      where: {
        id,
      },
    })

    return member
  }

  async create(data: Prisma.MemberUncheckedCreateInput) {
    const newMember = await prisma.member.create({
      data,
    })

    return newMember
  }

  async delete(id: string) {
    await prisma.member.delete({
      where: {
        id,
      },
    })
  }

  async update(member: Member) {
    const updatedMember = await prisma.member.update({
      where: {
        id: member.id,
      },
      data: member,
    })

    return updatedMember
  }
}
