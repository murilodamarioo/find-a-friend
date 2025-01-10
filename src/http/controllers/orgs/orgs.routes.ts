
import { FastifyInstance } from 'fastify'
import { registerOrgController } from './register-org.controller'
import { authOrgController } from './auth-org.controller'
import { fetchNearbyOrgsController } from './fetch-nearby-orgs.controller'

export async function orgsRoutes(app: FastifyInstance) {

  app.post('/orgs', registerOrgController)
  
  app.post('/auth', authOrgController)

  app.get('/orgs/nearby', fetchNearbyOrgsController)
  
}