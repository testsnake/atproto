/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import * as AppBskyRichtextFacet from '../richtext/facet'
import * as AppBskyEmbedImages from '../embed/images'
import * as AppBskyEmbedVideo from '../embed/video'
import * as AppBskyEmbedExternal from '../embed/external'
import * as AppBskyEmbedRecord from '../embed/record'
import * as AppBskyEmbedRecordWithMedia from '../embed/recordWithMedia'
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'

export const id = 'app.bsky.feed.post'

export interface Record {
  $type?: 'app.bsky.feed.post' | 'app.bsky.feed.post#main'
  /** The primary post content. May be an empty string, if there are embeds. */
  text: string
  /** DEPRECATED: replaced by app.bsky.richtext.facet. */
  entities?: Entity[]
  /** Annotations of text (mentions, URLs, hashtags, etc) */
  facets?: AppBskyRichtextFacet.Main[]
  reply?: ReplyRef
  embed?:
    | $Typed<AppBskyEmbedImages.Main>
    | $Typed<AppBskyEmbedVideo.Main>
    | $Typed<AppBskyEmbedExternal.Main>
    | $Typed<AppBskyEmbedRecord.Main>
    | $Typed<AppBskyEmbedRecordWithMedia.Main>
    | $Typed<{ [k: string]: unknown }>
  /** Indicates human language of post primary text content. */
  langs?: string[]
  labels?:
    | $Typed<ComAtprotoLabelDefs.SelfLabels>
    | $Typed<{ [k: string]: unknown }>
  /** Additional hashtags, in addition to any included in post text and facets. */
  tags?: string[]
  /** Client-declared timestamp when this post was originally created. */
  createdAt: string
  [k: string]: unknown
}

export function isRecord(v: unknown): v is $Typed<Record> {
  return is$typed(v, id, 'main')
}

export function validateRecord(v: unknown) {
  return lexicons.validate(`${id}#main`, v) as ValidationResult<Record>
}

export interface ReplyRef {
  $type?: 'app.bsky.feed.post#replyRef'
  root: ComAtprotoRepoStrongRef.Main
  parent: ComAtprotoRepoStrongRef.Main
}

export function isReplyRef(v: unknown): v is $Typed<ReplyRef> {
  return is$typed(v, id, 'replyRef')
}

export function validateReplyRef(v: unknown) {
  return lexicons.validate(`${id}#replyRef`, v) as ValidationResult<ReplyRef>
}

/** Deprecated: use facets instead. */
export interface Entity {
  $type?: 'app.bsky.feed.post#entity'
  index: TextSlice
  /** Expected values are 'mention' and 'link'. */
  type: string
  value: string
}

export function isEntity(v: unknown): v is $Typed<Entity> {
  return is$typed(v, id, 'entity')
}

export function validateEntity(v: unknown) {
  return lexicons.validate(`${id}#entity`, v) as ValidationResult<Entity>
}

/** Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings. */
export interface TextSlice {
  $type?: 'app.bsky.feed.post#textSlice'
  start: number
  end: number
}

export function isTextSlice(v: unknown): v is $Typed<TextSlice> {
  return is$typed(v, id, 'textSlice')
}

export function validateTextSlice(v: unknown) {
  return lexicons.validate(`${id}#textSlice`, v) as ValidationResult<TextSlice>
}
