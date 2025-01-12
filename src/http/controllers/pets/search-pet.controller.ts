import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const routeParamsSchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional()
})

export async function searchPetController(request: FastifyRequest, reply: FastifyReply) {

  const { city, age, energy_level, size, environment } = routeParamsSchema.parse(request.query)

  const searchPetUseCase = makeSearchPetUseCase()

  try {
    const { pets } = await searchPetUseCase.execute({ city, age, energy_level, environment, size })

    return { pets }
  } catch(error) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}