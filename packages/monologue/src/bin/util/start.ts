import { Context } from '../../context.js'
import { createConfig } from '../../config.js'
import { createContext } from '../../context.js'
import { run } from '../../lib/process.js'

export async function start(
  fns: Array<(signal: AbortSignal, context: Context) => PromiseLike<void>>,
) {
  return run(async (signal: AbortSignal) => {
    const config = await createConfig()

    if (signal.aborted) return

    await using context = await createContext(config)

    if (signal.aborted) return

    await Promise.all(fns.map((fn) => fn(signal, context)))
  })
}
