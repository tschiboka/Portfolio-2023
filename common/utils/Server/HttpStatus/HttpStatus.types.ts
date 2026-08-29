import { HttpStatus } from './HttpStatus'
import type { ValueOf } from '../../Generics'

/** Numeric literal union of all `HttpStatus` values (e.g. 200, 400, 404, …). */
export type HttpStatusCode = ValueOf<typeof HttpStatus> & number
