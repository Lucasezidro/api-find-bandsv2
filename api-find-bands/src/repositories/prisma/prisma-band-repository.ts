import { Prisma } from '@prisma/client'
import { BandsRepository } from '../bands-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBandRepository implements BandsRepository {
  async findBandByUserId(userId: string) {
    const bands = await prisma.band.findFirst({
      where: {
        userAdminId: userId,
      },
    })

    return bands
  }

  async listBands() {
    const bands = await prisma.band.findMany()

    return bands
  }

  async create(data: Prisma.BandUncheckedCreateInput) {
    const band = await prisma.band.create({
      data,
    })

    return band
  }

  async getBandById(bandId: string) {
    const band = await prisma.band.findFirst({
      where: {
        bandId,
      },
      select: {
        bandId: true,
        bandName: true,
        createdAt: true,
        description: true,
        userAdminId: true,
        style: true,
        updatedAt: true,
        member: true,
      },
    })

    return band
  }
}
