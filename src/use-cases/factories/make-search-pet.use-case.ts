import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { SearchPetUseCase } from '../pets/search-pet.use-case'

export function makeSearchPetUseCase() {
  return new SearchPetUseCase(new PrismaPetsRepository())
}