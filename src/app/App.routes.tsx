import { AppConfig } from './App.config'
import type { Dictionary } from '@common-utils'
import type { AppRoute, AppRouteConfig } from './App.types'

const buildElement = ({ Component, props, fallback }: AppRouteConfig) => {
    const element = <Component {...props} />

    return fallback ? <div className="route-loading">{element}</div> : element
}

export const AppRoutes: Dictionary<AppRoute> = Object.fromEntries(
    Object.entries(AppConfig).map(([name, config]) => [
        name,
        { name: config.name, path: config.path, element: buildElement(config) },
    ]),
)
