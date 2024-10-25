import { LexiconDoc } from '@atproto/lexicon'
import {
  ProcedureId,
  InferOutput,
  InferParams,
  InferInput,
  QueryId,
} from '../../../../jetstream/dist/lexicon-infer.js'
import { IncomingMessage } from 'node:http'
import { ServerResponse } from '../../lib/http/types.js'
import { schemas } from '../../lexicon.js'

export type Lex = typeof schemas

export type Auth = { credentials: { did: string } }
export type LocalHandler<Id extends ProcedureId<Lex> | QueryId<Lex>> = Handler<
  Lex,
  Id,
  Auth
>

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
