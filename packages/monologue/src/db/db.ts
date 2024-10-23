import 'disposablestack/auto'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import { Database } from './schemas.js'
import { Config } from '../config.js'

export function createDb(config: Config) {
  const pool = new Pool({
    connectionString: config.db.connectionString,
    max: config.db.poolSize,
    maxUses: config.db.poolMaxUses,
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
