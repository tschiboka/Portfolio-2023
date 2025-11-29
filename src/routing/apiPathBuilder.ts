import { getURL } from "../serverAPI/getURL"

export const ApiPaths = {
    LOGIN: `LOGIN`,
    SETTINGS: 'SETTINGS',
    REGISTER_USER: 'USER',
    CONFIRM_REGISTRATION: 'CONFIRM',
    REHYDRATE_SESSION: 'REHYDRATE_SESSION',
    CATEGORIES: "CATEGORIES",
    PROJECT_XMAS: "PROJECT_XMAS"
}

type ApiPathBuilderOptions = {
    prefix?: string
}

export const apiPathBuilder = (pathName: string, options?: ApiPathBuilderOptions):string => {
    const url = getURL();
    const apiPrefix = options?.prefix ?? '/api'
    const apiPaths:Record<string, string> = {
        LOGIN: `login`,
        SETTINGS: 'settings',
        REGISTER_USER: 'user',
        CONFIRM_REGISTRATION: 'confirm',
        REHYDRATE_SESSION: 'session',
        CATEGORIES: 'categories',
        PROJECT_XMAS: 'projects/xmas_2025',
    }

    return`${url}${apiPrefix}/${apiPaths[pathName]}`
}