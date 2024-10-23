import 'disposablestack/auto'

import { Config } from './config.js'
import { createBsky } from './context/bsky.js'
import { createDb } from './context/db.js'
import { migrate } from './context/db/migrate.js'

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
