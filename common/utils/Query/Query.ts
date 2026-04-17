import axios, { type AxiosRequestConfig } from 'axios'
import { Session } from '../../../src/context/SessionContext'
import { apiPathBuilder } from '../Path/apiPathBuilder'

export class RequestBuilder {
    private url: string
    private headers: Record<string, string> = {}
    private queryParams?: Record<string, unknown>

    constructor(
        pathName: string,
        private sessionToken?: string,
    ) {
        this.url = apiPathBuilder(pathName)
    }

    setPath(subPath: string): this {
        this.url += subPath
        return this
    }

    setQuery(params: Record<string, unknown>): this {
        this.queryParams = params
        return this
    }

    setToken(token?: string): this {
        const t = token ?? this.sessionToken
        if (t) this.headers['x-auth-token'] = t
        return this
    }

    build() {
        const config: AxiosRequestConfig = {}
        if (Object.keys(this.headers).length) config.headers = this.headers
        if (this.queryParams) config.params = this.queryParams

        const url = this.url

        return {
            get: <T = unknown>() => axios.get<T>(url, config),
            post: <T = unknown>(payload?: object) => axios.post<T>(url, payload, config),
            put: <T = unknown>(payload?: object) => axios.put<T>(url, payload, config),
        }
    }
}

export const useApi = (pathName: string) => {
    const token = Session.useContext().session?.token
    return new RequestBuilder(pathName, token)
}
