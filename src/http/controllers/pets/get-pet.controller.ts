import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const routeParamSchema = z.object({
  id: z.string()
})


export async function getPetController(request: FastifyRequest, reply: FastifyReply) {

  const { id } = routeParamSchema.parse(request.params)
  
  const getPetUseCase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({ id })

    return reply.status(200).send(pet)
  } catch(error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}