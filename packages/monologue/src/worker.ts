import { AtUri, jetstream } from '@atproto/jetstream'

import { Context } from './context.js'
import { schemas } from './lexicon.js'

export async function worker(signal: AbortSignal, { db }: Context) {
  for await (const event of jetstream({
    schemas,
    signal,
    wantedCollections: ['chat.bsky.monologue.message', 'app.bsky.graph.follow'],
  })) {
    if (event.kind !== 'commit') continue

    const { did, commit } = event

    if (commit.collection === 'chat.bsky.monologue.message') {
      const author = did

      if (
        (commit.operation === 'create' || commit.operation === 'update') &&
        commit.recordValid
      ) {
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
      } else {
        await db
          .updateTable('message')
          .set({
            deletedAt: new Date().toISOString(),
          })
          .where('uri', '=', commit.rkey as AtUri)
          .execute()
      }
    } else if (commit.collection === 'app.bsky.graph.follow') {
      const follower = did
      const { rkey, rev } = commit

      if (
        (commit.operation === 'create' || commit.operation === 'update') &&
        commit.recordValid
      ) {
        // Upsert value

        const followee = commit.record.subject

        console.log('New follow:', {
          rkey,
          follower,
          followee,
        })
      } else {
        // Remove value

        console.log('Deleted follow:', {
          rkey,
          follower,
        })
      }
    }
  }
}
