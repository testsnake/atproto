/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'

export const id = 'chat.bsky.moderation.getActorMetadata'

export interface QueryParams {
  actor: string
}

export type InputSchema = undefined

export interface OutputSchema {
  day: Metadata
  month: Metadata
  all: Metadata
}

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}

export interface Metadata {
  $type?: 'chat.bsky.moderation.getActorMetadata#metadata'
  messagesSent: number
  messagesReceived: number
  convos: number
  convosStarted: number
}

export function isMetadata(v: unknown): v is $Typed<Metadata> {
  return is$typed(v, id, 'metadata')
}

export function validateMetadata(v: unknown) {
  return lexicons.validate(`${id}#metadata`, v) as ValidationResult<Metadata>
}
