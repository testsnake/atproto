/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'

export const id = 'app.bsky.feed.threadgate'

export interface Record {
  $type?: 'app.bsky.feed.threadgate' | 'app.bsky.feed.threadgate#main'
  /** Reference (AT-URI) to the post record. */
  post: string
  allow?: (
    | $Typed<MentionRule>
    | $Typed<FollowingRule>
    | $Typed<ListRule>
    | $Typed<{ [k: string]: unknown }>
  )[]
  createdAt: string
  /** List of hidden reply URIs. */
  hiddenReplies?: string[]
  [k: string]: unknown
}

export function isRecord(v: unknown): v is $Typed<Record> {
  return is$typed(v, id, 'main')
}

export function validateRecord(v: unknown) {
  return lexicons.validate(`${id}#main`, v) as ValidationResult<Record>
}

/** Allow replies from actors mentioned in your post. */
export interface MentionRule {
  $type?: 'app.bsky.feed.threadgate#mentionRule'
}

export function isMentionRule(v: unknown): v is $Typed<MentionRule> {
  return is$typed(v, id, 'mentionRule')
}

export function validateMentionRule(v: unknown) {
  return lexicons.validate(
    `${id}#mentionRule`,
    v,
  ) as ValidationResult<MentionRule>
}

/** Allow replies from actors you follow. */
export interface FollowingRule {
  $type?: 'app.bsky.feed.threadgate#followingRule'
}

export function isFollowingRule(v: unknown): v is $Typed<FollowingRule> {
  return is$typed(v, id, 'followingRule')
}

export function validateFollowingRule(v: unknown) {
  return lexicons.validate(
    `${id}#followingRule`,
    v,
  ) as ValidationResult<FollowingRule>
}

/** Allow replies from actors on a list. */
export interface ListRule {
  $type?: 'app.bsky.feed.threadgate#listRule'
  list: string
}

export function isListRule(v: unknown): v is $Typed<ListRule> {
  return is$typed(v, id, 'listRule')
}

export function validateListRule(v: unknown) {
  return lexicons.validate(`${id}#listRule`, v) as ValidationResult<ListRule>
}
