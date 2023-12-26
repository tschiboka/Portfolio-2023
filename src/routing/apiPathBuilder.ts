const userId = 123456

export const apiPathBuilder = (pathName: string):string => {
    const apiPaths:Record<string, string> = {
        LOGIN: `api/${userId}/login`,
        SETTINGS: 'api/settings'
    }
    
    return "http://localhost:5000/" + apiPaths[pathName]
}