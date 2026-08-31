import { ApiPathParams } from './ApiPaths.types'
import { Url } from '@common-utils'
import { Browser } from '@common-utils'

export class ApiPaths {
    static readonly Paths = {
        SESSION: 'session',
        LEVEL: 'level',
    }

    static readonly API_STRING = 'projects/word-duel-arena'
    static readonly BE_HOST = 'portfolio-2023-nf5z.onrender.com'

    static get SESSION(): keyof typeof ApiPaths.Paths {
        return 'SESSION'
    }

    private static getBasePath({ path, params, query }: ApiPathParams): string {
        const apiPath = `${this.API_STRING}/${ApiPaths.Paths[path]}`
        const isLocal = Browser.isLocalhost()

        const hostname = isLocal ? window.location.hostname : ApiPaths.BE_HOST
        const port = isLocal ? ':5000' : ''

        const pathString = params ? '/' + Object.values(params).map(String).join('/') : ''
        const queryString = Url.Params.toQueryString(query)

        return `${hostname}${port}/${apiPath}${pathString}${queryString}`
    }

    static getPath({ path, params, query }: ApiPathParams): string {
        const service = Browser.isLocalhost() ? 'http' : 'https'
        return `${service}://${ApiPaths.getBasePath({ path, params, query })}`
    }

    static getWSPath({ path, params, query }: ApiPathParams): string {
        const service = Browser.isLocalhost() ? 'ws' : 'wss'
        return `${service}://${ApiPaths.getBasePath({ path, params, query })}`
    }
}
