/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'

export const id = 'com.atproto.repo.defs'

export interface CommitMeta {
  $type?: 'com.atproto.repo.defs#commitMeta'
  cid: string
  rev: string
}

export function isCommitMeta(v: unknown): v is $Typed<CommitMeta> {
  return is$typed(v, id, 'commitMeta')
}

export function validateCommitMeta(v: unknown) {
  return lexicons.validate(
    `${id}#commitMeta`,
    v,
  ) as ValidationResult<CommitMeta>
}
