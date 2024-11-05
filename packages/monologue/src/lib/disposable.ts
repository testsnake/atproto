import 'disposablestack/auto'

export async function asAsyncDisposable<T extends object>(
  fn: (stack: AsyncDisposableStack) => T | PromiseLike<T>,
): Promise<AsyncDisposable & T> {
  await using stack = new AsyncDisposableStack()

  const value: T = await fn(stack)

  if (value == null || typeof value !== 'object') {
    throw new TypeError('Expected an object')
  }

  Object.defineProperty(value, Symbol.asyncDispose, {
    get value() {
      const disposables = stack.move()
      return () => disposables.disposeAsync()
    },
  })

  return value as T & AsyncDisposable
}
