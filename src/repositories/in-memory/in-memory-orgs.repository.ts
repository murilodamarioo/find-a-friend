import { Prisma, Org } from '@prisma/client';
import { FindManyNearbyParams, OrgsRepository } from '../orgs.repository'
import { Decimal } from '@prisma/client/runtime/library';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

export class InMemoryOrgsRepository implements OrgsRepository {

  public items: Org[] = []
  
  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString())
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    return this.items.find(item => item.email === email) || null
  }

  async findById(id: string) {
      return this.items.find(item => item.id === id) || null
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude, 
          longitude: params.longitude
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber()
        }
      )
      return distance < 10
    })
  }
  
}