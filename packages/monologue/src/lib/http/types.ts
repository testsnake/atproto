import { IncomingMessage, ServerResponse } from 'node:http'
export { IncomingMessage, ServerResponse }

export type NextFunction = (err?: unknown) => void

export type Middleware<Req = IncomingMessage, Res = ServerResponse> = (
  req: Req,
  res: Res,
  next: NextFunction,
) => void

export type Handler<Req = IncomingMessage, Res = ServerResponse> = (
  req: Req,
  res: Res,
  next?: NextFunction,
) => void
