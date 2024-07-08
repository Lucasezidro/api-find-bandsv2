import { Events, Prisma } from '@prisma/client'

export interface EventsRepository {
  listEventsByBand(bandId: string): Promise<Events[]>

  create(data: Prisma.EventsUncheckedCreateInput): Promise<Events>
  update(event: Events): Promise<Events>
  delete(event: Events): Promise<void>
}
