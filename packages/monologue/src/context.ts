import 'disposablestack/auto'

import { Config } from './config.js'
import { createBsky } from './services/bsky.js'
import { createDb } from './services/db.js'
import { migrate } from './services/db/migrate.js'

export async function createContext(config: Config) {
  await using stack = new AsyncDisposableStack()

  const bsky = createBsky(config)
  const db = stack.adopt(createDb(config), (v) => v.destroy())

  await Promise.all([
    // Startup all the services in parallel
    migrate(db, config),
  ])

  const disposables = stack.move()
  return {
    config,
    bsky,
    db,

    [Symbol.asyncDispose]: () => disposables.disposeAsync(),
  }
}

export type Context = Omit<
  Awaited<ReturnType<typeof createContext>>,
  typeof Symbol.asyncDispose
>
