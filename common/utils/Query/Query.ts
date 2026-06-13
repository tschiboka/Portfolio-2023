import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { LocalSession } from '../../../src/context/SessionContext'
import { apiPathBuilder } from '../Path/apiPathBuilder'
import { hasLength } from '../Predicate'
import { PathKey } from '../Path/Path.types'

export class RequestBuilder {
    private baseUrl: string
    private subpath = ''

    private headers: Record<string, string> = {}
    private queryParams: Record<string, unknown> = {}
    private pathParams: Record<string, string | number> = {}

    /**
     * Creates a new request builder for the given API path.
     * @param pathName - The API route key used to resolve the base URL.
     * @throws If `pathName` is falsy.
     */
    constructor(pathName: PathKey) {
        if (!pathName) {
            throw new Error('RequestBuilder: pathName is required')
        }

        this.baseUrl = apiPathBuilder(pathName)
    }

    // -----------------------
    // SUBPATH (SAFE APPEND ONLY)
    // -----------------------
    /**
     * Appends a subpath segment to the base URL.
     * Leading/trailing slashes are normalized automatically.
     * @param subpath - The subpath to append. If empty or falsy, returns `this` unchanged.
     */
    setSubpath(subpath: string): this {
        if (!subpath) return this

        this.subpath = `${this.subpath.replace(/\/$/, '')}/${subpath.replace(/^\/|\/$/g, '')}`
        return this
    }

    // -----------------------
    // PARAMS (PATH VARIABLES)
    // -----------------------
    /**
     * Replaces all path parameters with the given key-value pairs.
     * `null` / `undefined` values are stripped out.
     */
    setParams(params: Record<string, string | number>): this {
        this.pathParams = this.clean(params)
        return this
    }

    /**
     * Merges the given parameters into the existing path parameters.
     * `null` / `undefined` values are stripped out.
     */
    appendParams(params: Record<string, string | number>): this {
        this.pathParams = {
            ...this.pathParams,
            ...this.clean(params),
        }
        return this
    }

    /**
     * Removes one or more path parameters by key.
     */
    removeParams(...keys: string[]): this {
        for (const key of keys) {
            delete this.pathParams[key]
        }
        return this
    }

    /**
     * Removes all path parameters.
     */
    resetParams(): this {
        this.pathParams = {}
        return this
    }

    // -----------------------
    // QUERY
    // -----------------------
    /**
     * Replaces all query-string parameters with the given key-value pairs.
     * `null` / `undefined` values are stripped out.
     */
    setQuery(params: Record<string, unknown>): this {
        this.queryParams = this.clean(params)
        return this
    }

    /**
     * Merges the given parameters into the existing query-string parameters.
     * `null` / `undefined` values are stripped out.
     */
    appendQuery(params: Record<string, unknown>): this {
        this.queryParams = {
            ...this.queryParams,
            ...this.clean(params),
        }
        return this
    }

    /**
     * Removes one or more query-string parameters by key.
     */
    removeQuery(...keys: string[]): this {
        for (const key of keys) {
            delete this.queryParams[key]
        }
        return this
    }

    /**
     * Removes all query-string parameters.
     */
    resetQuery(): this {
        this.queryParams = {}
        return this
    }

    // -----------------------
    // AUTH
    // -----------------------
    /**
     * Sets the `x-auth-token` header using the provided token, or falls back
     * to the session stored in {@link LocalSession}.
     */
    withAuthToken(token?: string): this {
        const t = token ?? LocalSession.getInstance().get()?.token
        if (t) this.headers['x-auth-token'] = t

        return this
    }

    // -----------------------
    // HEADERS
    // -----------------------
    /**
     * Sets a custom HTTP header.
     */
    withHeader(key: string, value: string): this {
        this.headers[key] = value
        return this
    }

    /**
     * Removes a previously set HTTP header by key.
     */
    removeHeader(key: string): this {
        delete this.headers[key]
        return this
    }

    /**
     * Removes all custom HTTP headers.
     */
    resetHeaders(): this {
        this.headers = {}
        return this
    }

    // -----------------------
    // BUILD
    // -----------------------
    /**
     * Resolves the final URL and returns an object with HTTP method helpers
     * (`get`, `post`, `put`, `patch`, `delete`, `head`, `options`) that
     * execute the request via Axios.
     */
    build(): {
        get: <T = unknown>() => Promise<AxiosResponse<T>>
        post: <T = unknown>(payload?: object) => Promise<AxiosResponse<T>>
        put: <T = unknown>(payload?: object) => Promise<AxiosResponse<T>>
        patch: <T = unknown>(payload?: object) => Promise<AxiosResponse<T>>
        delete: <T = unknown>() => Promise<AxiosResponse<T>>
        head: <T = unknown>() => Promise<AxiosResponse<T>>
        options: <T = unknown>() => Promise<AxiosResponse<T>>
    } {
        const resolvedUrl = this.resolveUrl()
        const finalUrl = this.resolvePathParams(resolvedUrl)

        const config: AxiosRequestConfig = {}

        if (hasLength(Object.keys(this.headers))) {
            config.headers = this.headers
        }

        if (hasLength(Object.keys(this.queryParams))) {
            config.params = this.queryParams
        }

        return {
            get: <T = unknown>() => axios.get<T>(finalUrl, config),
            post: <T = unknown>(payload?: object) => axios.post<T>(finalUrl, payload, config),
            put: <T = unknown>(payload?: object) => axios.put<T>(finalUrl, payload, config),
            patch: <T = unknown>(payload?: object) => axios.patch<T>(finalUrl, payload, config),
            delete: <T = unknown>() => axios.delete<T>(finalUrl, config),
            head: <T = unknown>() => axios.head<T>(finalUrl, config),
            options: <T = unknown>() => axios.options<T>(finalUrl, config),
        }
    }

    // -----------------------
    // URL RESOLUTION
    // -----------------------
    /** Combines `baseUrl` with the optional `subpath`. */
    private resolveUrl(): string {
        const base = this.baseUrl.replace(/\/$/, '')
        const sub = this.subpath ? `/${this.subpath.replace(/^\//, '')}` : ''

        return `${base}${sub}`
    }

    /**
     * Replaces `:key` placeholders in the URL with their encoded values
     * from {@link pathParams}.
     */
    private resolvePathParams(url: string): string {
        return Object.entries(this.pathParams).reduce(
            (acc, [key, value]) => acc.replace(`:${key}`, encodeURIComponent(String(value))),
            url,
        )
    }

    // -----------------------
    // INTERNAL
    // -----------------------
    /**
     * Returns a copy of the object with all `null` / `undefined` entries removed.
     */
    private clean<T extends Record<string, unknown>>(params: T): T {
        return Object.fromEntries(Object.entries(params).filter(([, v]) => v != null)) as T
    }
}
