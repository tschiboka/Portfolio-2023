import { ApiPaths } from './ApiPaths'
import type { Dictionary } from '@utils'

export type ApiPathParams = {
    path: keyof typeof ApiPaths.Paths
    params?: Dictionary<string | number>
    query?: Dictionary<string>
}
