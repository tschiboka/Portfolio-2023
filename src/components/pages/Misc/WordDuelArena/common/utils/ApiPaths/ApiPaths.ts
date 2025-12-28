import { ApiPathParams } from './ApiPaths.types'

export class ApiPaths {
    static readonly Paths = {
        SESSION: "session"
    }
    
    static readonly API_STRING = "projects/word-duel-arena"
    static readonly BE_HOST = "portfolio-2023-nf5z.onrender.com";
    
    static get SESSION(): keyof typeof ApiPaths.Paths {
        return "SESSION";
    }

    private static isLocalhost(): boolean {
        const { hostname } = window.location;
        return hostname === 'localhost' || hostname === '127.0.0.1';
    }

    private static getBasePath({ path, params, query }: ApiPathParams): string {
    const apiPath = `${this.API_STRING}/${ApiPaths.Paths[path]}`
    const isLocal = ApiPaths.isLocalhost()

    const hostname = isLocal
        ? window.location.hostname
        : ApiPaths.BE_HOST

    const port = isLocal ? ":5000" : ""

    const pathString = params
        ? "/" + Object.values(params).map(String).join("/")
        : ""

    const queryString = query
        ? `?${new URLSearchParams(query).toString()}`
        : ""

    return `${hostname}${port}/${apiPath}${pathString}${queryString}`
}

    static getPath({ path, params, query }: ApiPathParams): string {
        const service = ApiPaths.isLocalhost() ? "http" : "https"
        return `${service}://${ApiPaths.getBasePath({ path, params, query })}`
    }       

    static getWSPath({ path, params, query }: ApiPathParams): string {
        const service = ApiPaths.isLocalhost() ? "ws" : "wss"
        return `${service}://${ApiPaths.getBasePath({ path, params, query })}`
    }
}