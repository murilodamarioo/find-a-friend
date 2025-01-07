import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { AuthOrgUseCase } from './auth-org.use-case'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials.error'


describe('Auth Org use case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthOrgUseCase(orgsRepository)
  })

  it('should be able to auth an org', async () => {
    const password = '123456'

    // create org with a specific password to verify later
    const org = await orgsRepository.create(makeOrg({ password: await hash(password, 6) }))

    const { org: authenticatedOrg } = await sut.execute({ email: org.email, password })

    expect(authenticatedOrg).toEqual(org)
  })

  it('should not be able to auth an org with wrong email', async () => {
    await expect(() => 
      sut.execute({
        email: 'WRONG-EMAIL',
        password: 'CORRECT-PASSWORD'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to auth an org with wrong password', async () => {
    const password = 'CORRECT-PASSWORD'

    // create an org with a specific password
    const org = await orgsRepository.create(makeOrg({ password: await hash(password, 6) }))

    await expect(() => 
      sut.execute({
        email: org.email,
        password: 'WRONG-PASSWORD'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

})