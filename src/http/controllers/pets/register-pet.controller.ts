import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet.use-case'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


const resgisterPetBodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.string(),
  energy_level: z.string(),
  environment: z.string(),
  isAvailable: z.boolean(),
})


export async function registerPetController(request: FastifyRequest, reply: FastifyReply) {
  const body = resgisterPetBodySchema.parse(request.body)

  console.log(request.user)

  const registerPetUseCase = makeCreatePetUseCase()
  const org_id = request.user.sub

  try {
    const { pet } = await registerPetUseCase.execute({...body, org_id})

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}