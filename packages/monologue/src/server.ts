import { createServer } from 'node:http'

import { Context } from './context.js'
import { startHttpServer } from './lib/http/server.js'
import { createApiMiddleware } from './server/api.js'

export async function server(signal: AbortSignal, context: Context) {
  const apiMiddleware = createApiMiddleware(context)

  const httpServer = createServer(apiMiddleware)

  await startHttpServer(signal, httpServer, context.config.port)
}
