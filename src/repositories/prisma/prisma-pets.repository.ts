import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }

}