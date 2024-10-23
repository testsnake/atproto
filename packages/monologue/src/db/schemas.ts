import { ColumnType, JSONColumnType } from 'kysely'
import * as ChatBskyMonologueMessage from '../lexicon/types/chat/bsky/monologue/message.js'

export interface MessageTable {
  uri: ColumnType<string, string, never>

  author: string // Did
  subject: string // Did

  createdAt: ColumnType<Date, string, never>
  indexedAt: ColumnType<Date, string, never>

  deletedAt: null | ColumnType<Date, string, string>
  invalidatedAt: null | ColumnType<Date, string, string>

  record: JSONColumnType<ChatBskyMonologueMessage.Record>
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
