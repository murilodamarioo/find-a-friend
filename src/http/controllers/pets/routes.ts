import { FastifyInstance } from 'fastify'
import { registerPetController } from './register-pet.controller'
import { verifiyJwt } from '@/http/middlewares/verify-jwt'

export function petsRoutes(app: FastifyInstance) {

  app.post('/pets', { onRequest: verifiyJwt },registerPetController)

}