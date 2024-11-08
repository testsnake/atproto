/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import * as AppBskyEmbedRecord from './record'
import * as AppBskyEmbedImages from './images'
import * as AppBskyEmbedVideo from './video'
import * as AppBskyEmbedExternal from './external'

export const id = 'app.bsky.embed.recordWithMedia'

export interface Main {
  $type?:
    | 'app.bsky.embed.recordWithMedia'
    | 'app.bsky.embed.recordWithMedia#main'
  record: AppBskyEmbedRecord.Main
  media:
    | $Typed<AppBskyEmbedImages.Main>
    | $Typed<AppBskyEmbedVideo.Main>
    | $Typed<AppBskyEmbedExternal.Main>
    | $Typed<{ [k: string]: unknown }>
}

export function isMain(v: unknown): v is $Typed<Main> {
  return is$typed(v, id, 'main')
}

export function validateMain(v: unknown) {
  return lexicons.validate(`${id}#main`, v) as ValidationResult<Main>
}

export interface View {
  $type?: 'app.bsky.embed.recordWithMedia#view'
  record: AppBskyEmbedRecord.View
  media:
    | $Typed<AppBskyEmbedImages.View>
    | $Typed<AppBskyEmbedVideo.View>
    | $Typed<AppBskyEmbedExternal.View>
    | $Typed<{ [k: string]: unknown }>
}

export function isView(v: unknown): v is $Typed<View> {
  return is$typed(v, id, 'view')
}

export function validateView(v: unknown) {
  return lexicons.validate(`${id}#view`, v) as ValidationResult<View>
}
