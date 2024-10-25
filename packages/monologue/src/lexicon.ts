import { schemas as bskySchemas } from '@atproto/api'
import { Infer } from '@atproto/jetstream'
import { LexiconDoc } from '@atproto/lexicon'

export const schemas = [
  ...bskySchemas,

  {
    lexicon: 1,
    id: 'chat.bsky.monologue.defs',
    defs: {
      monologueViewSubject: {
        type: 'object',
        required: ['did'],
        properties: {
          did: { type: 'string', format: 'did' },
        },
      },
      monologueView: {
        type: 'object',
        required: ['subject', 'muted', 'unreadCount'],
        properties: {
          subject: {
            type: 'union',
            refs: [
              'lex:app.bsky.actor.defs#profileViewBasic',
              'lex:chat.bsky.monologue.defs#monologueViewSubject',
            ],
          },
          muted: { type: 'boolean' },
          unreadCount: { type: 'integer' },
        },
      },
      messageViewAuthor: {
        type: 'object',
        required: ['did'],
        properties: {
          did: { type: 'string', format: 'did' },
        },
      },
      messageView: {
        type: 'object',
        required: ['id', 'author', 'timestamp', 'text'],
        properties: {
          id: { type: 'string', format: 'at-uri' },
          author: {
            type: 'ref',
            ref: 'lex:chat.bsky.monologue.defs#messageViewAuthor',
          },
          timestamp: { type: 'string', format: 'datetime' },

          text: {
            type: 'string',
            maxLength: 10000,
            maxGraphemes: 1000,
          },
          facets: {
            type: 'array',
            description: 'Annotations of text (mentions, URLs, hashtags, etc)',
            items: { type: 'ref', ref: 'lex:app.bsky.richtext.facet#main' },
          },
          embed: {
            type: 'union',
            refs: ['lex:app.bsky.embed.record#view'],
          },
        },
      },
      deletedMessageView: {
        type: 'object',
        required: ['id', 'author', 'timestamp'],
        properties: {
          id: { type: 'string', format: 'at-uri' },
          author: {
            type: 'ref',
            ref: 'lex:chat.bsky.monologue.defs#messageViewAuthor',
          },
          timestamp: { type: 'string', format: 'datetime' },
        },
      },
    },
  },

  {
    lexicon: 1,
    id: 'chat.bsky.monologue.deleteMessage',
    defs: {
      main: {
        type: 'procedure',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['messageId'],
            properties: {
              messageId: { type: 'string', format: 'cid' },
            },
          },
        },
      },
    },
  },
  {
    lexicon: 1,
    id: 'chat.bsky.monologue.getMessages',
    defs: {
      main: {
        type: 'query',
        parameters: {
          type: 'params',
          required: ['subject'],
          properties: {
            subject: { type: 'string', format: 'did' },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: { type: 'string', format: 'at-uri' },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['messages'],
            properties: {
              cursor: { type: 'string', format: 'at-uri' },
              messages: {
                type: 'array',
                items: {
                  type: 'union',
                  refs: [
                    'lex:chat.bsky.monologue.defs#messageView',
                    'lex:chat.bsky.monologue.defs#deletedMessageView',
                  ],
                },
              },
            },
          },
        },
      },
    },
  },

  {
    lexicon: 1,
    id: 'chat.bsky.monologue.list',
    defs: {
      main: {
        type: 'query',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: { type: 'string' },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['monologues'],
            properties: {
              cursor: { type: 'string' },
              monologues: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:chat.bsky.monologue.defs#monologueView',
                },
              },
            },
          },
        },
      },
    },
  },
  {
    lexicon: 1,
    id: 'chat.bsky.monologue.message',
    defs: {
      main: {
        type: 'record',
        description: 'A message in a monologue.',
        record: {
          type: 'object',
          required: ['subject', 'text'],
          properties: {
            subject: { type: 'string', format: 'did' },
            createdAt: { type: 'string', format: 'datetime' },
            text: {
              type: 'string',
              maxLength: 10000,
              maxGraphemes: 1000,
            },
            facets: {
              type: 'array',
              description:
                'Annotations of text (mentions, URLs, hashtags, etc)',
              items: { type: 'ref', ref: 'lex:app.bsky.richtext.facet' },
            },
            embed: {
              type: 'union',
              refs: ['lex:app.bsky.embed.record#view'],
            },
          },
        },
      },
    },
  },

  {
    lexicon: 1,
    id: 'chat.bsky.monologue.mute',
    defs: {
      main: {
        type: 'procedure',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['monologueId'],
            properties: {
              monologueId: { type: 'string', format: 'did' },
            },
          },
        },
      },
    },
  },

  {
    lexicon: 1,
    id: 'chat.bsky.monologue.unmute',
    defs: {
      main: {
        type: 'procedure',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['monologueId'],
            properties: {
              monologueId: { type: 'string', format: 'did' },
            },
          },
        },
      },
    },
  },

  {
    lexicon: 1,
    id: 'chat.bsky.monologue.updateRead',
    defs: {
      main: {
        type: 'procedure',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['monologueId'],
            properties: {
              monologueId: { type: 'string', format: 'did' },
              rev: { type: 'string' },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['monologue'],
            properties: {
              monologue: {
                type: 'ref',
                ref: 'lex:chat.bsky.monologue.defs#monologueView',
              },
            },
          },
        },
      },
    },
  },
] as const satisfies LexiconDoc[]

export type Schemas = typeof schemas

export type I<T extends string> = Infer<Schemas, T>
