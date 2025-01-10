import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '@/tests/factories/make-org.factory'


describe('Auth Org (E2E)', () => {
  
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoul be able to auth an org', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)
    
    const response = await request(app.server)
      .post('/auth')
      .send({
        email: org.email,
        password: org.password
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})