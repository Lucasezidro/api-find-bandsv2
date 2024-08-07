import { Band, Prisma } from '@prisma/client'
import { BandsRepository } from '../bands-repository'

export class InMemoryBandRepository implements BandsRepository {
  public items: Band[] = []

  async findBandByUserId(userId: string) {
    const band = this.items.find((item) => item.userAdminId === userId)

    if (!band) {
      return null
    }

    return band
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
      isFavorit: data.isFavorit ?? false,
      messages: data.messages ?? '',
      favoritCount: data.favoritCount ?? 0,
      userAdminId: data.userAdminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(band)

    return band
  }

  async update(band: Band) {
    const bandIndex = this.items.findIndex(
      (item) => item.bandId === band.bandId,
    )

    if (bandIndex >= 0) {
      this.items[bandIndex] = band
    }

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
