/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'

export const id = 'app.bsky.graph.follow'

export interface Record {
  $type?: 'app.bsky.graph.follow' | 'app.bsky.graph.follow#main'
  subject: string
  createdAt: string
  [k: string]: unknown
}

export function isRecord(v: unknown): v is $Typed<Record> {
  return is$typed(v, id, 'main')
}

export function validateRecord(v: unknown) {
  return lexicons.validate(`${id}#main`, v) as ValidationResult<Record>
}
