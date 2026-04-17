import { getURL } from './getURL'
import { apiRoutes, projectRoutes } from './Path'

export const apiPathBuilder = (pathName: string): string => {
    const url = getURL()

    if (pathName in projectRoutes) {
        return `${url}/${projectRoutes[pathName]}`
    }

    return `${url}/api/${apiRoutes[pathName]}`
}
