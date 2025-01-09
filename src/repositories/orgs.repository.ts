import { Org, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface OrgsRepository {

  create(org: Prisma.OrgCreateInput): Promise<Org>

  findByEmail(email: string): Promise<Org | null>

  findById(id: string): Promise<Org | null>

  findManyNearby(params: FindManyNearbyParams): Promise<Org[]>

}