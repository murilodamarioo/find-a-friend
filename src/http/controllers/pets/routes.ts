import { FastifyInstance } from 'fastify'
import { registerPetController } from './register-pet.controller'

export function petsRoutes(app: FastifyInstance) {

  app.post('/pets', registerPetController)

}