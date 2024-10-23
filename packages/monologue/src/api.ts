import { createServer as createXrpcServer } from './lexicon/index.js'

import { Context } from './context.js'
import {
  DeletedMessageView,
  MessageView,
  MonologueView,
} from './lexicon/types/chat/bsky/monologue/defs.js'
import { Handler } from './lib/http/types.js'

export function createApi({ db, appview }: Context): Handler {
  const server = createXrpcServer({
    validateResponse: false,
  })

  // TODO
  const auth = ({ req, res }) => ({ credentials: { did: 'did:example:123' } })

  server.chat.bsky.monologue.list({
    auth,
    handler: async ({ auth }) => {
      // @TODO: Create or Update the ActorStatusTable entry

      const monologues = await db
        .selectFrom('actorStatus')
        .select(['subject', 'isMuted as muted'])
        .where('actor', '=', auth.credentials.did)
        .leftJoin(
          (eb) =>
            eb
              .selectFrom('message')
              .select('subject')
              .select((se) => se.fn.countAll().as('unreadCount'))
              .leftJoin('actorStatus', (join) =>
                join
                  .onRef('actorStatus.subject', '=', 'message.subject')
                  .on('actorStatus.actor', '=', auth.credentials.did),
              )
              .where((eb) =>
                eb.or([
                  //
                  eb('actorStatus.readAt', 'is', null),
                  // @ts-expect-error - TODO: Why does this fail?
                  eb('actorStatus.readAt', '<', 'message.indexedAt'),
                ]),
              )
              .groupBy('subject')
              .as('messages'),
          (join) => join.onRef('messages.subject', '=', 'actorStatus.subject'),
        )
        .select('messages.unreadCount as unreadCount')
        .execute()

      // @TODO: Cache this (by reading profile updates from jetstream)
      const { data: { profiles } = {} } = await appview.app.bsky.actor
        .getProfiles({ actors: monologues.map((m) => m.subject) })
        .catch((err) => ({ data: undefined }))

      return {
        encoding: 'application/json',
        body: {
          monologues: monologues.map(
            (monologue): MonologueView => ({
              subject: profiles?.find((p) => p.did === monologue.subject) || {
                did: monologue.subject,
              },
              muted: monologue.muted,
              unreadCount: Number(monologue.unreadCount ?? 0),
            }),
          ),
        },
      }
    },
  })

  server.chat.bsky.monologue.getMessages({
    auth,
    handler: async ({ auth, params }) => {
      const { subject, cursor, limit } = params

      const messages = await db
        .selectFrom('message')
        .select('uri')
        .select('author')
        .select('indexedAt')
        .where('subject', '=', subject)
        .orderBy('createdAt', 'asc')
        .execute()

      return {
        encoding: 'application/json',
        body: {
          messages: messages.map(
            (message): MessageView | DeletedMessageView => ({
              // TODO: Non deleted messages
              id: message.uri,
              author: { did: message.author },
              timestamp: String(message.indexedAt),
            }),
          ),
        },
      }
    },
  })

  return server.xrpc.router
}
