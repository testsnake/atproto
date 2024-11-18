import { Server } from '../../lexicon'
import AppContext from '../../context'
import { InvalidRequestError } from '@atproto/xrpc-server'
import * as ActorDefs from '../../lexicon/types/app/bsky/actor/defs'
import { SubjectBasicView } from '../../lexicon/types/tools/ozone/history/defs'

export default function (server: Server, ctx: AppContext) {
  server.tools.ozone.history.getReportedSubjects({
    auth: ctx.authVerifier.standardOptionalOrAdminToken,
    handler: async ({ auth, params }) => {
      const access = auth.credentials
      const { limit, cursor, account, sortDirection } = params
      const db = ctx.db

      // Allow admins to check mod history for any reporter
      let viewerDid: string | null
      if (access.type === 'admin_token') {
        if (!account) {
          throw new Error('Admins must provide an account param')
        }
        viewerDid = account
      } else if (access.iss) {
        viewerDid = access.iss
      } else {
        throw new InvalidRequestError('unauthorized')
      }

      const modHistoryService = ctx.modStatusHistoryService(db)
      const modService = ctx.modService(db)
      const results = await modHistoryService.getStatuses({
        viewerDid,
        forAuthor: false,
        limit,
        cursor,
        sortDirection: sortDirection === 'asc' ? 'asc' : 'desc',
      })

      const subjects: SubjectBasicView[] = []
      const dids = new Set<string>()
      const uris = new Set<string>()

      results.statuses.forEach((item) => {
        dids.add(item.did)
        uris.add(modHistoryService.atUriFromStatus(item))
      })
      const [accountInfos, labels] = await Promise.all([
        modService.views.getAccoutInfosByDid(Array.from(dids)),
        modService.views.labels(Array.from(uris)),
      ])

      results.statuses.forEach((item) => {
        const view = modHistoryService.basicView(item)
        const accountInfo = accountInfos.get(item.did)
        const subjectProfile = accountInfo?.relatedRecords?.find(
          ActorDefs.isProfileViewBasic,
        )

        subjects.push({
          ...view,
          subjectProfile,
          labels: labels.get(view.subject),
          status: accountInfo
            ? accountInfo?.deactivatedAt
              ? 'deactivated'
              : 'active'
            : 'deleted',
        })
      })

      return {
        encoding: 'application/json',
        body: {
          subjects,
          cursor: results.cursor,
        },
      }
    },
  })
}