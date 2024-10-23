/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { lexicons } from '../../../../lexicons.js'
import { isObj, hasProp } from '../../../../util.js'
import { CID } from 'multiformats/cid'
import * as AppBskyActorDefs from '../../../app/bsky/actor/defs.js'
import * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet.js'
import * as AppBskyEmbedRecord from '../../../app/bsky/embed/record.js'

export interface MonologueView {
  owner?: AppBskyActorDefs.ProfileViewBasic
  id: AppBskyActorDefs.ProfileViewBasic
  rev: string
  muted: boolean
  unreadCount: number
  lastRead?: string
  [k: string]: unknown
}

export function isMonologueView(v: unknown): v is MonologueView {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'chat.bsky.monologue.defs#monologueView'
  )
}

export function validateMonologueView(v: unknown): ValidationResult {
  return lexicons.validate('chat.bsky.monologue.defs#monologueView', v)
}

export interface MessageView {
  id: string
  rev: string
  sender: string
  text: string
  /** Annotations of text (mentions, URLs, hashtags, etc) */
  facets?: AppBskyRichtextFacet.Main[]
  embed?: AppBskyEmbedRecord.View | { $type: string; [k: string]: unknown }
  [k: string]: unknown
}

export function isMessageView(v: unknown): v is MessageView {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'chat.bsky.monologue.defs#messageView'
  )
}

export function validateMessageView(v: unknown): ValidationResult {
  return lexicons.validate('chat.bsky.monologue.defs#messageView', v)
}
