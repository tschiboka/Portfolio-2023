import { NavigationProps } from "./Navigation.types";

export class Navigation {
    static readonly NavigationPaths = {
        SESSION: "session"
    }

    static get SESSION(): keyof typeof Navigation.NavigationPaths {
        return "SESSION";
    }

    static readonly APP_PATH = "projects/word-duel-arena"

    static createPath = ({ path, params, query }: NavigationProps): string => {
        const base = `/${this.APP_PATH}/${this.NavigationPaths[path]}`

        const pathString = params ? "/" + Object.values(params).map(String).join("/") : ""
        const queryString = query  ? `?${new URLSearchParams(query).toString()}` : ""
        return `${base}${pathString}${queryString}`
    }

    static generateShareableLink = ({ path, params, query }: NavigationProps): string => {
        const { hostname, port } = window.location;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        const base = isLocalhost ? `http://${hostname}${port ? `:${port}` : ""}` : `https://${hostname}`;
        const pathString = Navigation.createPath({ path, params, query });
    
        return `${base}/#${pathString}`;
    }
}