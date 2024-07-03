import { Prisma } from '@prisma/client'
import { BandsRepository } from '../bands-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBandRepository implements BandsRepository {
  async findManyByUserId(userId: string) {
    const bands = await prisma.band.findMany({
      where: {
        userAdminId: userId,
      },
    })

    return bands
  }

  async create(data: Prisma.BandUncheckedCreateInput) {
    const band = await prisma.band.create({
      data,
    })

    return band
  }

  async getBandById(bandId: string) {
    const band = await prisma.band.findUnique({
      where: {
        bandId,
      },
    })

    return band
  }
}
