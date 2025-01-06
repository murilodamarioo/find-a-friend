import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '../orgs/register-org.use-case'

export function makeCreateOrgUseCase() {

  return new RegisterUseCase(new PrismaOrgsRepository())

}