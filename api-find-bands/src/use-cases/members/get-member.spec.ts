import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { GetMemberUseCase } from './get-member'

let inMemoryMembersRepository: InMemoryMembersRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryBandsRepository: InMemoryBandRepository

let sut: GetMemberUseCase

describe('Get Member', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryBandsRepository = new InMemoryBandRepository()

    inMemoryMembersRepository = new InMemoryMembersRepository()
    sut = new GetMemberUseCase(inMemoryMembersRepository)
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

    const createdMember = await inMemoryMembersRepository.create({
      name: 'new member',
      email: 'newmember@email.com',
      office: 'vocalista',
      bandRoleId: band.bandId,
    })

    const { member } = await sut.execute({
      memberId: createdMember.id,
    })

    expect(member.id).toEqual(expect.any(String))
  })
})
