import { envInt, envStr } from './lib/env.js'

export async function getConfig() {
  return {
    db: {
      url: envStr('MONOLOGUE_DB_POSTGRES_URL'),
      schema: envStr('MONOLOGUE_DB_POSTGRES_SCHEMA'),
      poolSize: envInt('MONOLOGUE_DB_POOL_SIZE', null) ?? undefined,
      poolMaxUses: envInt('MONOLOGUE_DB_POOL_MAX_USES', null) ?? undefined,
      poolIdleTimeoutMs: envInt('MONOLOGUE_DB_POOL_IDLE_TIMEOUT_MS'),
    },

    port: envInt('PORT', 3000),
  }
}

export type Config = Awaited<ReturnType<typeof getConfig>>
