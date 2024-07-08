import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.user.deleteMany()
  await prisma.band.deleteMany()

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
      messages: faker.lorem.paragraph(),
      favoritCount: 3,
      appointements: {
        create: {
          destination: user1.email,
          eventDate: faker.date.soon(),
          status: 'PENDING',
          description: faker.lorem.paragraph(),
        },
      },
      events: {
        createMany: {
          data: [
            {
              eventDate: faker.date.past(),
              location: faker.location.city(),
              isEventHasPast: true,
              description: faker.lorem.paragraph(),
            },
            {
              eventDate: faker.date.recent(),
              location: faker.location.city(),
              isEventHasPast: false,
              description: faker.lorem.paragraph(),
            },
          ],
        },
      },
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
      messages: faker.lorem.paragraph(),
      appointements: {
        createMany: {
          data: [
            {
              destination: user2.email,
              eventDate: faker.date.recent(),
              status: 'APPROVED',
              description: faker.lorem.paragraph(),
            },
            {
              destination: user2.email,
              eventDate: faker.date.past(),
              status: 'REFUSED',
              refusedReason:
                'Data indisponivel, agende para outra data por favor!',
              description: faker.lorem.paragraph(),
            },
          ],
        },
      },
      events: {
        createMany: {
          data: [
            {
              eventDate: faker.date.past(),
              location: faker.location.city(),
              isEventHasPast: true,
              description: faker.lorem.paragraph(),
            },
            {
              eventDate: faker.date.recent(),
              location: faker.location.city(),
              isEventHasPast: false,
              description: faker.lorem.paragraph(),
            },
          ],
        },
      },
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
