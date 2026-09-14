import { Suspense } from 'react'
import { ProjectRouteConfigs } from './Projects.constants'
import type { Dictionary } from '@common-utils'
import type { ProjectRoute, ProjectRouteConfig } from './Projects.types'

const buildElement = ({ Component, props, fallback }: ProjectRouteConfig) => {
    const element = <Component {...props} />

    return fallback ? <Suspense fallback={<div>Loading...</div>}>{element}</Suspense> : element
}

export const ProjectRoutes: Dictionary<ProjectRoute> = Object.fromEntries(
    Object.entries(ProjectRouteConfigs).map(([name, config]) => [
        name,
        { path: config.path, element: buildElement(config) },
    ]),
)

export const ProjectRoutesList: ProjectRoute[] = Object.values(ProjectRoutes)
