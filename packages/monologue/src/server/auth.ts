import { AuthVerifierContext, HandlerError } from '@atproto/xrpc-server'
import { Context } from '../context.js'

export type Auth = { credentials: { did: string } }

export function createAuthVerifier(context: Context) {
  return async ({ req }: AuthVerifierContext): Promise<Auth | HandlerError> => {
    const authorization = req.headers.authorization
    if (!authorization) {
      return {
        status: 401,
        error: 'Unauthorized',
        message: 'Missing Authorization header',
      }
    }

    // @TODO (service auth)
    return { credentials: { did: 'did:plc:123' } }
  }
}
