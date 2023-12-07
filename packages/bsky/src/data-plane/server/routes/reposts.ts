import { ServiceImpl } from '@connectrpc/connect'
import { Service } from '../../gen/bsky_connect'
import { Database } from '../../../db'
import { TimeCidKeyset, paginate } from '../../../db/pagination'
import { keyBy } from '@atproto/common'

export default (db: Database): Partial<ServiceImpl<typeof Service>> => ({
  async getRepostsBySubject(req) {
    const { subjectUri, cursor, limit } = req
    const { ref } = db.db.dynamic

    let builder = db.db
      .selectFrom('repost')
      .where('repost.subject', '=', subjectUri)
      .selectAll('repost')

    const keyset = new TimeCidKeyset(ref('repost.sortAt'), ref('repost.cid'))
    builder = paginate(builder, {
      limit,
      cursor,
      keyset,
    })

    const reposts = await builder.execute()

    return {
      uris: reposts.map((l) => l.uri),
      cursor: keyset.packFromResult(reposts),
    }
  },

  async getRepostsByActorAndSubjects(req) {
    const { actorDid, subjectUris } = req
    if (subjectUris.length === 0) {
      return { uris: [] }
    }
    const res = await db.db
      .selectFrom('repost')
      .where('creator', '=', actorDid)
      .where('subject', 'in', subjectUris)
      .selectAll()
      .execute()
    const bySubject = keyBy(res, 'subject')
    const uris = req.subjectUris.map((uri) => bySubject[uri]?.uri)
    return { uris }
  },

  async getActorReposts(req) {
    const { actorDid, limit, cursor } = req
    const { ref } = db.db.dynamic

    let builder = db.db
      .selectFrom('repost')
      .where('repost.creator', '=', actorDid)
      .selectAll()

    const keyset = new TimeCidKeyset(ref('repost.sortAt'), ref('repost.cid'))

    builder = paginate(builder, {
      limit,
      cursor,
      keyset,
    })

    const reposts = await builder.execute()

    return {
      uris: reposts.map((l) => l.uri),
      cursor: keyset.packFromResult(reposts),
    }
  },

  async getRepostCounts(req) {
    if (req.uris.length === 0) {
      return { counts: [] }
    }
    const res = await db.db
      .selectFrom('post_agg')
      .where('uri', 'in', req.uris)
      .selectAll()
      .execute()
    const byUri = keyBy(res, 'uri')
    const counts = req.uris.map((uri) => byUri[uri]?.repostCount ?? 0)
    return { counts }
  },
})
