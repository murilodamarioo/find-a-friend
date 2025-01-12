import { app } from '@/app'
import request from 'supertest';
import { makePet } from '@/tests/factories/make-pet.factory';
import { makeOrg } from '@/tests/factories/make-org.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pet (E2E)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server)
      .post('/auth')
      .send({
        email: org.email,
        password: org.password
      })
      .expect(200)

    const { token } = authResponse.body

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet())
      .expect(201)

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet())
      .expect(201)

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city })

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search a pet by city and age', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server)
      .post('/auth')
      .send({
        email: org.email,
        password: org.password
      })
      .expect(200)

    const { token } = authResponse.body

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ age: '1' }))
      .expect(201)

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ age: '2' }))
      .expect(201)

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, age: '1' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search a pet by city and size', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server)
      .post('/auth')
      .send({
        email: org.email,
        password: org.password
      })
      .expect(200)
    
    const { token } = authResponse.body

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'large' }))
      .expect(201)

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'medium' }))
      .expect(201)

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'large' }))
      .expect(201)

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.id, size: 'large' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search a pet by city and environment', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server)
      .post('/auth')
      .send({
        email: org.email,
        password: org.password
      })
      .expect(200)

    const { token } = authResponse.body

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ environment: 'indoor' }))
      .expect(201)
    
    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ environment: 'outdoor' }))
      .expect(201)

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, environment: 'indoor' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search a pet by city and energy level', async () => {
    const org = makeOrg()

    await request(app.server)
      .post('/orgs')
      .send(org)
      .expect(201)

    const authResponse = await request(app.server)
      .post('/auth')
      .send({
        email: org.email,
        password: org.password
      })
      .expect(200)
    
    const { token } = authResponse.body

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ energy_level: 'high' }))
      .expect(201)
    
    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ energy_level: 'low' }))
      .expect(201)
    
    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ energy_level: 'high' })
      
    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

})