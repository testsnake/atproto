/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import * as ComAtprotoLabelDefs from './defs'

export const id = 'com.atproto.label.subscribeLabels'

export interface Labels {
  $type?: 'com.atproto.label.subscribeLabels#labels'
  seq: number
  labels: ComAtprotoLabelDefs.Label[]
}

export function isLabels(v: unknown): v is $Typed<Labels> {
  return is$typed(v, id, 'labels')
}

export function validateLabels(v: unknown) {
  return lexicons.validate(`${id}#labels`, v) as ValidationResult<Labels>
}

export interface Info {
  $type?: 'com.atproto.label.subscribeLabels#info'
  name: 'OutdatedCursor' | (string & {})
  message?: string
}

export function isInfo(v: unknown): v is $Typed<Info> {
  return is$typed(v, id, 'info')
}

export function validateInfo(v: unknown) {
  return lexicons.validate(`${id}#info`, v) as ValidationResult<Info>
}
