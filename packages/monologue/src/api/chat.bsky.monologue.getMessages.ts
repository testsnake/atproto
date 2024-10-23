import { Context } from '../context.js'
import {
  MessageView,
  DeletedMessageView,
} from '../lexicon/types/chat/bsky/monologue/defs.js'
import { Handler } from '../lexicon/types/chat/bsky/monologue/getMessages.js'

export function chatBskyMonologueGetMessages({
  bsky,
  db,
}: Context): Handler<{ credentials: { did: string } }> {
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
          id: message.uri,
          author: { did: message.author },
          timestamp: String(message.indexedAt),
        })),
      },
    }
  }
}
