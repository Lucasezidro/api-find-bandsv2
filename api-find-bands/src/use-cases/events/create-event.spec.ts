import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'
import { CreateEventUseCase } from './create-event'
import { InMemoryEventsRepository } from '@/repositories/in-memory/in-memory-events-repository'

let inMemoryBandsRepository: InMemoryBandRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEventsRepository: InMemoryEventsRepository

let sut: CreateEventUseCase

describe('Register Band', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryBandsRepository = new InMemoryBandRepository()

    inMemoryEventsRepository = new InMemoryEventsRepository()
    sut = new CreateEventUseCase(inMemoryEventsRepository)
  })

  it('should be able to register a band', async () => {
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

    const { event } = await sut.execute({
      bandEventId: band.bandId,
      eventDate: new Date(),
      location: 'Some stage',
      description: 'lorem ipsum',
    })

    expect(event.eventId).toEqual(expect.any(String))
  })
})
