import {
  InferInput,
  InferOutput,
  InferParams,
  ProcedureId,
  QueryId,
} from '@atproto/jetstream'

import { Schemas } from '../lexicon.js'
import { Auth } from './auth.js'
import {
  InferHandlerContext,
  InferHandler,
  InferHandlerOutput,
} from './xrpc.js'

export type IHandler<Id extends ProcedureId<Schemas> | QueryId<Schemas>> =
  InferHandler<Schemas, Id, Auth>

export type IParams<Id extends ProcedureId<Schemas> | QueryId<Schemas>> =
  InferParams<Schemas, Id>

export type IInput<Id extends ProcedureId<Schemas>> = InferInput<Schemas, Id>
export type IOutput<Id extends ProcedureId<Schemas> | QueryId<Schemas>> =
  InferOutput<Schemas, Id>

export type IHandlerOutput<Id extends ProcedureId<Schemas> | QueryId<Schemas>> =
  InferHandlerOutput<Schemas, Id>

export type IRecCtx<Id extends ProcedureId<Schemas> | QueryId<Schemas>> =
  InferHandlerContext<Schemas, Id, Auth>
