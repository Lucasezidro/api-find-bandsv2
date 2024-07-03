import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAccountUseCase } from './create-account'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateAccountUseCase

describe('Create Account', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateAccountUseCase(inMemoryUserRepository)
  })

  it('should be able to create an account', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    expect(user.userId).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashes = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashes).toBe(true)
  })

  it('should not be able to register user with smae email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
