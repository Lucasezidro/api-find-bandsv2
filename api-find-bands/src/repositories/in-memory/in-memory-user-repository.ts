import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findAll() {
    const users = this.items

    return users
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.userId === id)

    if (!user) {
      return null
    }

    return user
  }

  async save(user: User) {
    const userIndex = this.items.findIndex(
      (item) => item.userId === user.userId,
    )

    if (userIndex >= 0) {
      this.items[userIndex] = user
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      userId: 'user-id-1',
      name: data.name,
      role: data.role ?? 'FINDER',
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
