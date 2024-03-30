import { getURL } from "../serverAPI/getURL"

export const apiPathBuilder = (pathName: string):string => {
    const url = getURL();
    
    const apiPaths:Record<string, string> = {
        LOGIN: `login`,
        SETTINGS: 'settings',
        REGISTER_USER: 'user',
        CONFIRM_REGISTRATION: 'confirm'
    }
    console.log(url + "/api/" + apiPaths[pathName])
    return url + "/api/" + apiPaths[pathName]
}