/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'

export const id = 'app.bsky.feed.describeFeedGenerator'

export interface QueryParams {}

export type InputSchema = undefined

export interface OutputSchema {
  did: string
  feeds: Feed[]
  links?: Links
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

export interface Feed {
  $type?: 'app.bsky.feed.describeFeedGenerator#feed'
  uri: string
}

export function isFeed(v: unknown): v is $Typed<Feed> {
  return is$typed(v, id, 'feed')
}

export function validateFeed(v: unknown) {
  return lexicons.validate(`${id}#feed`, v) as ValidationResult<Feed>
}

export interface Links {
  $type?: 'app.bsky.feed.describeFeedGenerator#links'
  privacyPolicy?: string
  termsOfService?: string
}

export function isLinks(v: unknown): v is $Typed<Links> {
  return is$typed(v, id, 'links')
}

export function validateLinks(v: unknown) {
  return lexicons.validate(`${id}#links`, v) as ValidationResult<Links>
}
