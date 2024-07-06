import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { InMemoryBandRepository } from '@/repositories/in-memory/in-memory-bands-repository'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { DeleteMemberUseCase } from './delete-member'

let inMemoryMembersRepository: InMemoryMembersRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryBandsRepository: InMemoryBandRepository

let sut: DeleteMemberUseCase

describe('Delete Member', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryBandsRepository = new InMemoryBandRepository()

    inMemoryMembersRepository = new InMemoryMembersRepository()
    sut = new DeleteMemberUseCase(inMemoryMembersRepository)
  })

  it('should be able to delete a member of a band', async () => {
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

    const member = await inMemoryMembersRepository.create({
      name: 'new member',
      email: 'newmember@email.com',
      office: 'vocalista',
      bandRoleId: band.bandId,
    })

    await sut.execute({
      id: member.id,
    })

    expect(inMemoryMembersRepository.items).toHaveLength(0)
  })
})
