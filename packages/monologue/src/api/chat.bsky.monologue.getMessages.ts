import { Did, Infer } from '../../../jetstream/dist/lexicon-infer.js'
import { Context } from '../context.js'
import { Schemas } from '../lexicon.js'
import { LocalHandler } from './util/types.js'

type DeletedMessageView = Infer<
  Schemas,
  'lex:chat.bsky.monologue.defs#deletedMessageView'
>

type MessageView = Infer<Schemas, 'lex:chat.bsky.monologue.defs#messageView'>

export function chatBskyMonologueGetMessages({
  bsky,
  db,
}: Context): LocalHandler<'chat.bsky.monologue.getMessages'> {
  return async ({ auth, params: { subject, cursor, limit } }) => {
    // @TODO: limit & cursor

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
        messages: messages.map((message): MessageView | DeletedMessageView => ({
          // TODO: Non deleted messages
          id: message.uri as `at://${string}`,
          author: { did: message.author as Did },
          timestamp: message.indexedAt.toISOString() as any,
        })),
      },
    }
  }
}
