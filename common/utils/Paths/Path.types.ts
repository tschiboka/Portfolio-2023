import type { Paths } from './Paths'

/** Every server endpoint group — the box a `PathKey` is looked up in. */
export type ServerGroup = keyof typeof Paths.Server

/** Every server endpoint key accepted by `RequestBuilder` / `apiPathBuilder`. */
export type PathKey = keyof (typeof Paths.Server)['Api'] | keyof (typeof Paths.Server)['Projects']

/** Every page route the router serves. */
export type ClientRoute = (typeof Paths.Client)[keyof typeof Paths.Client]
