import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const resgisterBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  whatsapp: z.string(),
  password: z.string().min(6),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number().refine(value => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine(value => {
    return Math.abs(value) <= 180
  })
})

export async function registerOrgController(request: FastifyRequest, reply: FastifyReply) {

  const body = resgisterBodySchema.parse(request.body)

  const registerOrgUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await registerOrgUseCase.execute(body)

    return reply.status(201).send(org)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}