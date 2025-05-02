import { getURL } from "../serverAPI/getURL"

export const ApiPaths = {
    LOGIN: `LOGIN`,
    SETTINGS: 'SETTINGS',
    REGISTER_USER: 'USER',
    CONFIRM_REGISTRATION: 'CONFIRM',
    CATEGORIES: "CATEGORIES",
}

export const apiPathBuilder = (pathName: string):string => {
    const url = getURL();
    
    const apiPaths:Record<string, string> = {
        LOGIN: `login`,
        SETTINGS: 'settings',
        REGISTER_USER: 'user',
        CONFIRM_REGISTRATION: 'confirm',
        CATEGORIES: 'categories',
    }
    return url + "/api/" + apiPaths[pathName]
}