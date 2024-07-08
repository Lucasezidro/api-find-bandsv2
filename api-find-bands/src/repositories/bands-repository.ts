import { Band, Prisma } from '@prisma/client'

export interface BandsRepository {
  findBandByUserId(userId: string): Promise<Band | null>
  create(data: Prisma.BandUncheckedCreateInput): Promise<Band>
  getBandById(bandId: string): Promise<Band | null>
  update(member: Band): Promise<Band>

  listBands(): Promise<Band[]>
}
