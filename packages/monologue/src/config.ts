import { envInt, envStr } from './lib/env.js'

export async function createConfig() {
  return {
    port: envInt('PORT', 3000),

    appview: {
      url: '',
    },

    db: {
      url: envStr('MONOLOGUE_DB_POSTGRES_URL'),
      schema: envStr('MONOLOGUE_DB_POSTGRES_SCHEMA', null),
      poolSize: envInt('MONOLOGUE_DB_POOL_SIZE', null),
      poolMaxUses: envInt('MONOLOGUE_DB_POOL_MAX_USES', null),
      poolIdleTimeoutMs: envInt('MONOLOGUE_DB_POOL_IDLE_TIMEOUT_MS', 5_000),
    },
  }
}

export type Config = Awaited<ReturnType<typeof createConfig>>
