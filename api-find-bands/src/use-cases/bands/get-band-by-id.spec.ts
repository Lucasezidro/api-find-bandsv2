import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'
import { GetBandByIdUseCase } from './get-band-by-id'
import { BadRequestError } from '../errors/bad-request-error'

let inMemoryBandsRepository: InMemoryBandRepository
let inMemoryUserRepository: InMemoryUserRepository

let sut: GetBandByIdUseCase

describe('Get Band by id', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    inMemoryBandsRepository = new InMemoryBandRepository()
    sut = new GetBandByIdUseCase(inMemoryBandsRepository)
  })

  it('should be able to get a band by id', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const createdBand = await inMemoryBandsRepository.create({
      bandName: 'new band',
      description: 'lorem ipsum dolor',
      style: 'rock',
      userAdminId: user.userId,
    })

    const { band } = await sut.execute({
      bandId: createdBand.bandId,
    })

    expect(band.bandId).toEqual(expect.any(String))
  })

  it('should not be able to get a band with unexisting id', async () => {
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

    await expect(() =>
      sut.execute({
        bandId: 'unexinting-id',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
