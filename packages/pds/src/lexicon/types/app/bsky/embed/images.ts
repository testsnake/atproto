/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import * as AppBskyEmbedDefs from './defs'

export const id = 'app.bsky.embed.images'

export interface Main {
  $type?: 'app.bsky.embed.images' | 'app.bsky.embed.images#main'
  images: Image[]
}

export function isMain(v: unknown): v is $Typed<Main> {
  return is$typed(v, id, 'main')
}

export function validateMain(v: unknown) {
  return lexicons.validate(`${id}#main`, v) as ValidationResult<Main>
}

export interface Image {
  $type?: 'app.bsky.embed.images#image'
  image: BlobRef
  /** Alt text description of the image, for accessibility. */
  alt: string
  aspectRatio?: AppBskyEmbedDefs.AspectRatio
}

export function isImage(v: unknown): v is $Typed<Image> {
  return is$typed(v, id, 'image')
}

export function validateImage(v: unknown) {
  return lexicons.validate(`${id}#image`, v) as ValidationResult<Image>
}

export interface View {
  $type?: 'app.bsky.embed.images#view'
  images: ViewImage[]
}

export function isView(v: unknown): v is $Typed<View> {
  return is$typed(v, id, 'view')
}

export function validateView(v: unknown) {
  return lexicons.validate(`${id}#view`, v) as ValidationResult<View>
}

export interface ViewImage {
  $type?: 'app.bsky.embed.images#viewImage'
  /** Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View. */
  thumb: string
  /** Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View. */
  fullsize: string
  /** Alt text description of the image, for accessibility. */
  alt: string
  aspectRatio?: AppBskyEmbedDefs.AspectRatio
}

export function isViewImage(v: unknown): v is $Typed<ViewImage> {
  return is$typed(v, id, 'viewImage')
}

export function validateViewImage(v: unknown) {
  return lexicons.validate(`${id}#viewImage`, v) as ValidationResult<ViewImage>
}
