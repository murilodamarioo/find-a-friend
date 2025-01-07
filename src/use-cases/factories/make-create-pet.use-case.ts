import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { RegisterPetUseCase } from '@/use-cases/pets/register-pet.use-case'

export function makeCreatePetUseCase() {
  return new RegisterPetUseCase(
    new PrismaPetsRepository(), 
    new PrismaOrgsRepository()
  )
}