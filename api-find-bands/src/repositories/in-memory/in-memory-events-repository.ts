import { Events, Prisma } from '@prisma/client'
import { EventsRepository } from '../events-repository'

export class InMemoryEventsRepository implements EventsRepository {
  public items: Events[] = []

  async listEventsByBand(bandId: string) {
    const events = this.items.filter((item) => item.bandEventId === bandId)

    return events
  }

  async create(data: Prisma.EventsUncheckedCreateInput) {
    const event = {
      eventId: 'event-id',
      eventDate: data.eventDate as Date,
      location: data.location,
      isEventHasPast: data.isEventHasPast ?? false,
      description: data.description ?? '',
      bandEventId: data.bandEventId,
      eventSize: data.eventSize ?? 'SMALL',
      eventImages: data.eventImages ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(event)

    return event
  }

  async delete(event: Events) {
    const itemIndex = this.items.findIndex(
      (item) => item.eventId === event.eventId,
    )

    this.items.splice(itemIndex, 1)
  }

  async update(event: Events) {
    const eventIndex = this.items.findIndex(
      (item) => item.eventId === event.eventId,
    )

    if (eventIndex >= 0) {
      this.items[eventIndex] = event
    }

    return event
  }
}
