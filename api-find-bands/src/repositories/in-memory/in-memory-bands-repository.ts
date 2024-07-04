import { Band, Prisma } from '@prisma/client'
import { BandsRepository } from '../bands-repository'

export class InMemoryBandRepository implements BandsRepository {
  public items: Band[] = []

  async findManyByUserId(userId: string) {
    const bands = this.items.filter((item) => item.userAdminId === userId)

    return bands
  }

  async listBands() {
    const bands = this.items

    return bands
  }

  async create(data: Prisma.BandUncheckedCreateInput) {
    const band = {
      bandId: 'band-01',
      bandName: data.bandName,
      style: data.style,
      description: data.description,
      userAdminId: data.userAdminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(band)

    return band
  }

  async getBandById(bandId: string) {
    const band = this.items.find((item) => item.bandId === bandId)

    if (!band) {
      return null
    }

    return band
  }
}
