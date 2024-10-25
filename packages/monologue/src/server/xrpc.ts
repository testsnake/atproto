import {
  InferInput,
  InferOutput,
  InferParams,
  ProcedureId,
  QueryId,
} from '@atproto/jetstream'
import { LexiconDoc } from '@atproto/lexicon'
import { IncomingMessage, ServerResponse } from 'node:http'

// @TODO: The following should be defined in @atproto/xrpc-server

export type InferHandlerContext<
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

export type InferHandlerOutput<
  L extends readonly LexiconDoc[],
  Id extends ProcedureId<L> | QueryId<L>,
> =
  InferOutput<L, Id> extends undefined
    ? void
    : {
        encoding: 'application/json'
        body: InferOutput<L, Id>
      }

export type InferHandler<
  L extends readonly LexiconDoc[],
  Id extends ProcedureId<L> | QueryId<L>,
  Auth = never,
> = (
  ctx: InferHandlerContext<L, Id, Auth>,
) => PromiseLike<InferHandlerOutput<L, Id>> | InferHandlerOutput<L, Id>
