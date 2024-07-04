import { Band, Prisma } from '@prisma/client'

export interface BandsRepository {
  findManyByUserId(userId: string): Promise<Band[]>
  create(data: Prisma.BandUncheckedCreateInput): Promise<Band>
  getBandById(bandId: string): Promise<Band | null>

  listBands(): Promise<Band[]>
}
