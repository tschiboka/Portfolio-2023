import { ApiPaths } from "./ApiPaths"

export type ApiPathParams = {
    path: keyof typeof ApiPaths.Paths
    params?: Record<string, string | number>
    query?: Record<string, string>
}
