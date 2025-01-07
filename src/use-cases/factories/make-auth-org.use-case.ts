import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { AuthOrgUseCase } from '../orgs/auth-org.use-case'

export function makeAuthOrgUseCase() {
  return new AuthOrgUseCase(new PrismaOrgsRepository)
}