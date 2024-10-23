import { getConfig } from './config.js'
import { createContext } from './context.js'
import { run } from './lib/process.js'
import { startMonologueServer } from './server.js'
import { startMonologueWorker } from './worker.js'

export async function main(signal: AbortSignal) {
  const config = await getConfig()
  await using context = await createContext(config)

  await Promise.all([
    startMonologueServer(signal, context),
    startMonologueWorker(signal, context),
  ])
}

run(main)
