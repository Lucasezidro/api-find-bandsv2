import { Band, Prisma } from '@prisma/client'

export interface BandsRepository {
  findBandByUserId(userId: string): Promise<Band | null>
  create(data: Prisma.BandUncheckedCreateInput): Promise<Band>
  getBandById(bandId: string): Promise<Band | null>

  listBands(): Promise<Band[]>
}
