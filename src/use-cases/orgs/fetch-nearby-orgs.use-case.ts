import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'

interface FetchNearbyOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyOrgsUsaCaseResponse {
  orgs: Org[]
}

export class FetchNearbyOrgsUseCase {

  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude 
  }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUsaCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return { orgs }
  }
}