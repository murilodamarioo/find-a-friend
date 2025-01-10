import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { makePet } from '@/tests/factories/make-pet.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'


describe('Register Pet (E2E)', () => {
  
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/auth').send({
        email: org.email,
        password: org.password
    })

    const { token } = authResponse.body
    
    const response = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send(makePet())
    
    expect(response.statusCode).toBe(201)
  })

})