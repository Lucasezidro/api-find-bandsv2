import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { GetEventsUseCase } from '@/use-cases/events/get-events'

export function makeGetEvents() {
  const eventsRepository = new PrismaEventsRepository()
  const getEventsUseCase = new GetEventsUseCase(eventsRepository)

  return getEventsUseCase
}
