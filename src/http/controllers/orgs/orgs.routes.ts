import { fetchNearbyOrgsController } from './fetch-nearby-orgs.controller'
import { registerOrgController } from './register-org.controller'
import { authOrgController } from './auth-org.controller'
import { FastifyInstance } from 'fastify'

export async function orgsRoutes(app: FastifyInstance) {

  app.post('/orgs', registerOrgController)
  
  app.post('/auth', authOrgController)

  app.get('/orgs/nearby', fetchNearbyOrgsController)
  
}