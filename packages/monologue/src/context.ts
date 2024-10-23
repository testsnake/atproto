import 'disposablestack/auto'

import { Config } from './config.js'
import { createDb } from './db/db.js'
import { migrate } from './db/migrate.js'
import { Agent } from '@atproto/api'

export async function createContext(config: Config) {
  await using stack = new AsyncDisposableStack()

  const appview = new Agent(config.appview.url)
  const db = stack.adopt(createDb(config), (v) => v.destroy())

  await Promise.all([
    // Startup all the services in parallel
    migrate(db, config),
  ])

  const disposables = stack.move()
  return {
    config,
    appview,
    db,

    [Symbol.asyncDispose]: () => disposables.disposeAsync(),
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
