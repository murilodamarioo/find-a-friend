import { FastifyInstance } from 'fastify'
import { registerPetController } from './register-pet.controller'
import { verifiyJwt } from '@/http/middlewares/verify-jwt'
import { getPetController } from './get-pet.controller'

export function petsRoutes(app: FastifyInstance) {

  app.post('/orgs/pets', { onRequest: verifiyJwt },registerPetController)

  app.get('/orgs/pets/:id', getPetController)

}