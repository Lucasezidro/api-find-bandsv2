import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'
import { BadRequestError } from '../errors/bad-request-error'
import { FavoritBandUseCase } from './favorit-band'

let inMemoryBandsRepository: InMemoryBandRepository
let inMemoryUserRepository: InMemoryUserRepository

let sut: FavoritBandUseCase

describe('Favorit Band', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    inMemoryBandsRepository = new InMemoryBandRepository()
    sut = new FavoritBandUseCase(inMemoryBandsRepository)
  })

  it('should be able to set a band as favorit', async () => {
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
      isFavorit: true,
      favoritCount: createdBand.favoritCount + 1,
    })

    expect(band.isFavorit).toEqual(true)
    expect(band.favoritCount).toEqual(1)
  })

  it('should not be able to favorit a band with unexisting id', async () => {
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
        isFavorit: true,
        favoritCount: 1,
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
