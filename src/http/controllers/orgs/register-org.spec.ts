import { app } from '@/app'
import request from 'supertest'
import { describe, it } from 'vitest'

describe('Register Org controller tests', () => {

  it('should be able to register an org', async () => {
    const response = await request(app.server).post('/orgs')
  })

})