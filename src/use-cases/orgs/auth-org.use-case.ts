import { InvalidCredentialsError } from '../errors/invalid-credentials.error'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthOrgUseCaseResponse {
  org: Org
}

export class AuthOrgUseCase {
  constructor(private orgsReposiotry: OrgsRepository) {}

  async execute({ email, password }: AuthOrgUseCaseRequest): Promise<AuthOrgUseCaseResponse> {
    const org = await this.orgsReposiotry.findByEmail(email)

    if (!org) throw new InvalidCredentialsError()

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) throw new InvalidCredentialsError()
    
    return { org }
  }
}