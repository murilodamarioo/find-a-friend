import { FastifyInstance } from 'fastify'
import { registerOrgController } from './register-org.controller'
import { AuthOrgController } from './auth-org.controller'

export async function orgsRoutes(app: FastifyInstance) {

  app.post('/orgs', registerOrgController)
  
  app.post('/auth', AuthOrgController)
  
}