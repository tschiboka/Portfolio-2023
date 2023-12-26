export const apiPathBuilder = (pathName: string):string => {
    const apiPaths:Record<string, string> = {
        LOGIN: `api/login`,
        SETTINGS: 'api/settings'
    }
    
    return "http://localhost:5000/" + apiPaths[pathName]
}