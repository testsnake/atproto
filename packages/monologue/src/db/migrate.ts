import 'disposablestack/auto'
import { Kysely, Migrator } from 'kysely'

import { Config } from '../config.js'
import * as migrations from './migrations/index.js'

export async function migrate(db: Kysely<any>, config: Config) {
  const migrator = new Migrator({
    db,
    migrationTableSchema: config.db.schema,
    provider: { getMigrations: async () => migrations },
  })

  if (config.db.schema) {
    await db.schema.createSchema(config.db.schema).ifNotExists().execute()
  }

  const { error, results } = await migrator.migrateToLatest()
  if (error) throw error
  if (!results) throw new Error('An unknown failure occurred while migrating')

  const failedMigrationNames = results
    .filter((r) => r.status === 'Error')
    .map((r) => r.migrationName)

  if (failedMigrationNames.length) {
    throw new Error(`Failed migrations: ${failedMigrationNames}`)
  }
}
