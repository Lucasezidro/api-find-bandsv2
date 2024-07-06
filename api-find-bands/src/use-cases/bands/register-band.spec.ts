import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { RegisterBandUseCase } from './register-band'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'

let inMemoryBandsRepository: InMemoryBandRepository
let inMemoryUserRepository: InMemoryUserRepository

let sut: RegisterBandUseCase

describe('Register Band', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    inMemoryBandsRepository = new InMemoryBandRepository()
    sut = new RegisterBandUseCase(
      inMemoryBandsRepository,
      inMemoryUserRepository,
    )
  })

  it('should be able to register a band', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const { newBand } = await sut.execute({
      bandName: 'new band',
      description: 'lorem ipsum dolor',
      style: 'rock',
      userAdminId: user.userId,
    })

    expect(newBand.bandId).toEqual(expect.any(String))
  })

  it('should be able to change user role when register a new band', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    await sut.execute({
      bandName: 'new band',
      description: 'lorem ipsum dolor',
      style: 'rock',
      userAdminId: user.userId,
    })

    const updatedUser = await inMemoryUserRepository.save({
      ...user,
      role: 'ADMIN',
    })

    expect(updatedUser.role).toEqual('ADMIN')
  })
})
