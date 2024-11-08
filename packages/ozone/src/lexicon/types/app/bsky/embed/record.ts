/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'
import * as AppBskyFeedDefs from '../feed/defs'
import * as AppBskyGraphDefs from '../graph/defs'
import * as AppBskyLabelerDefs from '../labeler/defs'
import * as AppBskyActorDefs from '../actor/defs'
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs'
import * as AppBskyEmbedImages from './images'
import * as AppBskyEmbedVideo from './video'
import * as AppBskyEmbedExternal from './external'
import * as AppBskyEmbedRecordWithMedia from './recordWithMedia'

export const id = 'app.bsky.embed.record'

export interface Main {
  $type?: 'app.bsky.embed.record' | 'app.bsky.embed.record#main'
  record: ComAtprotoRepoStrongRef.Main
}

export function isMain(v: unknown): v is $Typed<Main> {
  return is$typed(v, id, 'main')
}

export function validateMain(v: unknown) {
  return lexicons.validate(`${id}#main`, v) as ValidationResult<Main>
}

export interface View {
  $type?: 'app.bsky.embed.record#view'
  record:
    | $Typed<ViewRecord>
    | $Typed<ViewNotFound>
    | $Typed<ViewBlocked>
    | $Typed<ViewDetached>
    | $Typed<AppBskyFeedDefs.GeneratorView>
    | $Typed<AppBskyGraphDefs.ListView>
    | $Typed<AppBskyLabelerDefs.LabelerView>
    | $Typed<AppBskyGraphDefs.StarterPackViewBasic>
    | $Typed<{ [k: string]: unknown }>
}

export function isView(v: unknown): v is $Typed<View> {
  return is$typed(v, id, 'view')
}

export function validateView(v: unknown) {
  return lexicons.validate(`${id}#view`, v) as ValidationResult<View>
}

export interface ViewRecord {
  $type?: 'app.bsky.embed.record#viewRecord'
  uri: string
  cid: string
  author: AppBskyActorDefs.ProfileViewBasic
  /** The record data itself. */
  value: { [_ in string]: unknown }
  labels?: ComAtprotoLabelDefs.Label[]
  replyCount?: number
  repostCount?: number
  likeCount?: number
  quoteCount?: number
  embeds?: (
    | $Typed<AppBskyEmbedImages.View>
    | $Typed<AppBskyEmbedVideo.View>
    | $Typed<AppBskyEmbedExternal.View>
    | $Typed<View>
    | $Typed<AppBskyEmbedRecordWithMedia.View>
    | $Typed<{ [k: string]: unknown }>
  )[]
  indexedAt: string
}

export function isViewRecord(v: unknown): v is $Typed<ViewRecord> {
  return is$typed(v, id, 'viewRecord')
}

export function validateViewRecord(v: unknown) {
  return lexicons.validate(
    `${id}#viewRecord`,
    v,
  ) as ValidationResult<ViewRecord>
}

export interface ViewNotFound {
  $type?: 'app.bsky.embed.record#viewNotFound'
  uri: string
  notFound: true
}

export function isViewNotFound(v: unknown): v is $Typed<ViewNotFound> {
  return is$typed(v, id, 'viewNotFound')
}

export function validateViewNotFound(v: unknown) {
  return lexicons.validate(
    `${id}#viewNotFound`,
    v,
  ) as ValidationResult<ViewNotFound>
}

export interface ViewBlocked {
  $type?: 'app.bsky.embed.record#viewBlocked'
  uri: string
  blocked: true
  author: AppBskyFeedDefs.BlockedAuthor
}

export function isViewBlocked(v: unknown): v is $Typed<ViewBlocked> {
  return is$typed(v, id, 'viewBlocked')
}

export function validateViewBlocked(v: unknown) {
  return lexicons.validate(
    `${id}#viewBlocked`,
    v,
  ) as ValidationResult<ViewBlocked>
}

export interface ViewDetached {
  $type?: 'app.bsky.embed.record#viewDetached'
  uri: string
  detached: true
}

export function isViewDetached(v: unknown): v is $Typed<ViewDetached> {
  return is$typed(v, id, 'viewDetached')
}

export function validateViewDetached(v: unknown) {
  return lexicons.validate(
    `${id}#viewDetached`,
    v,
  ) as ValidationResult<ViewDetached>
}
