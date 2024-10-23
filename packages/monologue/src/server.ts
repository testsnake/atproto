import { createServer } from 'node:http'

import { startServer } from './lib/http/server.js'
import { Context } from './context.js'
import { createApi } from './api.js'

export async function startMonologueServer(
  signal: AbortSignal,
  context: Context,
) {
  const apiMiddleware = createApi(context)

  const httpServer = createServer(apiMiddleware)

  await startServer(signal, httpServer, context.config.port)
}
