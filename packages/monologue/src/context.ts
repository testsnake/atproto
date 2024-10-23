import 'disposablestack/auto'
import { Config } from './config.js'

export async function createContext(config: Config) {
  await using stack = new AsyncDisposableStack()

  const pool = new PgPool({
    connectionString: config.db.url,
    max: config.dbPoolSize,
    maxUses: opts.poolMaxUses,
    idleTimeoutMillis: opts.poolIdleTimeoutMs,
  })

  return {
    config,

    [Symbol.asyncDispose]: (
      (disposables) => () =>
        disposables.disposeAsync()
    )(stack.move()),
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
