import { AtUri, Did } from '@atproto/jetstream'
import { ColumnType, JSONColumnType } from 'kysely'
import { I } from '../../lexicon.js'

type MessageRecord = I<'chat.bsky.monologue.message#main'>

export interface MessageTable {
  uri: ColumnType<AtUri, AtUri, never>

  author: Did
  subject: Did

  createdAt: ColumnType<Date, string, never>
  indexedAt: ColumnType<Date, string, never>

  deletedAt: null | ColumnType<Date, string, string>
  invalidatedAt: null | ColumnType<Date, string, string>

  record: JSONColumnType<MessageRecord>
}

export interface ActorStatusTable {
  actor: ColumnType<string, string, never>
  subject: ColumnType<string, string, never>

  // When un-friend
  disabledAt: null | ColumnType<Date, string, string>

  readAt: null | ColumnType<Date, string, string>
  isMuted: boolean
}

export interface Database {
  message: MessageTable
  actorStatus: ActorStatusTable
}
