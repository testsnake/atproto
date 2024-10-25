import { createServer as createXrpcServer } from '@atproto/xrpc-server'

import { Context } from '../context.js'
import { schemas } from '../lexicon.js'
import { Handler } from '../lib/http/types.js'
import { chatBskyMonologueGetMessages } from './api/chat.bsky.monologue.getMessages.js'
import { chatBskyMonologueList } from './api/chat.bsky.monologue.list.js'
import { createAuthVerifier } from './auth.js'

export function createApiMiddleware(context: Context): Handler {
  const xrpcServer = createXrpcServer(schemas, {
    validateResponse: context.config.server.validateResponse,
  })

  const auth = createAuthVerifier(context)

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
