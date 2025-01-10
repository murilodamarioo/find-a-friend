import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (E2E)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send(makeOrg())

      expect(response.statusCode).toEqual(201)
  })

})