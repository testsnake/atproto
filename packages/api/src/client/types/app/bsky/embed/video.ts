/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import * as AppBskyEmbedDefs from './defs'

export const id = 'app.bsky.embed.video'

export interface Main {
  $type?: 'app.bsky.embed.video' | 'app.bsky.embed.video#main'
  video: BlobRef
  captions?: Caption[]
  /** Alt text description of the video, for accessibility. */
  alt?: string
  aspectRatio?: AppBskyEmbedDefs.AspectRatio
}

export function isMain(v: unknown): v is $Typed<Main> {
  return is$typed(v, id, 'main')
}

export function validateMain(v: unknown) {
  return lexicons.validate(`${id}#main`, v) as ValidationResult<Main>
}

export interface Caption {
  $type?: 'app.bsky.embed.video#caption'
  lang: string
  file: BlobRef
}

export function isCaption(v: unknown): v is $Typed<Caption> {
  return is$typed(v, id, 'caption')
}

export function validateCaption(v: unknown) {
  return lexicons.validate(`${id}#caption`, v) as ValidationResult<Caption>
}

export interface View {
  $type?: 'app.bsky.embed.video#view'
  cid: string
  playlist: string
  thumbnail?: string
  alt?: string
  aspectRatio?: AppBskyEmbedDefs.AspectRatio
}

export function isView(v: unknown): v is $Typed<View> {
  return is$typed(v, id, 'view')
}

export function validateView(v: unknown) {
  return lexicons.validate(`${id}#view`, v) as ValidationResult<View>
}
