import { Events, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { EventsRepository } from '../events-repository'

export class PrismaEventsRepository implements EventsRepository {
  async listEventsByBand(bandId: string) {
    const events = await prisma.events.findMany({
      where: {
        bandEventId: bandId,
      },
    })

    return events
  }

  async create(data: Prisma.EventsUncheckedCreateInput) {
    const event = await prisma.events.create({
      data,
    })

    return event
  }

  async delete(event: Events) {
    await prisma.events.delete({
      where: {
        eventId: event.eventId,
      },
    })
  }

  async update(event: Events) {
    const updatedEvent = await prisma.events.update({
      where: {
        eventId: event.eventId,
      },
      data: event,
    })

    return updatedEvent
  }
}
