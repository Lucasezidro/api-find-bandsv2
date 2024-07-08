import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'
import { GetEventsUseCase } from './get-events'
import { InMemoryEventsRepository } from '@/repositories/in-memory/in-memory-events-repository'

let inMemoryBandsRepository: InMemoryBandRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEventsRepository: InMemoryEventsRepository

let sut: GetEventsUseCase

describe('Get Events', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryBandsRepository = new InMemoryBandRepository()

    inMemoryEventsRepository = new InMemoryEventsRepository()
    sut = new GetEventsUseCase(inMemoryEventsRepository)
  })

  it('should be able to list events', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const band = await inMemoryBandsRepository.create({
      bandName: 'new band',
      description: 'lorem ipsum dolor',
      style: 'rock',
      userAdminId: user.userId,
    })

    await inMemoryEventsRepository.create({
      bandEventId: band.bandId,
      eventDate: new Date(),
      location: 'some local',
    })

    const { events } = await sut.execute({
      bandId: band.bandId,
    })

    expect(events).toHaveLength(1)
  })
})
