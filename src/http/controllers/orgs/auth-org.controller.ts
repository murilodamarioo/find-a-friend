import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'
import { makeAuthOrgUseCase } from '@/use-cases/factories/make-auth-org.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authOrgBodySchema = z.object({
  email: z.string(),
  password: z.string()
})

export async function authOrgController(request: FastifyRequest, reply: FastifyReply) {
  const body = authOrgBodySchema.parse(request.body)

  const authOrgUseCase = makeAuthOrgUseCase()

  try {
    const { org } = await authOrgUseCase.execute(body)
    
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id
        }
      }
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}