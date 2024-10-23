import { CommitType, Jetstream } from '@skyware/jetstream'
import WebSocket from 'ws'

import { Context } from './context.js'
import * as AppBskyActorFollow from './lexicon/types/app/bsky/graph/follow.js'
import * as ChatBskyMonologueMessage from './lexicon/types/chat/bsky/monologue/message.js'

export async function worker(signal: AbortSignal, { db }: Context) {
  const jetstream = new Jetstream({
    ws: WebSocket,
    wantedCollections: ['chat.bsky.monologue.message', 'app.bsky.graph.follow'],
  })

  jetstream.on('chat.bsky.monologue.message', async ({ did, commit }) => {
    if (
      (commit.operation === CommitType.Create ||
        commit.operation === CommitType.Update) &&
      ChatBskyMonologueMessage.isRecord(commit.record)
    ) {
      const author = did
      const { subject } = commit.record

      if (author !== subject) {
        // @TODO: Ensure mutuals
      }

      const indexedAt = new Date().toISOString()
      const createdAt = new Date(
        commit.record.createdAt || indexedAt,
      ).toISOString()

      await db
        .insertInto('message')
        .values({
          uri: commit.rkey,

          author,
          subject,

          indexedAt,
          createdAt,

          record: JSON.stringify(commit.record),
        })
        .onConflict((oc) =>
          oc.column('uri').doUpdateSet({
            author,
            subject,
            invalidatedAt: null,
          }),
        )
        .execute()
    } else if (
      commit.operation === CommitType.Delete ||
      commit.operation === CommitType.Update // New record value is invalid
    ) {
      await db
        .updateTable('message')
        .set({
          deletedAt: new Date().toISOString(),
        })
        .where('uri', '=', commit.rkey)
        .execute()
    }
  })

  jetstream.on('app.bsky.graph.follow', ({ did, commit }) => {
    const { rkey, rev } = commit

    const follower = did
    if (
      (commit.operation === CommitType.Create ||
        commit.operation === CommitType.Update) &&
      AppBskyActorFollow.isRecord(commit.record)
    ) {
      // Upsert value

      const followee = commit.record.subject

      console.log('New follow:', {
        rkey,
        follower,
        followee,
      })
    } else if (
      commit.operation === CommitType.Delete ||
      commit.operation === CommitType.Update // New record value is invalid
    ) {
      // Remove value

      console.log('Deleted follow:', {
        rkey,
        follower,
      })
    }
  })

  signal.throwIfAborted()
  signal.addEventListener('abort', () => jetstream.close(), { once: true })
  jetstream.start()
}
