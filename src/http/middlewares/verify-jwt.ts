import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifiyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch(error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}