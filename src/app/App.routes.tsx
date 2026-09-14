import { AppRouteConfigs } from './App.constants'
import type { Dictionary } from '@common-utils'
import type { AppRoute, AppRouteConfig } from './App.types'

const buildElement = ({ Component, props, fallback }: AppRouteConfig) => {
    const element = <Component {...props} />

    return fallback ? <div className="route-loading">{element}</div> : element
}

export const AppRoutes: Dictionary<AppRoute> = Object.fromEntries(
    Object.entries(AppRouteConfigs).map(([name, config]) => [
        name,
        { name: config.name, path: config.path, element: buildElement(config) },
    ]),
)

export const AppRoutesList: AppRoute[] = Object.values<AppRoute>(AppRoutes)
