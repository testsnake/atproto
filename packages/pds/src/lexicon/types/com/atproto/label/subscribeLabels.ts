/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { HandlerAuth, ErrorFrame } from '@atproto/xrpc-server'
import { IncomingMessage } from 'http'
import * as ComAtprotoLabelDefs from './defs'

export const id = 'com.atproto.label.subscribeLabels'

export interface QueryParams {
  /** The last known event seq number to backfill from. */
  cursor?: number
}

export type OutputSchema =
  | $Typed<Labels>
  | $Typed<Info>
  | $Typed<{ [k: string]: unknown }>
export type HandlerError = ErrorFrame<'FutureCursor'>
export type HandlerOutput = HandlerError | OutputSchema
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
  auth: HA
  params: QueryParams
  req: IncomingMessage
  signal: AbortSignal
}
export type Handler<HA extends HandlerAuth = never> = (
  ctx: HandlerReqCtx<HA>,
) => AsyncIterable<HandlerOutput>

export interface Labels {
  $type?: 'com.atproto.label.subscribeLabels#labels'
  seq: number
  labels: ComAtprotoLabelDefs.Label[]
}

export function isLabels(v: unknown): v is $Typed<Labels> {
  return is$typed(v, id, 'labels')
}

export function validateLabels(v: unknown) {
  return lexicons.validate(`${id}#labels`, v) as ValidationResult<Labels>
}

export interface Info {
  $type?: 'com.atproto.label.subscribeLabels#info'
  name: 'OutdatedCursor' | (string & {})
  message?: string
}

export function isInfo(v: unknown): v is $Typed<Info> {
  return is$typed(v, id, 'info')
}

export function validateInfo(v: unknown) {
  return lexicons.validate(`${id}#info`, v) as ValidationResult<Info>
}
