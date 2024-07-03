import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.user.deleteMany()

  const passwordHash = await hash('123456', 6)

  const user1 = await prisma.user.create({
    data: {
      name: 'Lucas Ezidro',
      role: 'ADMIN',
      email: 'lucasezidro@email.com',
      password: passwordHash,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      role: 'ADMIN',
      email: faker.internet.email(),
      password: passwordHash,
    },
  })

  const user3 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      role: 'ADMIN',
      email: faker.internet.email(),
      password: passwordHash,
    },
  })

  await prisma.band.create({
    data: {
      bandName: faker.music.songName(),
      style: faker.music.genre(),
      userAdminId: user1.userId,
      description: faker.lorem.paragraph(),
      member: {
        createMany: {
          data: [
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Guitarrista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Vocalista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Baixista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Guitarrista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Baterista',
              avatar: faker.image.avatar(),
            },
          ],
        },
      },
    },
  })

  await prisma.band.create({
    data: {
      bandName: faker.music.songName(),
      style: faker.music.genre(),
      userAdminId: user2.userId,
      description: faker.lorem.paragraph(),
      member: {
        createMany: {
          data: [
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Guitarrista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Vocalista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Baixista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Guitarrista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Baterista',
              avatar: faker.image.avatar(),
            },
          ],
        },
      },
    },
  })

  await prisma.band.create({
    data: {
      bandName: faker.music.songName(),
      style: faker.music.genre(),
      userAdminId: user3.userId,
      description: faker.lorem.paragraph(),
      member: {
        createMany: {
          data: [
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Guitarrista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Vocalista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Baixista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Guitarrista',
              avatar: faker.image.avatar(),
            },
            {
              name: faker.person.firstName(),
              email: faker.internet.email(),
              office: 'Baterista',
              avatar: faker.image.avatar(),
            },
          ],
        },
      },
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
})
