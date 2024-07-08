import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { CreateEventUseCase } from '@/use-cases/events/create-event'

export function makeCreateEvent() {
  const eventsRepository = new PrismaEventsRepository()
  const createEventUseCase = new CreateEventUseCase(eventsRepository)

  return createEventUseCase
}
