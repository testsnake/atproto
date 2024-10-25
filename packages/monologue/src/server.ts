import { createServer as createXrpcServer } from '@atproto/xrpc-server'
import { createServer as createHttpServer } from 'node:http'

import { chatBskyMonologueGetMessages } from './api/chat.bsky.monologue.getMessages.js'
import { chatBskyMonologueList } from './api/chat.bsky.monologue.list.js'
import { Context } from './context.js'
import { schemas } from './lexicon.js'
import { startHttpServer } from './lib/http/server.js'
import { Handler } from './lib/http/types.js'

export async function server(signal: AbortSignal, context: Context) {
  const apiMiddleware = createXrpcMiddleware(context)

  const httpServer = createHttpServer(apiMiddleware)

  await startHttpServer(signal, httpServer, context.config.port)
}

export function createXrpcMiddleware(context: Context): Handler {
  const xrpcServer = createXrpcServer(schemas, {
    validateResponse: false,
  })

  // TODO
  const auth = async ({ req, res }) => ({
    credentials: { did: 'did:plc:123' },
  })

  xrpcServer.addMethod('chat.bsky.monologue.list', {
    auth,
    handler: chatBskyMonologueList(context) as any,
  })

  xrpcServer.addMethod('chat.bsky.monologue.getMessages', {
    auth,
    handler: chatBskyMonologueGetMessages(context) as any,
  })

  return xrpcServer.router
}
