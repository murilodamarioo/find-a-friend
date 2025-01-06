import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { beforeEach } from 'node:test'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { makeOrg } from '@/tests/factories/make-org-factory'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { compare } from 'bcryptjs'

describe('Register Org use case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })
  
  it('should be able to register a new org', async () => {
    const { org } = await sut.execute(makeOrg())

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register a new org with an already used email', async () => {
    const org = makeOrg()

    await sut.execute(org)

    await expect(() => sut.execute(org)).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash password upon creation', async () => {
    const password = '123456'
    const { org } = await sut.execute(makeOrg({ password }))

    // check if password was hashed
    expect(await compare(password, org.password)).toBe(true)

    // check if the same password was hashed in the database
    expect(await compare(password, orgsRepository.items[0].password)).toBe(true)
  })
})