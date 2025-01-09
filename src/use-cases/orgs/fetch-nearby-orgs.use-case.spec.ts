import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyOrgsUseCase } from './fetch-nearby-orgs.use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makeOrg } from '@/tests/factories/make-org.factory'


describe('Fetch nearby orgs use case', () => {
  let orgsReposioty: InMemoryOrgsRepository
  let sut: FetchNearbyOrgsUseCase

  beforeEach(() => {
    orgsReposioty = new InMemoryOrgsRepository
    sut = new FetchNearbyOrgsUseCase(orgsReposioty)
  })

  it('should be able to Fetch nearby orgs', async () => {
    const org = await orgsReposioty.create(makeOrg())

    const nearbyOrgs = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber()
    })

    expect(nearbyOrgs.orgs).toEqual([org])
  })
})