/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import * as ComAtprotoServerDefs from '../server/defs'

export const id = 'com.atproto.admin.defs'

export interface StatusAttr {
  $type?: 'com.atproto.admin.defs#statusAttr'
  applied: boolean
  ref?: string
}

export function isStatusAttr(v: unknown): v is $Typed<StatusAttr> {
  return is$typed(v, id, 'statusAttr')
}

export function validateStatusAttr(v: unknown) {
  return lexicons.validate(
    `${id}#statusAttr`,
    v,
  ) as ValidationResult<StatusAttr>
}

export interface AccountView {
  $type?: 'com.atproto.admin.defs#accountView'
  did: string
  handle: string
  email?: string
  relatedRecords?: { [_ in string]: unknown }[]
  indexedAt: string
  invitedBy?: ComAtprotoServerDefs.InviteCode
  invites?: ComAtprotoServerDefs.InviteCode[]
  invitesDisabled?: boolean
  emailConfirmedAt?: string
  inviteNote?: string
  deactivatedAt?: string
  threatSignatures?: ThreatSignature[]
}

export function isAccountView(v: unknown): v is $Typed<AccountView> {
  return is$typed(v, id, 'accountView')
}

export function validateAccountView(v: unknown) {
  return lexicons.validate(
    `${id}#accountView`,
    v,
  ) as ValidationResult<AccountView>
}

export interface RepoRef {
  $type?: 'com.atproto.admin.defs#repoRef'
  did: string
}

export function isRepoRef(v: unknown): v is $Typed<RepoRef> {
  return is$typed(v, id, 'repoRef')
}

export function validateRepoRef(v: unknown) {
  return lexicons.validate(`${id}#repoRef`, v) as ValidationResult<RepoRef>
}

export interface RepoBlobRef {
  $type?: 'com.atproto.admin.defs#repoBlobRef'
  did: string
  cid: string
  recordUri?: string
}

export function isRepoBlobRef(v: unknown): v is $Typed<RepoBlobRef> {
  return is$typed(v, id, 'repoBlobRef')
}

export function validateRepoBlobRef(v: unknown) {
  return lexicons.validate(
    `${id}#repoBlobRef`,
    v,
  ) as ValidationResult<RepoBlobRef>
}

export interface ThreatSignature {
  $type?: 'com.atproto.admin.defs#threatSignature'
  property: string
  value: string
}

export function isThreatSignature(v: unknown): v is $Typed<ThreatSignature> {
  return is$typed(v, id, 'threatSignature')
}

export function validateThreatSignature(v: unknown) {
  return lexicons.validate(
    `${id}#threatSignature`,
    v,
  ) as ValidationResult<ThreatSignature>
}
