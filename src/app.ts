import fastify from 'fastify'
import { orgsRoutes } from './http/orgs.routes'
import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/pets.routes'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d'
  }
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', issues: error.format()})
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO: here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
})