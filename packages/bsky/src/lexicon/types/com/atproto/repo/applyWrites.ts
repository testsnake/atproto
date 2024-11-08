/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server'
import * as ComAtprotoRepoDefs from './defs'

export const id = 'com.atproto.repo.applyWrites'

export interface QueryParams {}

export interface InputSchema {
  /** The handle or DID of the repo (aka, current account). */
  repo: string
  /** Can be set to 'false' to skip Lexicon schema validation of record data across all operations, 'true' to require it, or leave unset to validate only for known Lexicons. */
  validate?: boolean
  writes: ($Typed<Create> | $Typed<Update> | $Typed<Delete>)[]
  /** If provided, the entire operation will fail if the current repo commit CID does not match this value. Used to prevent conflicting repo mutations. */
  swapCommit?: string
}

export interface OutputSchema {
  commit?: ComAtprotoRepoDefs.CommitMeta
  results?: (
    | $Typed<CreateResult>
    | $Typed<UpdateResult>
    | $Typed<DeleteResult>
  )[]
}

export interface HandlerInput {
  encoding: 'application/json'
  body: InputSchema
}

export interface HandlerSuccess {
  encoding: 'application/json'
  body: OutputSchema
  headers?: { [key: string]: string }
}

export interface HandlerError {
  status: number
  message?: string
  error?: 'InvalidSwap'
}

export type HandlerOutput = HandlerError | HandlerSuccess | HandlerPipeThrough
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
  auth: HA
  params: QueryParams
  input: HandlerInput
  req: express.Request
  res: express.Response
}
export type Handler<HA extends HandlerAuth = never> = (
  ctx: HandlerReqCtx<HA>,
) => Promise<HandlerOutput> | HandlerOutput

/** Operation which creates a new record. */
export interface Create {
  $type?: 'com.atproto.repo.applyWrites#create'
  collection: string
  rkey?: string
  value: { [_ in string]: unknown }
}

export function isCreate(v: unknown): v is $Typed<Create> {
  return is$typed(v, id, 'create')
}

export function validateCreate(v: unknown) {
  return lexicons.validate(`${id}#create`, v) as ValidationResult<Create>
}

/** Operation which updates an existing record. */
export interface Update {
  $type?: 'com.atproto.repo.applyWrites#update'
  collection: string
  rkey: string
  value: { [_ in string]: unknown }
}

export function isUpdate(v: unknown): v is $Typed<Update> {
  return is$typed(v, id, 'update')
}

export function validateUpdate(v: unknown) {
  return lexicons.validate(`${id}#update`, v) as ValidationResult<Update>
}

/** Operation which deletes an existing record. */
export interface Delete {
  $type?: 'com.atproto.repo.applyWrites#delete'
  collection: string
  rkey: string
}

export function isDelete(v: unknown): v is $Typed<Delete> {
  return is$typed(v, id, 'delete')
}

export function validateDelete(v: unknown) {
  return lexicons.validate(`${id}#delete`, v) as ValidationResult<Delete>
}

export interface CreateResult {
  $type?: 'com.atproto.repo.applyWrites#createResult'
  uri: string
  cid: string
  validationStatus?: 'valid' | 'unknown' | (string & {})
}

export function isCreateResult(v: unknown): v is $Typed<CreateResult> {
  return is$typed(v, id, 'createResult')
}

export function validateCreateResult(v: unknown) {
  return lexicons.validate(
    `${id}#createResult`,
    v,
  ) as ValidationResult<CreateResult>
}

export interface UpdateResult {
  $type?: 'com.atproto.repo.applyWrites#updateResult'
  uri: string
  cid: string
  validationStatus?: 'valid' | 'unknown' | (string & {})
}

export function isUpdateResult(v: unknown): v is $Typed<UpdateResult> {
  return is$typed(v, id, 'updateResult')
}

export function validateUpdateResult(v: unknown) {
  return lexicons.validate(
    `${id}#updateResult`,
    v,
  ) as ValidationResult<UpdateResult>
}

export interface DeleteResult {
  $type?: 'com.atproto.repo.applyWrites#deleteResult'
}

export function isDeleteResult(v: unknown): v is $Typed<DeleteResult> {
  return is$typed(v, id, 'deleteResult')
}

export function validateDeleteResult(v: unknown) {
  return lexicons.validate(
    `${id}#deleteResult`,
    v,
  ) as ValidationResult<DeleteResult>
}
