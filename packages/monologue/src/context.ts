import 'disposablestack/auto'

import { Config } from './config.js'
import { createBsky } from './context/bsky.js'
import { createDb } from './context/db.js'
import { migrate } from './context/db/migrate.js'

export async function createContext(config: Config) {
  await using stack = new AsyncDisposableStack()

  // bsky
  const bsky = createBsky(config)

  // db
  const db = stack.adopt(createDb(config), (v) => v.destroy())

  await Promise.all([
    // Start all the services in parallel
    stack.adopt(migrate(db, config), (v) => v),
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
