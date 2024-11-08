/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet'
import * as AppBskyEmbedRecord from '../../../app/bsky/embed/record'
import * as ChatBskyActorDefs from '../actor/defs'

export const id = 'chat.bsky.convo.defs'

export interface MessageRef {
  $type?: 'chat.bsky.convo.defs#messageRef'
  did: string
  convoId: string
  messageId: string
}

export function isMessageRef(v: unknown): v is $Typed<MessageRef> {
  return is$typed(v, id, 'messageRef')
}

export function validateMessageRef(v: unknown) {
  return lexicons.validate(
    `${id}#messageRef`,
    v,
  ) as ValidationResult<MessageRef>
}

export interface MessageInput {
  $type?: 'chat.bsky.convo.defs#messageInput'
  text: string
  /** Annotations of text (mentions, URLs, hashtags, etc) */
  facets?: AppBskyRichtextFacet.Main[]
  embed?: $Typed<AppBskyEmbedRecord.Main> | $Typed<{ [k: string]: unknown }>
}

export function isMessageInput(v: unknown): v is $Typed<MessageInput> {
  return is$typed(v, id, 'messageInput')
}

export function validateMessageInput(v: unknown) {
  return lexicons.validate(
    `${id}#messageInput`,
    v,
  ) as ValidationResult<MessageInput>
}

export interface MessageView {
  $type?: 'chat.bsky.convo.defs#messageView'
  id: string
  rev: string
  text: string
  /** Annotations of text (mentions, URLs, hashtags, etc) */
  facets?: AppBskyRichtextFacet.Main[]
  embed?: $Typed<AppBskyEmbedRecord.View> | $Typed<{ [k: string]: unknown }>
  sender: MessageViewSender
  sentAt: string
}

export function isMessageView(v: unknown): v is $Typed<MessageView> {
  return is$typed(v, id, 'messageView')
}

export function validateMessageView(v: unknown) {
  return lexicons.validate(
    `${id}#messageView`,
    v,
  ) as ValidationResult<MessageView>
}

export interface DeletedMessageView {
  $type?: 'chat.bsky.convo.defs#deletedMessageView'
  id: string
  rev: string
  sender: MessageViewSender
  sentAt: string
}

export function isDeletedMessageView(
  v: unknown,
): v is $Typed<DeletedMessageView> {
  return is$typed(v, id, 'deletedMessageView')
}

export function validateDeletedMessageView(v: unknown) {
  return lexicons.validate(
    `${id}#deletedMessageView`,
    v,
  ) as ValidationResult<DeletedMessageView>
}

export interface MessageViewSender {
  $type?: 'chat.bsky.convo.defs#messageViewSender'
  did: string
}

export function isMessageViewSender(
  v: unknown,
): v is $Typed<MessageViewSender> {
  return is$typed(v, id, 'messageViewSender')
}

export function validateMessageViewSender(v: unknown) {
  return lexicons.validate(
    `${id}#messageViewSender`,
    v,
  ) as ValidationResult<MessageViewSender>
}

export interface ConvoView {
  $type?: 'chat.bsky.convo.defs#convoView'
  id: string
  rev: string
  members: ChatBskyActorDefs.ProfileViewBasic[]
  lastMessage?:
    | $Typed<MessageView>
    | $Typed<DeletedMessageView>
    | $Typed<{ [k: string]: unknown }>
  muted: boolean
  opened?: boolean
  unreadCount: number
}

export function isConvoView(v: unknown): v is $Typed<ConvoView> {
  return is$typed(v, id, 'convoView')
}

export function validateConvoView(v: unknown) {
  return lexicons.validate(`${id}#convoView`, v) as ValidationResult<ConvoView>
}

export interface LogBeginConvo {
  $type?: 'chat.bsky.convo.defs#logBeginConvo'
  rev: string
  convoId: string
}

export function isLogBeginConvo(v: unknown): v is $Typed<LogBeginConvo> {
  return is$typed(v, id, 'logBeginConvo')
}

export function validateLogBeginConvo(v: unknown) {
  return lexicons.validate(
    `${id}#logBeginConvo`,
    v,
  ) as ValidationResult<LogBeginConvo>
}

export interface LogLeaveConvo {
  $type?: 'chat.bsky.convo.defs#logLeaveConvo'
  rev: string
  convoId: string
}

export function isLogLeaveConvo(v: unknown): v is $Typed<LogLeaveConvo> {
  return is$typed(v, id, 'logLeaveConvo')
}

export function validateLogLeaveConvo(v: unknown) {
  return lexicons.validate(
    `${id}#logLeaveConvo`,
    v,
  ) as ValidationResult<LogLeaveConvo>
}

export interface LogCreateMessage {
  $type?: 'chat.bsky.convo.defs#logCreateMessage'
  rev: string
  convoId: string
  message:
    | $Typed<MessageView>
    | $Typed<DeletedMessageView>
    | $Typed<{ [k: string]: unknown }>
}

export function isLogCreateMessage(v: unknown): v is $Typed<LogCreateMessage> {
  return is$typed(v, id, 'logCreateMessage')
}

export function validateLogCreateMessage(v: unknown) {
  return lexicons.validate(
    `${id}#logCreateMessage`,
    v,
  ) as ValidationResult<LogCreateMessage>
}

export interface LogDeleteMessage {
  $type?: 'chat.bsky.convo.defs#logDeleteMessage'
  rev: string
  convoId: string
  message:
    | $Typed<MessageView>
    | $Typed<DeletedMessageView>
    | $Typed<{ [k: string]: unknown }>
}

export function isLogDeleteMessage(v: unknown): v is $Typed<LogDeleteMessage> {
  return is$typed(v, id, 'logDeleteMessage')
}

export function validateLogDeleteMessage(v: unknown) {
  return lexicons.validate(
    `${id}#logDeleteMessage`,
    v,
  ) as ValidationResult<LogDeleteMessage>
}
