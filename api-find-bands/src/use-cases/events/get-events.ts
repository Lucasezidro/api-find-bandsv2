import { EventsRepository } from '@/repositories/events-repository'
import { Events } from '@prisma/client'

interface GetEventsUseCaseRequest {
  bandId: string
}

interface GetEventsUseCaseResponse {
  events: Events[]
}

export class GetEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    bandId,
  }: GetEventsUseCaseRequest): Promise<GetEventsUseCaseResponse> {
    const events = await this.eventsRepository.listEventsByBand(bandId)

    return { events }
  }
}
