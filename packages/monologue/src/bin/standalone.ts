import { server } from '../server.js'
import { worker } from '../worker.js'
import { start } from './util/start.js'

start([server, worker])
