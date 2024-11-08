/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'

export const id = 'com.atproto.server.defs'

export interface InviteCode {
  $type?: 'com.atproto.server.defs#inviteCode'
  code: string
  available: number
  disabled: boolean
  forAccount: string
  createdBy: string
  createdAt: string
  uses: InviteCodeUse[]
}

export function isInviteCode(v: unknown): v is $Typed<InviteCode> {
  return is$typed(v, id, 'inviteCode')
}

export function validateInviteCode(v: unknown) {
  return lexicons.validate(
    `${id}#inviteCode`,
    v,
  ) as ValidationResult<InviteCode>
}

export interface InviteCodeUse {
  $type?: 'com.atproto.server.defs#inviteCodeUse'
  usedBy: string
  usedAt: string
}

export function isInviteCodeUse(v: unknown): v is $Typed<InviteCodeUse> {
  return is$typed(v, id, 'inviteCodeUse')
}

export function validateInviteCodeUse(v: unknown) {
  return lexicons.validate(
    `${id}#inviteCodeUse`,
    v,
  ) as ValidationResult<InviteCodeUse>
}
