import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository' 
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { SearchPetUseCase } from './search-pet.use-case'
import { makePet } from '@/tests/factories/make-pet.factory'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { beforeEach, describe, expect, it } from 'vitest'


describe('Search Pet use case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id }))
    await petsRepository.create(makePet({ org_id: org.id }))

    const org2 = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org2.id }))

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and age', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id, age: '2' }))
    await petsRepository.create(makePet({ org_id: org.id, age: '2' }))

    const org2 = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org2.id, age: '1' }))
    await petsRepository.create(makePet({ org_id: org2.id, age: '2' }))

    const { pets } = await sut.execute({ city: org.city, age: '2' })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city, age: '1' })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id, size: 'small' }))
    await petsRepository.create(makePet({ org_id: org.id, size: 'medium' }))
    await petsRepository.create(makePet({ org_id: org.id, size: 'large' }))

    const { pets } = await sut.execute({ city: org.city, size: 'medium' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy level', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id, energy_level: 'low' }))
    await petsRepository.create(makePet({ org_id: org.id, energy_level: 'high' }))
    await petsRepository.create(makePet({ org_id: org.id, energy_level: 'high' }))
    await petsRepository.create(makePet({ org_id: org.id, energy_level: 'medium' }))

    const { pets } = await sut.execute({ city: org.city, energy_level: 'high' })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search pets by city and environment', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id, environment: 'indoor' }))
    await petsRepository.create(makePet({ org_id: org.id, environment: 'indoor' }))
    await petsRepository.create(makePet({ org_id: org.id, environment: 'outdoor' }))

    const { pets } = await sut.execute({ city: org.city, environment: 'outdoor' })

    expect(pets).toHaveLength(1)
  })
})