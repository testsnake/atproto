import { Config } from './config.js'
import { createBsky } from './context/bsky.js'
import { createDb } from './context/db.js'
import { migrate } from './context/db/migrate.js'
import { asAsyncDisposable } from './lib/disposable.js'

export async function createContext(config: Config) {
  return asAsyncDisposable(async (stack) => {
    const bsky = createBsky(config)

    const db = stack.adopt(createDb(config), (v) => v.destroy())

    await Promise.allSettled([
      // Start all the services in parallel
      stack.adopt(migrate(db, config), (v) => v),
    ])

    return {
      config,
      bsky,
      db,
    }
  })
}

export type Context = Omit<
  Awaited<ReturnType<typeof createContext>>,
  typeof Symbol.asyncDispose
>
