import { Paths } from './Path'

export type PathKey =
    | (typeof Paths.Api)[keyof typeof Paths.Api]
    | (typeof Paths.Projects)[keyof typeof Paths.Projects]
