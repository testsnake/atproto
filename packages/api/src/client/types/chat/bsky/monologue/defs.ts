/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util.js'
import { lexicons } from '../../../../lexicons.js'
import { CID } from 'multiformats/cid'
import * as AppBskyActorDefs from '../../../app/bsky/actor/defs.js'
import * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet.js'
import * as AppBskyEmbedRecord from '../../../app/bsky/embed/record.js'

export interface MonologueViewSubject {
  did: string
  [k: string]: unknown
}

export function isMonologueViewSubject(v: unknown): v is MonologueViewSubject {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'chat.bsky.monologue.defs#monologueViewSubject'
  )
}

export function validateMonologueViewSubject(v: unknown): ValidationResult {
  return lexicons.validate('chat.bsky.monologue.defs#monologueViewSubject', v)
}

export interface MonologueView {
  subject:
    | AppBskyActorDefs.ProfileViewBasic
    | MonologueViewSubject
    | { $type: string; [k: string]: unknown }
  muted: boolean
  unreadCount: number
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

export interface MessageViewAuthor {
  did: string
  [k: string]: unknown
}

export function isMessageViewAuthor(v: unknown): v is MessageViewAuthor {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'chat.bsky.monologue.defs#messageViewAuthor'
  )
}

export function validateMessageViewAuthor(v: unknown): ValidationResult {
  return lexicons.validate('chat.bsky.monologue.defs#messageViewAuthor', v)
}

export interface MessageView {
  id: string
  author: MessageViewAuthor
  timestamp: string
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

export interface DeletedMessageView {
  id: string
  author: MessageViewAuthor
  timestamp: string
  [k: string]: unknown
}

export function isDeletedMessageView(v: unknown): v is DeletedMessageView {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'chat.bsky.monologue.defs#deletedMessageView'
  )
}

export function validateDeletedMessageView(v: unknown): ValidationResult {
  return lexicons.validate('chat.bsky.monologue.defs#deletedMessageView', v)
}
