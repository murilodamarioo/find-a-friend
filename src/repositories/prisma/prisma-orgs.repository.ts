import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '../orgs.repository'
import { Prisma, Org } from '@prisma/client'

export class PrismaOrgsRepository implements OrgsRepository {

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { email } })

    return org
  }

  async findById(id: string): Promise<Org | null> {
      const org = await prisma.org.findUnique({ where: { id } })

      return org
  }
  
}