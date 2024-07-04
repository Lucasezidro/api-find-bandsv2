import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    params: {
      id: string
    }
  }
}
