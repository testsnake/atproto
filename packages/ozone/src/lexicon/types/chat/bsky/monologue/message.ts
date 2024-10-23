/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { lexicons } from '../../../../lexicons.js'
import { isObj, hasProp } from '../../../../util.js'
import { CID } from 'multiformats/cid'
import * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet.js'
import * as AppBskyEmbedRecord from '../../../app/bsky/embed/record.js'

export interface Record {
  recipient: string
  text: string
  /** Annotations of text (mentions, URLs, hashtags, etc) */
  facets?: AppBskyRichtextFacet.Main[]
  embed?: AppBskyEmbedRecord.View | { $type: string; [k: string]: unknown }
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'chat.bsky.monologue.message#main' ||
      v.$type === 'chat.bsky.monologue.message')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('chat.bsky.monologue.message#main', v)
}
