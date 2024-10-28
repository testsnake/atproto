import { Context } from '../../context.js'
import { I } from '../../lexicon.js'
import { IHandler } from '../types.js'

type DeletedMessageView = I<'chat.bsky.monologue.defs#deletedMessageView'>
type MessageView = I<'chat.bsky.monologue.defs#messageView'>

export function chatBskyMonologueGetMessages({
  db,
}: Context): IHandler<'chat.bsky.monologue.getMessages'> {
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
          timestamp: message.indexedAt.toISOString(),
        })),
      },
    }
  }
}
