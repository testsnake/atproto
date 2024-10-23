import { CommitType, Jetstream } from '@skyware/jetstream'
import WebSocket from 'ws'

import { Context } from './context.js'
import * as AppBskyActorFollow from './lexicon/types/app/bsky/graph/follow.js'
import * as ChatBskyMonologueMessage from './lexicon/types/chat/bsky/monologue/message.js'

export async function startMonologueWorker(
  signal: AbortSignal,
  context: Context,
) {
  const jetstream = new Jetstream({
    ws: WebSocket,
    wantedCollections: ['chat.bsky.monologue.message', 'app.bsky.graph.follow'],
  })

  jetstream.on('chat.bsky.monologue.message', ({ did, commit }) => {
    if (
      (commit.operation === CommitType.Create ||
        commit.operation === CommitType.Update) &&
      ChatBskyMonologueMessage.isRecord(commit.record)
    ) {
      // Upsert value
    } else if (
      commit.operation === CommitType.Delete ||
      commit.operation === CommitType.Update // New record value is invalid
    ) {
      // Remove value
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
