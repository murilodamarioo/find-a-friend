import { FindAllParams } from './../pets.repository'
import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
      const pets = await prisma.pet.findMany({
        where: {
          age: params.age,
          size: params.size,
          energy_level: params.energy_level,
          environment: params.environment,
          org: {
            city: {
              contains: params.city,
              mode: 'insensitive'
            }
          }
        }
      })

      return pets
  }

}