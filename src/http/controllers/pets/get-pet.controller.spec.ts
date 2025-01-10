import request from 'supertest'
import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makePet } from '@/tests/factories/make-pet.factory'

describe('Get Pet (E2E)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const org = makeOrg()
    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server)
      .post('/auth')
      .send({
        email: org.email,
        password: org.password
      })

    const { token } = authResponse.body

    const registerPetResponse = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ org_id: org.id }))
      .expect(201)

    const { id } = registerPetResponse.body

    const response = await request(app.server)
      .get(`/orgs/pets/${id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

})