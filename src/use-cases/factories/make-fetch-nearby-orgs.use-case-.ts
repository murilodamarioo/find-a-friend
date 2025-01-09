import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { FetchNearbyOrgsUseCase } from '../orgs/fetch-nearby-orgs.use-case'

export function MakeFetchNearbyOrgsUseCase() {
  return new FetchNearbyOrgsUseCase(new PrismaOrgsRepository)
}