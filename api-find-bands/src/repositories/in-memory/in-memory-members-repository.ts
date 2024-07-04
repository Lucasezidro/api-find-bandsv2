import { Member, Prisma } from '@prisma/client'
import { MembersRepository } from '../members-repository'

export class InMemoryMembersRepository implements MembersRepository {
  public items: Member[] = []

  async findMany(bandId: string) {
    return this.items.filter((item) => item.bandRoleId === bandId)
  }

  async findMemberById(id: string) {
    const member = this.items.find((item) => item.id === id)

    if (!member) {
      return null
    }

    return member
  }

  async create(data: Prisma.MemberUncheckedCreateInput) {
    const newMember = {
      id: 'member-id',
      name: data.name,
      email: data.email,
      office: data.office,
      avatar: data.avatar ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
      bandRoleId: data.bandRoleId,
    }

    this.items.push(newMember)

    return newMember
  }

  async delete(id: string) {
    this.items.filter((item) => item.id === id)
  }

  async update(member: Member) {
    const memberIndex = this.items.findIndex((item) => item.id === member.id)

    if (memberIndex >= 0) {
      this.items[memberIndex] = member
    }

    return member
  }
}
