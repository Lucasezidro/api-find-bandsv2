import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'
import { GetMemberByBandIdUseCase } from './get-member-by-band-id'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'

let inMemoryMembersRepository: InMemoryMembersRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryBandsRepository: InMemoryBandRepository

let sut: GetMemberByBandIdUseCase

describe('Get Members by Band id', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryBandsRepository = new InMemoryBandRepository()

    inMemoryMembersRepository = new InMemoryMembersRepository()
    sut = new GetMemberByBandIdUseCase(inMemoryMembersRepository)
  })

  it('should be able to get member of a band by band id', async () => {
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

    await inMemoryMembersRepository.create({
      name: 'new member',
      email: 'newmember@email.com',
      office: 'vocalista',
      bandRoleId: band.bandId,
    })

    const { members } = await sut.execute({
      bandId: band.bandId,
    })

    expect(members).toHaveLength(1)
  })
})
