import { EventsRepository } from '@/repositories/events-repository'
import { Events } from '@prisma/client'

interface CreateEventUseCaseRequest {
  eventDate: Date
  location: string
  isEventHasPast?: boolean
  description?: string
  bandEventId: string
  eventSize?: 'BIG' | 'SMALL' | 'MEDIUM'
  eventImages?: string
}

interface CreateEventUseCaseResponse {
  event: Events
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    eventDate,
    location,
    description,
    bandEventId,
    eventImages,
    eventSize,
    isEventHasPast,
  }: CreateEventUseCaseRequest): Promise<CreateEventUseCaseResponse> {
    const event = await this.eventsRepository.create({
      eventDate,
      location,
      description: description ?? '',
      bandEventId,
      eventImages: eventImages ?? '',
      eventSize: eventSize ?? 'SMALL',
      isEventHasPast: isEventHasPast ?? false,
    })

    return { event }
  }
}
