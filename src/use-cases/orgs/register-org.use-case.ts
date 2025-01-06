import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ 
    name, 
    email, 
    whatsapp, 
    password, 
    cep, 
    state, 
    city, 
    neighborhood, 
    street, 
    latitude, 
    longitude 
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) throw new OrgAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude
    })

    return { org }
  }
}