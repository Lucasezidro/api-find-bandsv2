import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findAll() {
    const user = await prisma.user.findMany()

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        userId: id,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async save(user: User) {
    const updatedUser = await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: user,
    })

    return updatedUser
  }
}
