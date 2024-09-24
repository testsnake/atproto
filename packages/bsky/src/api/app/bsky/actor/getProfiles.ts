import { mapDefined } from '@atproto/common'

import AppContext from '../../../../context'
import {
  HydrateCtx,
  HydrationState,
  Hydrator,
} from '../../../../hydration/hydrator'
import { Server } from '../../../../lexicon/index'
import { ids } from '../../../../lexicon/lexicons'
import { QueryParams } from '../../../../lexicon/types/app/bsky/actor/getProfiles'
import { noRules } from '../../../../pipeline'
import { Views } from '../../../../views/index'
import { resHeaders } from '../../../util'

export default function (server: Server, ctx: AppContext) {
  const getProfile = ctx.createPipeline(
    skeleton,
    hydration,
    noRules,
    presentation,
  )
  server.app.bsky.actor.getProfiles({
    auth: ctx.authVerifier.standardOptionalParameterized({
      lxmCheck: (method) => {
        if (!method) return false
        return (
          method === ids.AppBskyActorGetProfiles ||
          method.startsWith('chat.bsky.')
        )
      },
    }),
    handler: async ({ auth, params, req }) => {
      const viewer = auth.credentials.iss
      const labelers = ctx.reqLabelers(req)
      const hydrateCtx = await ctx.hydrator.createContext({ viewer, labelers })

      const result = await getProfile(hydrateCtx, params)

      const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer)

      return {
        encoding: 'application/json',
        body: result,
        headers: resHeaders({
          repoRev,
          labelers: hydrateCtx.labelers,
        }),
      }
    },
  })
}

const skeleton = async (input: {
  ctx: Context
  params: Params
}): Promise<SkeletonState> => {
  const { ctx, params } = input
  const dids = await ctx.hydrator.actor.getDidsDefined(params.actors)
  return { dids }
}

const hydration = async (input: {
  ctx: Context
  params: Params
  skeleton: SkeletonState
}) => {
  const { ctx, skeleton } = input
  return ctx.hydrator.hydrateProfilesDetailed(skeleton.dids, ctx.hydrateCtx)
}

const presentation = (input: {
  ctx: Context
  params: Params
  skeleton: SkeletonState
  hydration: HydrationState
}) => {
  const { ctx, skeleton, hydration } = input
  const profiles = mapDefined(skeleton.dids, (did) =>
    ctx.views.profileDetailed(did, hydration),
  )
  return { profiles }
}

type Context = {
  hydrator: Hydrator
  views: Views
  hydrateCtx: HydrateCtx
}

type Params = QueryParams

type SkeletonState = { dids: string[] }
