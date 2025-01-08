import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { OrgNotFoundError } from '../errors/org-not-found.error'
import { RegisterPetUseCase } from './register-pet.use-case'
import { makePet } from '@/tests/factories/make-pet.factory'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { it, beforeEach, describe, expect } from 'vitest'

describe('Register Pet use case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: RegisterPetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a new pet', async () => {
    const org = await orgsRepository.create(makeOrg())
    const { pet } = await sut.execute(makePet({ org_id: org.id }))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a new pet with non-existing org', async () => {
    const pet = makePet({ org_id: 'non-existing-org-id' })

    await petsRepository.create(pet)

    await expect(() => sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
