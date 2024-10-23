import { createServer as createXrpcServer } from './lexicon/index.js'

import { Context } from './context.js'
import { Handler } from './lib/http/types.js'

export function createApi(context: Context): Handler {
  const server = createXrpcServer({
    validateResponse: false,
  })

  server.chat.bsky.monologue.listActive({
    // auth: context.authVerifier.accessStandard(),
    auth: ({ req, res }) => ({ credentials: { did: 'did:example:123' } }),
    handler: async ({ auth }) => {
      return {
        encoding: 'application/json',
        body: { monologues: [] },
      }
    },
  })

  return server.xrpc.router
}
