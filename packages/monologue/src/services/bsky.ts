import { Agent } from '@atproto/api'
import { Config } from '../config.js'

export function createBsky(config: Config) {
  return new Agent(config.appview.url)
}
