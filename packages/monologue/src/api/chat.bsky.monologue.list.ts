import { Infer } from '../../../jetstream/dist/lexicon-infer.js'
import { Context } from '../context.js'
import { Schemas } from '../lexicon.js'
import { LocalHandler } from './util/types.js'

type MonologueView = Infer<
  Schemas,
  'lex:chat.bsky.monologue.defs#monologueView'
>

export function chatBskyMonologueList({
  bsky,
  db,
}: Context): LocalHandler<'chat.bsky.monologue.list'> {
  return async ({ params, auth }) => {
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
    const { data: { profiles } = {} } = await bsky.app.bsky.actor
      .getProfiles({ actors: monologues.map((m) => m.subject) })
      .catch((err) => ({ data: undefined }))

    return {
      encoding: 'application/json',
      body: {
        monologues: monologues.map(
          (monologue) =>
            ({
              subject: profiles?.find((p) => p.did === monologue.subject) || {
                did: monologue.subject,
              },
              muted: monologue.muted,
              unreadCount: Number(monologue.unreadCount ?? 0),
            }) as MonologueView,
        ),
      },
    }
  }
}
