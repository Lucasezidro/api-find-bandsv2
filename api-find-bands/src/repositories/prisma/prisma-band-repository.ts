import { Band, Prisma } from '@prisma/client'
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

  async update(band: Band) {
    const updatedBand = await prisma.band.update({
      where: {
        bandId: band.bandId,
      },
      data: band,
    })

    return updatedBand
  }

  async getBandById(bandId: string) {
    const band = await prisma.band.findFirst({
      where: {
        bandId,
      },
    })

    return band
  }
}
