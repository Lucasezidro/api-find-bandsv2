import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { UpdateMemberUseCase } from './update-member'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryBandsRepository: InMemoryBandRepository

let inMemoryMembersRepository: InMemoryMembersRepository
let sut: UpdateMemberUseCase

describe('Update member', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryBandsRepository = new InMemoryBandRepository()

    inMemoryMembersRepository = new InMemoryMembersRepository()
    sut = new UpdateMemberUseCase(inMemoryMembersRepository)
  })

  it('should be able to update a member', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
      role: 'FINDER',
    })

    const band = await inMemoryBandsRepository.create({
      bandName: 'new band',
      description: 'lorem ipsum dolor',
      style: 'rock',
      userAdminId: user.userId,
    })

    const member = await inMemoryMembersRepository.create({
      name: 'new member',
      email: 'newmember@email.com',
      office: 'vocalista',
      bandRoleId: band.bandId,
    })

    await sut.execute({
      ...member,
      name: 'John Doe',
    })

    expect(member.name).toEqual('John Doe')
  })
})
