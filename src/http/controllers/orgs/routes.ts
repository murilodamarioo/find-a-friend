import { FastifyInstance } from 'fastify'
import { registerOrgController } from './register-org.controller'

export async function orgsRoutes(app: FastifyInstance) {

  app.post('/orgs', registerOrgController)
  
}