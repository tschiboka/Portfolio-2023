export const apiPathBuilder = (pathName: string):string => {
    const apiPaths:Record<string, string> = {
        LOGIN: `login`,
        SETTINGS: 'settings'
    }
    
    return "http://localhost:5000/api/" + apiPaths[pathName]
}