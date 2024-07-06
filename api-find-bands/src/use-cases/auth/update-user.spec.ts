import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UpdateUserUseCase } from './update-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: UpdateUserUseCase

describe('Update User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to update an user', async () => {
    const createdUser = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
      role: 'FINDER',
    })

    const { user } = await sut.execute({
      ...createdUser,
      name: 'Mayk Doe',
    })

    expect(user.name).toEqual('Mayk Doe')
  })

  it('should be able to update user role', async () => {
    const createdUser = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
      role: 'FINDER',
    })

    const { user } = await sut.execute({
      ...createdUser,
      role: 'ADMIN',
    })

    expect(user.role).toEqual('ADMIN')
  })
})
