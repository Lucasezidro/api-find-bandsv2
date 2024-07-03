import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'
import { GetBandsUseCase } from './get-bands'

let inMemoryBandsRepository: InMemoryBandRepository
let inMemoryUserRepository: InMemoryUserRepository

let sut: GetBandsUseCase

describe('Get Bands', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    inMemoryBandsRepository = new InMemoryBandRepository()
    sut = new GetBandsUseCase(inMemoryBandsRepository)
  })

  it('should be able to register a band', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    await inMemoryBandsRepository.create({
      bandName: 'new band',
      description: 'lorem ipsum dolor',
      style: 'rock',
      userAdminId: user.userId,
    })

    const { bands } = await sut.execute({
      userAdminId: user.userId,
    })

    expect(bands).toHaveLength(1)
  })
})
