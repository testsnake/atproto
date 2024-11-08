/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'

export const id = 'app.bsky.embed.external'

/** A representation of some externally linked content (eg, a URL and 'card'), embedded in a Bluesky record (eg, a post). */
export interface Main {
  $type?: 'app.bsky.embed.external' | 'app.bsky.embed.external#main'
  external: External
}

export function isMain(v: unknown): v is $Typed<Main> {
  return is$typed(v, id, 'main')
}

export function validateMain(v: unknown) {
  return lexicons.validate(`${id}#main`, v) as ValidationResult<Main>
}

export interface External {
  $type?: 'app.bsky.embed.external#external'
  uri: string
  title: string
  description: string
  thumb?: BlobRef
}

export function isExternal(v: unknown): v is $Typed<External> {
  return is$typed(v, id, 'external')
}

export function validateExternal(v: unknown) {
  return lexicons.validate(`${id}#external`, v) as ValidationResult<External>
}

export interface View {
  $type?: 'app.bsky.embed.external#view'
  external: ViewExternal
}

export function isView(v: unknown): v is $Typed<View> {
  return is$typed(v, id, 'view')
}

export function validateView(v: unknown) {
  return lexicons.validate(`${id}#view`, v) as ValidationResult<View>
}

export interface ViewExternal {
  $type?: 'app.bsky.embed.external#viewExternal'
  uri: string
  title: string
  description: string
  thumb?: string
}

export function isViewExternal(v: unknown): v is $Typed<ViewExternal> {
  return is$typed(v, id, 'viewExternal')
}

export function validateViewExternal(v: unknown) {
  return lexicons.validate(
    `${id}#viewExternal`,
    v,
  ) as ValidationResult<ViewExternal>
}
