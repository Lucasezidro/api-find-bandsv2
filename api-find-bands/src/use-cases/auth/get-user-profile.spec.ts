import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { BadRequestError } from '../errors/bad-request-error'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Create Account', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(inMemoryUserRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.userId,
    })

    expect(user.userId).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        userId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
