import { createServer as createHttpServer } from 'node:http'

import { chatBskyMonologueGetMessages } from './api/chat.bsky.monologue.getMessages.js'
import { chatBskyMonologueList } from './api/chat.bsky.monologue.list.js'
import { Context } from './context.js'
import { createServer as createXrpcServer } from './lexicon/index.js'
import { startHttpServer } from './lib/http/server.js'
import { Handler } from './lib/http/types.js'

export async function server(signal: AbortSignal, context: Context) {
  const apiMiddleware = createXrpcMiddleware(context)

  const httpServer = createHttpServer(apiMiddleware)

  await startHttpServer(signal, httpServer, context.config.port)
}

export function createXrpcMiddleware(context: Context): Handler {
  const server = createXrpcServer({
    validateResponse: false,
  })

  // TODO
  const auth = async ({ req, res }) => ({
    credentials: { did: 'did:plc:123' },
  })

  server.chat.bsky.monologue.list({
    auth,
    handler: chatBskyMonologueList(context),
  })

  server.chat.bsky.monologue.getMessages({
    auth,
    handler: chatBskyMonologueGetMessages(context),
  })

  return server.xrpc.router
}
