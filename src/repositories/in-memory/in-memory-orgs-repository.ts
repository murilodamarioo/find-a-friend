import { Prisma, Org } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository'
import { Decimal } from '@prisma/client/runtime/library';

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
  
}