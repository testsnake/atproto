import 'disposablestack/auto'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import { Database } from './db/schemas.js'
import { Config } from '../config.js'

export function createDb(config: Config) {
  const pool = new Pool({
    connectionString: config.db.url,
    max: config.db.poolSize ?? undefined,
    maxUses: config.db.poolMaxUses ?? undefined,
    idleTimeoutMillis: config.db.poolIdleTimeoutMs,
  })

  pool.on('connect', (client) => {
    client.query('SET pg_trgm.word_similarity_threshold TO .4;')

    if (config.db.schema) {
      // Shared objects such as extensions will go in the public schema
      const schema = client.escapeIdentifier(config.db.schema)
      client.query(`SET search_path TO ${schema},public;`)
    }
  })

  return new Kysely<Database>({
    dialect: new PostgresDialect({ pool }),
  })
}
