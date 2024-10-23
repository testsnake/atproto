export function envStr(name: string): string
export function envStr<F extends null | undefined | string>(
  name: string,
  fallback: F,
): string | Exclude<F, undefined>

export function envStr(
  name: string,
  fallback?: null | string,
): string | null | undefined {
  const value = process.env[name]
  if (value) return value

  if (fallback !== undefined) return fallback
  throw new Error(`Missing required environment variable: ${name}`)
}

export function envInt(name: string): number
export function envInt<F extends null | undefined | number>(
  name: string,
  fallback: F,
): number | Exclude<F, undefined>

export function envInt(name: string, fallback?: null | number) {
  const str = envStr(name, fallback == null ? fallback : fallback.toString())
  if (str == null) return undefined

  const value = Number(str)
  if (Number.isInteger(value)) return value

  if (fallback !== undefined) return fallback
  throw new Error(`Invalid integer in environment variable: ${name}`)
}
