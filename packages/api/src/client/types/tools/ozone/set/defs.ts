/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'

export const id = 'tools.ozone.set.defs'

export interface Set {
  $type?: 'tools.ozone.set.defs#set'
  name: string
  description?: string
}

export function isSet(v: unknown): v is $Typed<Set> {
  return is$typed(v, id, 'set')
}

export function validateSet(v: unknown) {
  return lexicons.validate(`${id}#set`, v) as ValidationResult<Set>
}

export interface SetView {
  $type?: 'tools.ozone.set.defs#setView'
  name: string
  description?: string
  setSize: number
  createdAt: string
  updatedAt: string
}

export function isSetView(v: unknown): v is $Typed<SetView> {
  return is$typed(v, id, 'setView')
}

export function validateSetView(v: unknown) {
  return lexicons.validate(`${id}#setView`, v) as ValidationResult<SetView>
}
