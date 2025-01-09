import { MakeFetchNearbyOrgsUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs.use-case-'
import { FastifyReply, FastifyRequest } from 'fastify' 
import { z } from 'zod'

const querySchema = z.object({
  latitude: z.number().refine(value => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine(value => {
    return Math.abs(value) <= 180
  })
})

export async function fetchNearbyOrgsController(request: FastifyRequest, reply: FastifyReply) {
  const query = querySchema.parse(request.query)

  const makeFetchNearbyOrgsUseCase = MakeFetchNearbyOrgsUseCase()

  try {
    const orgs = makeFetchNearbyOrgsUseCase.execute({ 
      userLatitude: query.latitude,
      userLongitude: query.longitude
    })

    return { orgs }
  } catch(error) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}