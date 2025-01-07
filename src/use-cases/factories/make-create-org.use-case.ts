import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { RegisterOrgUseCase } from '../orgs/register-org.use-case'

export function makeCreateOrgUseCase() {

  return new RegisterOrgUseCase(new PrismaOrgsRepository())

}