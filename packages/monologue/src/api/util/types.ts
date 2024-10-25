import { LexiconDoc } from '@atproto/lexicon'
import {
  ProcedureId,
  InferOutput,
  InferParams,
  InferInput,
  QueryId,
} from '@atproto/jetstream'
import { IncomingMessage } from 'node:http'
import { ServerResponse } from '../../lib/http/types.js'
import { Schemas } from '../../lexicon.js'

export type Auth = { credentials: { did: string } }
export type IHandler<Id extends ProcedureId<Schemas> | QueryId<Schemas>> =
  Handler<Schemas, Id, Auth>

export type HandlerReqCtx<
  L extends readonly LexiconDoc[],
  Id extends ProcedureId<L> | QueryId<L>,
  Auth = never,
> =
  Id extends ProcedureId<L>
    ? {
        req: IncomingMessage
        res: ServerResponse
        params: InferParams<L, Id>
        input: InferInput<L, Id>
        auth: Auth
      }
    : {
        req: IncomingMessage
        res: ServerResponse
        params: InferParams<L, Id>
        auth: Auth
      }

export type HandlerOutput<
  L extends readonly LexiconDoc[],
  Id extends ProcedureId<L> | QueryId<L>,
> =
  InferOutput<L, Id> extends undefined
    ? void
    : {
        encoding: 'application/json'
        body: InferOutput<L, Id>
      }

export type Handler<
  L extends readonly LexiconDoc[],
  Id extends ProcedureId<L> | QueryId<L>,
  Auth = never,
> = (ctx: HandlerReqCtx<L, Id, Auth>) => PromiseLike<HandlerOutput<L, Id>>
